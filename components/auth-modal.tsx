"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { X, LogIn, UserPlus, Eye, EyeOff, Shield } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "farmer" | "buyer" | "seller"
  isVerified: boolean
  token: string
}

interface AuthModalProps {
  onClose: () => void
  onLogin: (user: User) => void
}

export default function AuthModal({ onClose, onLogin }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    location: "",
    userType: "farmer" as "farmer" | "buyer" | "seller",
  })

  // Mock users for demonstration (replace with actual API calls)
  const mockUsers = [
    {
      id: "1",
      name: "Admin User",
      email: "admin@mfcs.com",
      password: "admin123",
      role: "admin" as const,
      isVerified: true,
    },
    {
      id: "2",
      name: "Ahmad Khan",
      email: "ahmad@example.com",
      password: "farmer123",
      role: "farmer" as const,
      isVerified: true,
    },
    {
      id: "3",
      name: "Unverified User",
      email: "unverified@example.com",
      password: "test123",
      role: "farmer" as const,
      isVerified: false,
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleLogin = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In real app, make API call to Django backend
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: formData.email, password: formData.password })
      // })

      // Mock authentication logic
      const user = mockUsers.find((u) => u.email === formData.email && u.password === formData.password)

      if (!user) {
        setError("Invalid email or password")
        return
      }

      if (!user.isVerified) {
        setError("Your account is not verified. Please contact admin for verification.")
        return
      }

      // Generate mock JWT token (in real app, this comes from backend)
      const mockToken = `jwt_token_${user.id}_${Date.now()}`

      const userData: User = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        token: mockToken,
      }

      onLogin(userData)
    } catch (error) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async () => {
    setIsLoading(true)
    setError("")

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.password || !formData.phone) {
        setError("Please fill in all required fields")
        return
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In real app, make API call to Django backend
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      // Mock registration success
      setError("")
      alert(
        "Registration successful! Your account has been created but requires admin verification before you can login. You will be notified once verified.",
      )
      onClose()
    } catch (error) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-green-600" />
              <CardTitle>{isLogin ? "Login to MFCS" : "Register for MFCS"}</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            {isLogin ? "Enter your credentials to access your account" : "Create an account to access MFCS services"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          {!isLogin && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="+92-300-1234567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Your village/city"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userType">Account Type</Label>
                <select
                  id="userType"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.userType}
                  onChange={(e) => handleInputChange("userType", e.target.value)}
                >
                  <option value="farmer">Farmer</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {isLogin && (
            // <div className="bg-blue-50 p-3 rounded-lg">
            //   <h4 className="font-medium text-blue-800 mb-2">Demo Credentials:</h4>
            //   <div className="text-sm text-blue-700 space-y-1">
            //     <p>
            //       <strong>Admin:</strong> admin@mfcs.com / admin123
            //     </p>
            //     <p>
            //       <strong>Farmer:</strong> ahmad@example.com / farmer123
            //     </p>
            //     <p>
            //       <strong>Unverified:</strong> unverified@example.com / test123
            //     </p>
            //   </div>
            // </div>
          )}

          <Button
            onClick={isLogin ? handleLogin : handleRegister}
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>{isLogin ? "Logging in..." : "Registering..."}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {isLogin ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                <span>{isLogin ? "Login" : "Register"}</span>
              </div>
            )}
          </Button>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => {
                setIsLogin(!isLogin)
                setError("")
                setFormData({
                  email: "",
                  password: "",
                  name: "",
                  phone: "",
                  location: "",
                  userType: "farmer",
                })
              }}
            >
              {isLogin ? "Need an account? Register here" : "Already have an account? Login here"}
            </Button>
          </div>

          {!isLogin && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertDescription className="text-amber-700">
                <strong>Note:</strong> New registrations require admin verification before login access is granted.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
