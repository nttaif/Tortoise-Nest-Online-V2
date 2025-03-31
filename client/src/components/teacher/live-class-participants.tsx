"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MicOff, VideoOff, X } from "lucide-react"

interface Participant {
  id: string
  name: string
  role: string
  isActive: boolean
}

interface LiveClassParticipantsProps {
  participants: Participant[]
}

export default function LiveClassParticipants({ participants }: LiveClassParticipantsProps) {
  const [localParticipants, setLocalParticipants] = useState(participants)

  const handleMuteAll = () => {
    // In a real app, this would call the Jitsi API to mute all participants
    console.log("Muting all participants")
  }

  const handleRemoveParticipant = (id: string) => {
    // In a real app, this would call the Jitsi API to remove a participant
    setLocalParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, isActive: false } : p)))
  }

  const activeParticipants = localParticipants.filter((p) => p.isActive)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">
          {activeParticipants.length} {activeParticipants.length === 1 ? "participant" : "participants"}
        </span>
        <Button size="sm" variant="outline" onClick={handleMuteAll}>
          <MicOff className="h-3 w-3 mr-1" /> Mute All
        </Button>
      </div>

      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-2">
          {localParticipants.map((participant) => (
            <div
              key={participant.id}
              className={`flex items-center justify-between p-2 rounded-md ${
                participant.isActive ? "bg-background border" : "bg-muted/50 text-muted-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {participant.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-sm">{participant.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">{participant.role}</div>
                </div>
              </div>

              {participant.isActive ? (
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" className="h-7 w-7">
                    <MicOff className="h-3 w-3" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7">
                    <VideoOff className="h-3 w-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={() => handleRemoveParticipant(participant.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <Badge variant="outline" className="text-xs">
                  Offline
                </Badge>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

