// Middleware for protecting routes and API calls

export class AuthMiddleware {
  // Check if user has required permissions
  static hasPermission(userRole: string, requiredRole: string): boolean {
    const roleHierarchy = {
      admin: 4,
      seller: 3,
      buyer: 2,
      farmer: 1,
    }

    return (
      roleHierarchy[userRole as keyof typeof roleHierarchy] >= roleHierarchy[requiredRole as keyof typeof roleHierarchy]
    )
  }

  // Validate JWT token format
  static isValidJWT(token: string): boolean {
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
    return jwtRegex.test(token)
  }

  // Check if token is expired (basic check)
  static isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      const currentTime = Date.now() / 1000
      return payload.exp < currentTime
    } catch {
      return true
    }
  }

  // Get authorization headers for API calls
  static getAuthHeaders(token: string): Record<string, string> {
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  }
}
