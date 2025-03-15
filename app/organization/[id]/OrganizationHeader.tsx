"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, GlobeIcon, UsersIcon, Plus, Building2, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import JoinCodeDialog from "./JoinCodeDialog";
import { toast } from "sonner";
import { JoinOrganizationDialog } from "../JoinOrganizationDialog";

interface OrganizationHeaderProps {
  organization: any;
  userRole: string | null;
  memberCount: number;
}

export default function OrganizationHeader({
  organization,
  userRole,
  memberCount,
}: OrganizationHeaderProps) {
  const [showJoinCode, setShowJoinCode] = useState(false);
  const isAdmin = userRole === "admin";
  
  const getInitials = (name: string) => {
    return name
      ? name.split(' ').map(part => part[0]).join('').toUpperCase().substring(0, 2)
      : "ORG";
  };

  // const handleShare = () => {
  //   const url = window.location.href;
  //   if (navigator.share) {
  //     navigator.share({
  //       title: organization.name,
  //       text: organization.description || `Check out ${organization.name} on Let's Assist!`,
  //       url: window.location.href,
  //     }).catch(err => {
  //       console.error('Error sharing:', err);
  //       navigator.clipboard.writeText(window.location.href);
  //       toast.success('Link copied to clipboard!');
  //     });
  //   } else {
  //     navigator.clipboard.writeText(window.location.href);
  //     toast.success('Link copied to clipboard!');
  //   }
  // };
  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share && /Mobi/.test(navigator.userAgent)) {
      navigator
        .share({
          title: `${organization.name} - Let's Assist`,
          text: `Check out ${organization.name} on Let's Assist!`,
          url
        })
        .catch((err) => {
          console.error("Share failed: ", err);
          toast.error("Could not share link");
        });
    } else {
      try {
        navigator.clipboard.writeText(url).then(() => {
          toast.success("Link copied to clipboard");
        });
      } catch (err) {
        console.error("Copy operation failed:", err);
        toast.error("Could not copy link to clipboard");
      }
    }
  };

  return (
    <div className="flex flex-col w-full gap-4 relative">
      {/* Main container - stacking on mobile, row on desktop */}
      <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4 sm:gap-6 w-full">
      {/* Avatar - smaller on mobile */}
      <Avatar className="h-16 w-16 sm:h-24 sm:w-24 rounded-2xl border-4 border-background shadow-sm flex-shrink-0">
        <AvatarImage src={organization.logo_url || undefined} alt={organization.name} />
        <AvatarFallback className="text-base sm:text-xl bg-primary/10 rounded-2xl">
        {organization.type === 'company' ? 
          <Building2 className="h-8 w-8 text-primary/60" /> : 
          getInitials(organization.name)}
        </AvatarFallback>
      </Avatar>
      
      {/* Organization details - centered on mobile */}
      <div className="flex-1 min-w-0 text-center sm:text-left">
        {/* Organization name and badges */}
        <div className="flex flex-col items-center sm:items-start">
        <h1 className="flex flex-wrap text-xl sm:text-3xl font-bold tracking-tight">
          {organization.name}
          {organization.verified && (
              <BadgeCheck className="sm:h-7 sm:w-7 h-6 w-6 self-center sm:ml-2 ml-1" fill="hsl(var(--primary))" stroke="hsl(var(--popover))" strokeWidth={2.5} />
          )}
        </h1>
        
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
          <Badge variant="outline" className="capitalize">
          {organization.type}
          </Badge>
          
          {organization.username && (
          <Badge variant="secondary" className="font-mono">
            @{organization.username}
          </Badge>
          )}
        </div>
        </div>
        
        {/* Website and member count - wrap properly on mobile */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3 items-center text-sm text-muted-foreground">
        {organization.website && (
          <a 
          href={organization.website.startsWith('http') ? organization.website : `https://${organization.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
          <GlobeIcon className="h-3.5 w-3.5" />
          <span className="truncate max-w-[150px] sm:max-w-[200px]">
            {organization.website.replace(/^https?:\/\/(www\.)?/, '')}
          </span>
          </a>
        )}
        
        <div className="flex items-center gap-1">
          <UsersIcon className="h-3.5 w-3.5" />
          <span>{memberCount} {memberCount === 1 ? 'Member' : 'Members'}</span>
        </div>
        </div>
        
        {/* Description - more height on mobile with fade out */}
        {organization.description && (
        <p className="mt-3 text-sm text-muted-foreground line-clamp-1 max-w-[400px]">
          {organization.description}
        </p>
        )}
      </div>
      </div>

      {/* Action buttons - positioned bottom right on desktop */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:absolute sm:bottom-0 sm:right-0">
      <Button 
        variant="outline"
        size="sm"
        className="w-full sm:w-auto justify-center"
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
      
      {isAdmin && (
        <Button 
        variant="default"
        size="sm"
        className="w-full sm:w-auto justify-center"
        onClick={() => setShowJoinCode(true)}
        >
        <Plus className="h-4 w-4" />
        Invite Members
        </Button>
      )}
      
      {userRole === null && (
        
        <Button 
          variant="default"
          size="sm"
          className="w-full sm:w-auto justify-center"
          onClick={() => toast.info("Get the join code from an admin and join from the organizations page", {
            action: {
              label: "Go to Organizations",
              onClick: () => window.location.href = "/organization"
            }
          })}
        >
          <Plus className="h-4 w-4" />
          Join Organization
        </Button>
      )}
      </div>
      
      {/* Action buttons - full width on mobile
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:ml-auto">
        <Button 
          variant="outline"
          size="sm"
          className="w-full sm:w-auto justify-center"
          onClick={handleShare}
        >
          <ShareIcon className="h-4 w-4 mr-2" />
          Share
        </Button>
        
        {isAdmin && (
          <Button 
            variant="default"
            size="sm"
            className="w-full sm:w-auto justify-center"
            onClick={() => setShowJoinCode(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Invite Members
          </Button>
        )}
        
        {userRole === null && (
          <Button 
            variant="default"
            size="sm"
            asChild
            className="w-full sm:w-auto justify-center"
          >
            <Link href={`/organization/join?id=${organization.id}`}>
              <Plus className="h-4 w-4 mr-2" />
              Join Organization
            </Link>
          </Button>
        )}
      </div> */}
      
      {showJoinCode && isAdmin && (
        <JoinCodeDialog 
          organization={organization} 
          open={showJoinCode} 
          onOpenChange={setShowJoinCode} 
        />
      )}
    </div>
  );
}
