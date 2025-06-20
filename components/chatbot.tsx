"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, Bot, User, Lightbulb, Sprout, Calculator, TrendingUp } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "suggestion"
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your MFCS farming assistant. I can help you with crop advice, fertilizer calculations, market prices, and farming techniques. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickSuggestions = [
    { text: "What crops should I plant this season?", icon: <Sprout className="h-4 w-4" /> },
    { text: "Calculate fertilizer for wheat", icon: <Calculator className="h-4 w-4" /> },
    { text: "Current market prices", icon: <TrendingUp className="h-4 w-4" /> },
    { text: "Pest control advice", icon: <Lightbulb className="h-4 w-4" /> },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Crop recommendations
    if (message.includes("crop") || message.includes("plant") || message.includes("grow")) {
      return "For Mehdiabad's climate, I recommend:\n\n🌾 **Winter crops (Oct-Mar):** Wheat, Barley, Peas\n🥔 **Spring crops (Mar-Jun):** Potatoes, Vegetables\n🍎 **Perennial:** Apples, Apricots, Walnuts\n\nWould you like specific advice for any of these crops?"
    }

    // Fertilizer advice
    if (message.includes("fertilizer") || message.includes("nutrient")) {
      return "For fertilizer recommendations, I need to know:\n\n1. Which crop are you growing?\n2. Your soil test results (N-P-K levels)\n3. Farm area in hectares\n\nYou can also use our AI Fertilizer Calculator for precise calculations!"
    }

    // Market prices
    if (message.includes("price") || message.includes("market") || message.includes("sell")) {
      return "Current market prices in Gilgit-Baltistan:\n\n🌾 Wheat: 85 PKR/kg ↗️\n🥔 Potato: 45 PKR/kg ➡️\n🍎 Apple: 120 PKR/kg ↗️\n🥜 Walnut: 1200 PKR/kg ↗️\n\nPrices updated daily. Check our Market section for more details!"
    }

    // Pest control
    if (message.includes("pest") || message.includes("insect") || message.includes("disease")) {
      return "For pest management:\n\n🔍 **Prevention:** Regular field inspection\n🌿 **Organic methods:** Neem oil, beneficial insects\n💊 **Chemical control:** Use only when necessary\n⚠️ **Safety:** Always wear protective equipment\n\nWhat specific pest problem are you facing?"
    }

    // Irrigation
    if (message.includes("water") || message.includes("irrigation") || message.includes("drought")) {
      return "Water management tips for mountain farming:\n\n💧 **Drip irrigation:** Most efficient for vegetables\n🌧️ **Rainwater harvesting:** Collect during monsoon\n⏰ **Timing:** Early morning or evening watering\n📊 **Monitoring:** Check soil moisture regularly\n\nNeed help setting up an irrigation system?"
    }

    // Weather/climate
    if (message.includes("weather") || message.includes("climate") || message.includes("temperature")) {
      return "Kharmang climate considerations:\n\n❄️ **Winter:** Very cold, protect crops from frost\n🌸 **Spring:** Ideal planting time for most crops\n☀️ **Summer:** Warm days, cool nights - perfect for fruits\n🍂 **Autumn:** Harvest season for apples and nuts\n\nPlan your farming activities according to seasons!"
    }

    // Default response
    return "I understand you're asking about farming. I can help with:\n\n🌱 Crop selection and planting advice\n🧪 Fertilizer and soil management\n💰 Market prices and selling tips\n🐛 Pest and disease control\n💧 Irrigation and water management\n\nPlease ask me something specific, or use the quick suggestions below!"
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-6 w-6" />
            <span>MFCS Farming Assistant</span>
          </CardTitle>
          <CardDescription className="text-green-100">
            Get instant answers to your farming questions from our AI assistant
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-green-100 p-2 rounded-full">
              <Bot className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Farming Assistant</h3>
              <p className="text-sm text-gray-600">Online • Ready to help</p>
            </div>
          </div>
        </CardHeader>

        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto space-y-4 pb-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === "bot" && <Bot className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />}
                  {message.sender === "user" && <User className="h-4 w-4 text-blue-200 mt-1 flex-shrink-0" />}
                  <div className="flex-1">
                    <p className="whitespace-pre-line text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === "user" ? "text-blue-200" : "text-gray-500"}`}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-green-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>

        {/* Quick Suggestions */}
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {quickSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(suggestion.text)}
                className="text-xs"
              >
                {suggestion.icon}
                <span className="ml-1">{suggestion.text}</span>
              </Button>
            ))}
          </div>

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about farming..."
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-green-600 hover:bg-green-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Sprout className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-medium">Crop Advice</h4>
            <p className="text-sm text-gray-600">Get recommendations for your specific location and season</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Calculator className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-medium">Quick Calculations</h4>
            <p className="text-sm text-gray-600">Instant fertilizer and seed quantity calculations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-medium">Market Updates</h4>
            <p className="text-sm text-gray-600">Real-time prices and market trends</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
