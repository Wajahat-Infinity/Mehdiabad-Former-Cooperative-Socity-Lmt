// Authentication utility functions for Django JWT integration

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  name: string
  email: string
  password: string
  phone: string
  location?: string
  userType: "farmer" | "buyer" | "seller"
}

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "farmer" | "buyer" | "seller"
  isVerified: boolean
  token: string
}

// Base API URL - replace with your Django backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export class AuthService {
  // Login function to authenticate with Django backend
  static async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Login failed")
      }

      const data = await response.json()

      // Expected Django response format:
      // {
      //   "user": {
      //     "id": "1",
      //     "name": "User Name",
      //     "email": "user@example.com",
      //     "role": "farmer",
      //     "is_verified": true
      //   },
      //   "access_token": "jwt_token_here",
      //   "refresh_token": "refresh_token_here"
      // }

      return {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        isVerified: data.user.is_verified,
        token: data.access_token,
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Login failed")
    }
  }

  // Register function to create new user account
  static async register(userData: RegisterData): Promise<{ message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          phone: userData.phone,
          location: userData.location,
          user_type: userData.userType,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Registration failed")
      }

      const data = await response.json()
      return { message: data.message || "Registration successful" }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Registration failed")
    }
  }

  // Verify JWT token with backend
  static async verifyToken(token: string): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Token verification failed")
      }

      const data = await response.json()
      return {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        isVerified: data.user.is_verified,
        token: token,
      }
    } catch (error) {
      throw new Error("Token verification failed")
    }
  }

  // Refresh JWT token
  static async refreshToken(refreshToken: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      })

      if (!response.ok) {
        throw new Error("Token refresh failed")
      }

      const data = await response.json()
      return data.access
    } catch (error) {
      throw new Error("Token refresh failed")
    }
  }

  // Admin function to verify user accounts
  static async verifyUser(userId: string, action: "approve" | "reject", adminToken: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/verify-user/${userId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ action }),
      })

      if (!response.ok) {
        throw new Error("User verification failed")
      }
    } catch (error) {
      throw new Error("User verification failed")
    }
  }

  // Get pending user registrations (admin only)
  static async getPendingUsers(adminToken: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/pending-users/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch pending users")
      }

      const data = await response.json()
      return data.users || []
    } catch (error) {
      throw new Error("Failed to fetch pending users")
    }
  }

  // Logout function
  static logout(): void {
    localStorage.removeItem("mfcs_token")
    localStorage.removeItem("mfcs_user")
    localStorage.removeItem("mfcs_refresh_token")
  }
}

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("mfcs_token")
  return !!token
}

// Helper function to check if user is admin
export const isAdmin = (): boolean => {
  const userData = localStorage.getItem("mfcs_user")
  if (!userData) return false

  try {
    const user = JSON.parse(userData)
    return user.role === "admin" && user.isVerified
  } catch {
    return false
  }
}

// Helper function to get current user
export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem("mfcs_user")
  if (!userData) return null

  try {
    return JSON.parse(userData)
  } catch {
    return null
  }
}
