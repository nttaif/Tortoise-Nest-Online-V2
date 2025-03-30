"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { Send } from "lucide-react"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  isTeacher: boolean
}

export default function LiveClassChat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "John Doe",
      content: "Welcome to the class everyone!",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      isTeacher: true,
    },
    {
      id: "2",
      sender: "Alice Smith",
      content: "Thank you! I have a question about React hooks.",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      isTeacher: false,
    },
    {
      id: "3",
      sender: "Bob Johnson",
      content: "I'm having trouble with the assignment from last week.",
      timestamp: new Date(Date.now() - 1000 * 60 * 1),
      isTeacher: false,
    },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "John Doe",
      content: message,
      timestamp: new Date(),
      isTeacher: true,
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  return (
    <div className="flex flex-col h-[300px]">
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.isTeacher ? "items-end" : "items-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-2 ${
                  msg.isTeacher ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <div className="text-xs font-medium mb-1">{msg.sender}</div>
                <div className="text-sm">{msg.content}</div>
              </div>
              <div className="text-xs text-muted-foreground mt-1">{format(msg.timestamp, "h:mm a")}</div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex items-center gap-2 mt-4">
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage()
            }
          }}
        />
        <Button size="icon" onClick={handleSendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

