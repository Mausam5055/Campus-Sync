import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Send, Bot, User, BookOpen, Calculator, Clock, Lightbulb } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface SuggestionCard {
  title: string
  subtitle: string
  icon: React.ReactNode
  prompt: string
}

const AskAI = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Handle mobile keyboard visibility
  useEffect(() => {
    const handleViewportChange = () => {
      if (!window.visualViewport) return
      // Calculate only the actual overlap caused by the keyboard
      const vv = window.visualViewport
      const overlap = Math.max(0, window.innerHeight - (vv.height + vv.offsetTop))
      setKeyboardHeight(overlap > 80 ? overlap : 0) // threshold to avoid tiny UI chrome shifts
    }

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange)
      window.visualViewport.addEventListener('scroll', handleViewportChange)
      handleViewportChange()
      return () => {
        window.visualViewport?.removeEventListener('resize', handleViewportChange)
        window.visualViewport?.removeEventListener('scroll', handleViewportChange)
      }
    }
  }, [])

  // Auto-focus input when keyboard is detected
  useEffect(() => {
    if (keyboardHeight > 0 && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }, [keyboardHeight])

  const suggestions: SuggestionCard[] = [
    {
      title: "Study Techniques",
      subtitle: "Effective Learning Methods",
      icon: <BookOpen className="h-5 w-5" />,
      prompt: "What are the most effective study techniques for college students?"
    },
    {
      title: "Math Help",
      subtitle: "Problem Solving Tips",
      icon: <Calculator className="h-5 w-5" />,
      prompt: "Can you help me understand calculus concepts better?"
    },
    {
      title: "Time Management",
      subtitle: "Academic Balance",
      icon: <Clock className="h-5 w-5" />,
      prompt: "How can I better manage my time between studies and other activities?"
    },
    {
      title: "Research Tips",
      subtitle: "Academic Writing",
      icon: <Lightbulb className="h-5 w-5" />,
      prompt: "What are the best practices for academic research and citation?"
    }
  ]

  // Function to generate system prompt with creator information
  const getSystemPrompt = (message: string): string => {
    const lowerMessage = message.toLowerCase()
    
    // Check if user is asking about the creator
    if (lowerMessage.includes('mausam kar') || lowerMessage.includes('creator') || lowerMessage.includes('developer') || lowerMessage.includes('who made') || lowerMessage.includes('who created')) {
      return `You are CampusSync AI, a helpful AI assistant for students. The user is asking about the creator of this application. Here's the information about Mausam Kar:

**About Mausam Kar - Creator of this Student Hub Application:**

Mausam Kar is a Computer Science and Engineering student at VIT Bhopal, specializing in Artificial Intelligence and Machine Learning. Originally from Assam, he blends creativity and technology to craft impactful, user-focused solutions.

**Technical Skills:**
• Full-stack development (React.js, HTML5, CSS3, JavaScript, Tailwind CSS)
• Backend (Node.js)
• AI/ML (Python, TensorFlow, NLP)
• UI/UX Design
• Prompt Engineering

**Currently Exploring:**
Cloud Computing (AWS/GCP), DevOps, and Advanced Data Analytics to build scalable and ethical intelligent systems.

**About him:**
Driven by curiosity, Mausam enjoys contributing to open-source projects, participating in hackathons, and experimenting with generative AI. He's passionate about bridging regional innovation with global tech.

Please provide a helpful response about Mausam Kar based on this information. User's question: ${message}`
    }
    
    return `You are CampusSync AI, a helpful AI assistant for students built into a student management application created by Mausam Kar. Please provide a well-formatted, clear, and organized response to this question. Use proper formatting with clear sections, bullet points, and structure. Avoid using asterisks (*) for formatting. Instead, use clear headings and organized lists.

Question: ${message}`
  }

  // Function to clean and format AI response
  const formatAIResponse = (response: string): string => {
    return response
      // Remove excessive asterisks and formatting
      .replace(/\*\*\*/g, '')
      .replace(/\*\*/g, '')
      .replace(/\* \*/g, '• ')
      .replace(/^\* /gm, '• ')
      // Clean up spacing
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (messageContent: string = input) => {
    if (!messageContent.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const GEMINI_API_KEY = 'AIzaSyAW7Hle7YZLhvA6tanEE6gIf2DurAJ8OZQ'
      
      // Call Gemini API directly
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: getSystemPrompt(messageContent)
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response from Gemini API')
      }

      const data = await response.json()
      let aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.'
      
      // Clean up and format the response
      aiResponse = formatAIResponse(aiResponse)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error generating response:', error)
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage()
  }

  const handleSuggestionClick = (prompt: string) => {
    sendMessage(prompt)
  }

  return (
    <div className="h-screen max-w-4xl mx-auto flex flex-col relative">
      {/* Messages Area - Takes remaining space above input */}
      <div className="flex-1 overflow-hidden">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center space-y-8 p-6 pb-20">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-foreground">
                  Hi, Student! 👋
                </h1>
                <p className="text-xl text-foreground/80">
                  How can I help you with your studies today?
                </p>
                <p className="hidden sm:block text-sm text-muted-foreground max-w-md mx-auto italic">
                  Ready to assist you with anything you need, from answering academic questions 
                  to providing study tips and research guidance. Let's get started!
                </p>
              </div>
            </div>

            {/* Suggestion Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
              {suggestions.map((suggestion, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer hover:bg-accent/50 transition-colors ${
                    index === 3 ? 'hidden md:block' : ''
                  }`}
                  onClick={() => handleSuggestionClick(suggestion.prompt)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {suggestion.icon}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <h3 className="font-medium text-sm text-foreground">
                          {suggestion.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {suggestion.subtitle}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-full overflow-y-auto space-y-4 p-4 pb-20">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/10">
                      <Bot className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div className={`text-sm whitespace-pre-wrap leading-relaxed ${
                    message.role === 'assistant' ? 'space-y-2' : ''
                  }`}>
                    {message.content.split('\n').map((line, index) => {
                      if (line.trim().startsWith('•')) {
                        return (
                          <div key={index} className="flex items-start space-x-2 my-1">
                            <span className="text-primary mt-1">•</span>
                            <span className="flex-1">{line.replace('•', '').trim()}</span>
                          </div>
                        )
                      }
                      return line.trim() ? (
                        <p key={index} className="mb-2 last:mb-0">{line}</p>
                      ) : (
                        <div key={index} className="h-2"></div>
                      )
                    })}
                  </div>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>

                {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-secondary">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Fixed Input Section at Bottom */}
      <div 
        className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-sm p-4 z-50 max-w-4xl mx-auto"
        style={{ 
          bottom: keyboardHeight > 0 ? `${keyboardHeight}px` : '0px',
          transition: 'bottom 0.2s ease-out'
        }}
      >
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your studies..."
            className="flex-1 text-base md:text-sm"
            style={{ fontSize: '16px' }} // Prevent zoom on iOS
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={isLoading || !input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AskAI