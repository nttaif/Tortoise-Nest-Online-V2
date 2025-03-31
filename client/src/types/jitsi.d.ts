// This file declares the Jitsi Meet External API types for TypeScript

interface JitsiMeetExternalAPIOptions {
    roomName: string
    width?: string | number
    height?: string | number
    parentNode?: HTMLElement
    configOverwrite?: Record<string, any>
    interfaceConfigOverwrite?: Record<string, any>
    userInfo?: {
      displayName?: string
      email?: string
      avatarUrl?: string
    }
    jwt?: string
    onload?: () => void
    lang?: string
  }
  
  interface JitsiMeetExternalAPI {
    new (domain: string, options: JitsiMeetExternalAPIOptions): JitsiMeetExternalAPI
    executeCommand(command: string, ...args: any[]): void
    executeCommands(commands: Record<string, any>): void
    addEventListener(event: string, listener: (data: any) => void): void
    removeEventListener(event: string, listener: (data: any) => void): void
    dispose(): void
    getIFrame(): HTMLIFrameElement
    isAudioMuted(): Promise<boolean>
    isVideoMuted(): Promise<boolean>
    getNumberOfParticipants(): Promise<number>
    getParticipantsInfo(): Promise<any[]>
    getVideoQuality(): Promise<string>
    getCurrentDevices(): Promise<any>
    getAvailableDevices(): Promise<any>
    getSupportedCommands(): Promise<string[]>
  }
  
  interface Window {
    JitsiMeetExternalAPI: JitsiMeetExternalAPI
  }
  
  