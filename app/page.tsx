"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Sprout,
  BookOpen,
  Brain,
  Leaf,
  Mountain,
  Users,
  TrendingUp,
  Calculator,
  MapPin,
  MessageCircle,
  Settings,
  LogIn,
  LogOut,
} from "lucide-react"
import CropPredictor from "@/components/crop-predictor"
import FertilizerCalculator from "@/components/fertilizer-calculator"
import EducationHub from "@/components/education-hub"
import MarketingGuide from "@/components/marketing-guide"
import AdminDashboard from "@/components/admin-dashboard"
import ChatBot from "@/components/chatbot"
import AuthModal from "@/components/auth-modal"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "farmer" | "buyer" | "seller"
  isVerified: boolean
  token: string
}

export default function MFCSApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [user, setUser] = useState<User | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("mfcs_token")
      const userData = localStorage.getItem("mfcs_user")

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData)
          // In real app, verify token with backend
          setUser(parsedUser)
        } catch (error) {
          localStorage.removeItem("mfcs_token")
          localStorage.removeItem("mfcs_user")
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Handle admin tab access
  const handleTabChange = (tab: string) => {
    if (tab === "admin") {
      if (!user) {
        setShowAuthModal(true)
        return
      }
      if (user.role !== "admin" || !user.isVerified) {
        alert("Access Denied: Admin privileges required")
        return
      }
    }
    setActiveTab(tab)
  }

  const handleLogin = (userData: User) => {
    setUser(userData)
    localStorage.setItem("mfcs_token", userData.token)
    localStorage.setItem("mfcs_user", JSON.stringify(userData))
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("mfcs_token")
    localStorage.removeItem("mfcs_user")
    setActiveTab("home")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading MFCS...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center">
                <img
                  src="/mfcs-logo.png"
                  alt="MFCS Logo"
                  className="h-16 w-16 object-contain"
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                    background: "transparent",
                  }}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">MFCS</h1>
                <p className="text-sm opacity-90">Mehdiabad Farmers Cooperative Society Ltd.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm opacity-90">Mehdiabad Village</p>
                <p className="text-xs opacity-75">Kharmang, Pakistan</p>
              </div>
              {user ? (
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs opacity-75 capitalize">{user.role}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-green-700">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  className="text-white hover:bg-green-700"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-7 h-auto p-1 text-xs">
              <TabsTrigger value="home" className="flex flex-col items-center py-2">
                <Mountain className="h-4 w-4 mb-1" />
                Home
              </TabsTrigger>
              <TabsTrigger value="predict" className="flex flex-col items-center py-2">
                <Brain className="h-4 w-4 mb-1" />
                AI Predict
              </TabsTrigger>
              <TabsTrigger value="fertilizer" className="flex flex-col items-center py-2">
                <Calculator className="h-4 w-4 mb-1" />
                Fertilizer
              </TabsTrigger>
              <TabsTrigger value="education" className="flex flex-col items-center py-2">
                <BookOpen className="h-4 w-4 mb-1" />
                Learn
              </TabsTrigger>
              <TabsTrigger value="market" className="flex flex-col items-center py-2">
                <TrendingUp className="h-4 w-4 mb-1" />
                Market
              </TabsTrigger>
              <TabsTrigger value="chatbot" className="flex flex-col items-center py-2">
                <MessageCircle className="h-4 w-4 mb-1" />
                Chat
              </TabsTrigger>
              <TabsTrigger
                value="admin"
                className={`flex flex-col items-center py-2 ${
                  user?.role !== "admin" || !user?.isVerified ? "opacity-50" : ""
                }`}
              >
                <Settings className="h-4 w-4 mb-1" />
                Admin
                {user?.role === "admin" && user?.isVerified && (
                  <div className="w-2 h-2 bg-green-500 rounded-full absolute -top-1 -right-1"></div>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </nav>

      {/* Rest of the component remains the same */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* All existing TabsContent components remain the same */}
          <TabsContent value="home" className="space-y-6">
            {/* Welcome Section */}
            <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-6 w-6" />
                  <span>Welcome to MFCS</span>
                  {user && <span className="text-sm opacity-75">- {user.name}</span>}
                </CardTitle>
                <CardDescription className="text-green-100">
                  Empowering farmers in Mehdiabad village with modern agricultural techniques and AI-powered insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>Serving Kharmang District, Gilgit-Baltistan</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Sprout className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">500+</p>
                  <p className="text-sm text-gray-600">Farmers Helped</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Leaf className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-600">50+</p>
                  <p className="text-sm text-gray-600">Crop Varieties</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-orange-600">30%</p>
                  <p className="text-sm text-gray-600">Yield Increase</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-600">100+</p>
                  <p className="text-sm text-gray-600">Training Sessions</p>
                </CardContent>
              </Card>
            </div>

            {/* Services Overview */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <span>AI-Powered Farming</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Get intelligent crop recommendations and fertilizer calculations based on your soil conditions and
                    climate data.
                  </p>
                  <Button onClick={() => setActiveTab("predict")} className="w-full bg-blue-600 hover:bg-blue-700">
                    Try AI Predictor
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    <span>Farming Education</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Learn modern techniques for irrigation, pest control, fruit drying, and sustainable farming
                    practices.
                  </p>
                  <Button onClick={() => setActiveTab("education")} className="w-full bg-green-600 hover:bg-green-700">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Mission Statement */}
            <Card className="bg-amber-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700">
                  To empower the farmers of Mehdiabad village and surrounding areas in Kharmang district by providing
                  access to modern seeds, fertilizers, training programs, and cutting-edge agricultural technology. We
                  believe in sustainable farming practices that increase yield while preserving our beautiful mountain
                  environment.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predict">
            <CropPredictor />
          </TabsContent>

          <TabsContent value="fertilizer">
            <FertilizerCalculator />
          </TabsContent>

          <TabsContent value="education">
            <EducationHub />
          </TabsContent>

          <TabsContent value="market">
            <MarketingGuide />
          </TabsContent>

          <TabsContent value="chatbot">
            <ChatBot />
          </TabsContent>

          <TabsContent value="admin">
            {user?.role === "admin" && user?.isVerified ? (
              <AdminDashboard user={user} />
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Access Restricted</h3>
                  <p className="text-gray-600 mb-4">This section is only accessible to verified administrators.</p>
                  {!user && (
                    <Button onClick={() => setShowAuthModal(true)} className="bg-blue-600 hover:bg-blue-700">
                      Login to Continue
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Authentication Modal */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} onLogin={handleLogin} />}

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Mountain className="h-6 w-6" />
              <span className="text-lg font-semibold">MFCS</span>
            </div>
            <p className="text-gray-300 mb-2">Mehdiabad Farmers Cooperative Society Ltd.</p>
            <p className="text-sm text-gray-400">Mehdiabad Village, Kharmang District, Gilgit-Baltistan, Pakistan</p>
            <p className="text-xs text-gray-500 mt-4">
              © 2024 MFCS. Empowering farmers through technology and education.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
