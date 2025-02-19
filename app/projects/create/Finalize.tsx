// Finalize.tsx - Handles the finalize step of project creation

"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ImagePlus, Plus } from 'lucide-react'

interface FinalizeProps {
  state: {
    basicInfo: {
      title: string,
      location: string,
      description: string
    },
    eventType: string
  }
}

export default function Finalize({ state }: FinalizeProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Finalize Your Project</CardTitle>
        <p className="text-sm text-muted-foreground">Add any additional materials to help volunteers understand the project better</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Cover Image Upload Section */}
        <div>
          <Label>Cover Image</Label>
          <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
            <ImagePlus className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">Upload a cover image for your project</p>
            <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
          </div>
        </div>

        {/* Additional Files Upload Section */}
        <div>
          <Label>Additional Files (Optional)</Label>
          <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 cursor-pointer">
            <Plus className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">Add any supporting documents</p>
            <p className="text-xs text-muted-foreground">PDF, DOC, DOCX up to 10MB</p>
          </div>
        </div>

        {/* Project Summary Section */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h3 className="font-medium mb-2">Project Summary</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Title:</strong> {state.basicInfo.title || 'Not set'}</p>
            <p><strong>Location:</strong> {state.basicInfo.location || 'Not set'}</p>
            <p><strong>Event Type:</strong> {state.eventType === 'oneTime' ? 'Single Event' : 
              state.eventType === 'multiDay' ? 'Multiple Day Event' : 'Multi-Role Event'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
