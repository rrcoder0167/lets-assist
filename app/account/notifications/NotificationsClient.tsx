"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, AlertTriangle, CircleCheck, Bell } from "lucide-react";

type NotificationSettings = {
  email_notifications: boolean;
  login_reminders: boolean;
};

type Notification = {
  id: string;
  title: string;
  body: string;
  type: string;
  severity: 'info' | 'warning' | 'success';
  read: boolean;
  created_at: string;
  action_url?: string;
};

export function NotificationsClient() {
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [originalSettings, setOriginalSettings] = useState<NotificationSettings | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  // Helper function to get icon based on severity
  const getNotificationIcon = (severity: string = 'info') => {
    switch (severity) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-chart-6" />;
      case 'success':
        return <CircleCheck className="h-5 w-5 text-primary" />;
      case 'info':
      default:
        return <AlertCircle className="h-5 w-5 text-chart-3" />;
    }
  };

  useEffect(() => {
    async function loadSettings() {
      try {
        const { data, error } = await supabase
          .from("notification_settings")
          .select("*")
          .single();

        if (error) {
          console.error("Error loading notification settings:", error);
          return;
        }

        setSettings(data);
        setOriginalSettings(data);
      } catch (error) {
        console.error("Failed to load notification settings", error);
      } finally {
        setLoading(false);
      }
    }

    async function loadNotifications() {
      try {
        setNotificationsLoading(true);
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(10);
        
        if (error) {
          console.error("Error loading notifications:", error);
          return;
        }
        
        setNotifications(data || []);
      } catch (error) {
        console.error("Error loading notifications:", error);
      } finally {
        setNotificationsLoading(false);
      }
    }

    loadSettings();
    loadNotifications();
  }, []);

  const handleChange = (field: keyof NotificationSettings, value: boolean) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
  };

  const saveSettings = async () => {
    if (!settings) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from("notification_settings")
        .update(settings)
        .eq("user_id", (await supabase.auth.getUser()).data.user?.id);

      if (error) {
        toast.error("Failed to save notification settings");
        console.error("Error saving settings:", error);
        return;
      }
      
      toast.success("Notification settings saved successfully");
      setOriginalSettings(settings);
    } catch (error) {
      toast.error("Failed to save notification settings");
      console.error("Failed to save settings", error);
    } finally {
      setSaving(false);
    }
  };

  // Check if settings have changed compared to the original
  const hasChanges =
    originalSettings &&
    settings &&
    (settings.email_notifications !== originalSettings.email_notifications ||
      settings.login_reminders !== originalSettings.login_reminders);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-6"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Notifications
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your notification preferences and control how you receive alerts
          </p>
        </div>

        <Card className="border shadow-sm">
          <CardHeader className="px-5 py-4 sm:px-6">
            <CardTitle className="text-xl">Notification Preferences</CardTitle>
            <CardDescription>
              Choose which notifications you&apos;d like to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 sm:px-6 py-4">
            {loading ? (
              <div className="space-y-6">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-32 mt-4" />
              </div>
            ) : !settings ? (
              <div className="text-center py-6 text-muted-foreground">
                Error loading notification settings. Please try again later.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-5">
                  <div className="flex items-center justify-between bg-muted/30 p-3 rounded-md">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications" className="text-base">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email when important updates occur
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={settings.email_notifications}
                      onCheckedChange={(checked) => handleChange("email_notifications", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between bg-muted/30 p-3 rounded-md">
                    <div className="space-y-0.5">
                      <Label htmlFor="login-reminders" className="text-base">
                        Login Reminders
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive helpful reminders about account setup when you log in
                      </p>
                    </div>
                    <Switch
                      id="login-reminders"
                      checked={settings.login_reminders}
                      onCheckedChange={(checked) => handleChange("login_reminders", checked)}
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button 
                    onClick={saveSettings} 
                    disabled={saving || !hasChanges}
                    className="w-full sm:w-auto"
                  >
                    {saving ? "Saving Changes..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="border shadow-sm mt-6">
          <CardHeader className="px-5 py-4 sm:px-6">
            <CardTitle className="text-xl">Notification History</CardTitle>
            <CardDescription>
              View your recent notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 sm:px-6 py-4">
            {notificationsLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border rounded-lg ${notification.read ? 'bg-background' : 'bg-accent/30'}`}
                  >
                    <div className="flex">
                      <div className="mr-4 mt-1">
                        {getNotificationIcon(notification.severity)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className={`text-sm font-semibold ${!notification.read ? 'font-bold' : ''}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(notification.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.body}</p>
                        {notification.action_url && (
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="mt-1 h-auto p-0 text-sm"
                            onClick={() => window.location.href = notification.action_url!}
                          >
                            View details
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Bell className="h-10 w-10 mx-auto mb-4 opacity-20" />
                <p>No notifications yet</p>
                <p className="text-sm mt-1">When you receive notifications, they will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
