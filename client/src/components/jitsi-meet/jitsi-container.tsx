"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Video, VideoOff, Mic, MicOff } from "lucide-react"

interface JitsiMeetProps {
  roomName: string
  displayName: string
  onClose?: () => void
  isTeacher?: boolean
}

// Declare JitsiMeetExternalAPI
declare global {
  interface Window {
    JitsiMeetExternalAPI : JitsiMeetExternalAPI
  }
}

export default function JitsiMeetContainer({ roomName, displayName, onClose, isTeacher = false }: JitsiMeetProps) {
  const jitsiContainerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [api, setApi] = useState<JitsiMeetExternalAPI | null>(null)
  const [videoMuted, setVideoMuted] = useState(false)
  const [audioMuted, setAudioMuted] = useState(false)

  useEffect(() => {
    // Check if script is already loaded
    if (document.querySelector('script[src="https://meet.jit.si/external_api.js"]')) {
      initJitsi()
      return
    }

    // Load Jitsi Meet API script
    const script = document.createElement("script")
    script.src = "https://meet.jit.si/external_api.js"
    script.async = true

    script.onload = () => {
      console.log("Jitsi script loaded successfully")
      initJitsi()
    }

    script.onerror = () => {
      console.error("Failed to load Jitsi script")
      setLoading(false)
    }

    document.body.appendChild(script)

    return () => {
      if (api) api.dispose()
    }
  }, [])

  const initJitsi = () => {
    try {
      if (!window.JitsiMeetExternalAPI) {
        console.error("Jitsi Meet API not loaded")
        setLoading(false)
        return
      }

      if (!jitsiContainerRef.current) {
        console.error("Jitsi container not found")
        setLoading(false)
        return
      }

      const domain = "meet.jit.si"
      const options = {
        roomName: roomName,
        width: "100%",
        height: "100%",
        parentNode: jitsiContainerRef.current,
        userInfo: {
          displayName: displayName,
        },
        configOverwrite: {
          prejoinPageEnabled: false,
          startWithAudioMuted: false,
          startWithVideoMuted: false,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            "microphone",
            "camera",
            "closedcaptions",
            "desktop",
            "fullscreen",
            "fodeviceselection",
            "hangup",
            "profile",
            "chat",
            "recording",
            "livestreaming",
            "etherpad",
            "sharedvideo",
            "settings",
            "raisehand",
            "videoquality",
            "filmstrip",
            "feedback",
            "stats",
            "shortcuts",
            "tileview",
            "videobackgroundblur",
            "download",
            "help",
            "mute-everyone",
          ],
        },
      }

      console.log("Initializing Jitsi with options:", options)
      const jitsiApi = new window.JitsiMeetExternalAPI(domain, options)
      setApi(jitsiApi)

      jitsiApi.addEventListener("videoConferenceJoined", () => {
        console.log("Joined video conference")
        setLoading(false)

        // Set moderator role for teachers
        if (isTeacher) {
          jitsiApi.executeCommand("toggleLobby", true)
        }
      })

      jitsiApi.addEventListener("videoConferenceLeft", () => {
        console.log("Left video conference")
        if (onClose) onClose()
      })

      jitsiApi.addEventListener("audioMuteStatusChanged", (muted: { muted: boolean }) => {
        setAudioMuted(muted.muted)
      })

      jitsiApi.addEventListener("videoMuteStatusChanged", (muted: { muted: boolean }) => {
        setVideoMuted(muted.muted)
      })

      jitsiApi.addEventListener("readyToClose", () => {
        if (onClose) onClose()
      })
    } catch (error) {
      console.error("Error initializing Jitsi:", error)
      setLoading(false)
    }
  }

  const toggleVideo = () => {
    if (api) api.executeCommand("toggleVideo")
  }

  const toggleAudio = () => {
    if (api) api.executeCommand("toggleAudio")
  }

  const leaveCall = () => {
    if (api) api.executeCommand("hangup")
    if (onClose) onClose()
  }

  return (
    <Card className="w-full h-[600px] relative overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Joining meeting...</span>
        </div>
      )}
      <CardContent className="p-0 h-full">
        <div ref={jitsiContainerRef} className="w-full h-full"></div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-background/80 p-2 rounded-full">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleAudio}
            className={audioMuted ? "bg-destructive text-destructive-foreground" : ""}
          >
            {audioMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleVideo}
            className={videoMuted ? "bg-destructive text-destructive-foreground" : ""}
          >
            {videoMuted ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>
          <Button variant="destructive" onClick={leaveCall}>
            Leave
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

