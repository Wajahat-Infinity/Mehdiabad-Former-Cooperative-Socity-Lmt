"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  Upload,
  Users,
  Video,
  UserCheck,
  UserX,
  Eye,
  Edit,
  Trash2,
  Plus,
  FileVideo,
  User,
} from "lucide-react"
import FeedbackReview from "@/components/feedback-review" // Import FeedbackReview component

interface Course {
  id: string
  title: string
  description: string
  videoUrl: string
  duration: string
  uploadDate: string
  status: "active" | "draft"
}

interface AdminDashboardProps {
  user: {
    id: string
    name: string
    email: string
    role: string
    isVerified: boolean
    token: string
  }
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("courses")
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      title: "Modern Irrigation Techniques",
      description: "Learn efficient water management systems",
      videoUrl: "/videos/irrigation.mp4",
      duration: "45 min",
      uploadDate: "2024-01-15",
      status: "active",
    },
    {
      id: "2",
      title: "Organic Pest Control",
      description: "Safe and effective pest management",
      videoUrl: "/videos/pest-control.mp4",
      duration: "30 min",
      uploadDate: "2024-01-10",
      status: "active",
    },
  ])

  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Ahmad Khan",
      email: "ahmad@example.com",
      phone: "+92-300-1234567",
      type: "seller",
      status: "active",
      joinDate: "2024-01-01",
      location: "Mehdiabad",
    },
    {
      id: "2",
      name: "Fatima Ali",
      email: "fatima@example.com",
      phone: "+92-301-2345678",
      type: "buyer",
      status: "pending",
      joinDate: "2024-01-20",
      location: "Skardu",
    },
  ])

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    duration: "",
    videoFile: null as File | null,
  })

  const [pendingUsers, setPendingUsers] = useState([
    {
      id: "pending_1",
      name: "New Farmer",
      email: "newfarmer@example.com",
      phone: "+92-300-9876543",
      userType: "farmer",
      location: "Skardu",
      registrationDate: "2024-01-25",
      status: "pending",
    },
    {
      id: "pending_2",
      name: "Buyer Request",
      email: "buyer@example.com",
      phone: "+92-301-8765432",
      userType: "buyer",
      location: "Gilgit",
      registrationDate: "2024-01-24",
      status: "pending",
    },
  ])

  const handleCourseUpload = () => {
    if (newCourse.title && newCourse.description && newCourse.duration) {
      const course: Course = {
        id: Date.now().toString(),
        title: newCourse.title,
        description: newCourse.description,
        videoUrl: newCourse.videoFile ? URL.createObjectURL(newCourse.videoFile) : "",
        duration: newCourse.duration,
        uploadDate: new Date().toISOString().split("T")[0],
        status: "draft",
      }
      setCourses([...courses, course])
      setNewCourse({ title: "", description: "", duration: "", videoFile: null })
    }
  }

  const updateUserStatus = (userId: string, newStatus: "active" | "pending" | "suspended") => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Add function to handle user verification
  const handleUserVerification = (userId: string, action: "approve" | "reject") => {
    setPendingUsers(
      pendingUsers.map((user) =>
        user.id === userId ? { ...user, status: action === "approve" ? "approved" : "rejected" } : user,
      ),
    )

    // In real app, make API call to Django backend
    // fetch(`/api/admin/verify-user/${userId}`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${user.token}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ action })
    // })
  }

  // Rest of the existing component code remains the same, but add new tab for user verification
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-6 w-6" />
            <span>Admin Dashboard</span>
          </CardTitle>
          <CardDescription className="text-indigo-100">
            Welcome {user.name} - Manage courses, users, and platform content
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="courses">Course Management</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="pending">
            Pending Approvals
            {pendingUsers.filter((u) => u.status === "pending").length > 0 && (
              <Badge className="ml-2 bg-red-500 text-white">
                {pendingUsers.filter((u) => u.status === "pending").length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="feedback">Feedback & Reviews</TabsTrigger>
        </TabsList>

        {/* Add new Pending Approvals tab */}
        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="h-5 w-5 text-orange-600" />
                <span>Pending User Registrations</span>
              </CardTitle>
              <CardDescription>Review and approve new user registrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingUsers
                  .filter((u) => u.status === "pending")
                  .map((pendingUser) => (
                    <div key={pendingUser.id} className="border rounded-lg p-4 bg-yellow-50">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-yellow-100 p-2 rounded-full">
                            <User className="h-6 w-6 text-yellow-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{pendingUser.name}</h4>
                            <p className="text-sm text-gray-600">{pendingUser.email}</p>
                            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                              <span>{pendingUser.phone}</span>
                              <span>{pendingUser.location}</span>
                              <span>Registered: {pendingUser.registrationDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="capitalize">
                            {pendingUser.userType}
                          </Badge>
                          <Button
                            size="sm"
                            onClick={() => handleUserVerification(pendingUser.id, "approve")}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUserVerification(pendingUser.id, "reject")}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                {pendingUsers.filter((u) => u.status === "pending").length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <UserCheck className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No pending registrations</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* All other existing tabs remain the same */}
        <TabsContent value="courses" className="space-y-6">
          {/* Upload New Course */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5 text-blue-600" />
                <span>Upload New Course</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="courseTitle">Course Title</Label>
                  <Input
                    id="courseTitle"
                    placeholder="Enter course title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseDuration">Duration</Label>
                  <Input
                    id="courseDuration"
                    placeholder="e.g., 45 min"
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="courseDescription">Description</Label>
                <Textarea
                  id="courseDescription"
                  placeholder="Enter course description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="videoFile">Video File</Label>
                <Input
                  id="videoFile"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setNewCourse({ ...newCourse, videoFile: e.target.files?.[0] || null })}
                />
              </div>

              <Button onClick={handleCourseUpload} className="w-full bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Upload Course
              </Button>
            </CardContent>
          </Card>

          {/* Existing Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Video className="h-5 w-5 text-green-600" />
                <span>Existing Courses</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileVideo className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-gray-600">{course.description}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                          <span>Duration: {course.duration}</span>
                          <span>Uploaded: {course.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span>User Management</span>
              </CardTitle>
              <CardDescription>Manage buyer and seller accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gray-100 p-2 rounded-full">
                        {user.type === "buyer" ? (
                          <UserCheck className="h-6 w-6 text-blue-600" />
                        ) : (
                          <Users className="h-6 w-6 text-green-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                          <span>{user.phone}</span>
                          <span>{user.location}</span>
                          <span>Joined: {user.joinDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getStatusColor(user.status)} capitalize`}>{user.status}</Badge>
                      <Badge variant="outline" className="capitalize">
                        {user.type}
                      </Badge>
                      <Select
                        value={user.status}
                        onValueChange={(value: "active" | "pending" | "suspended") => updateUserStatus(user.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* User Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{users.filter((u) => u.type === "buyer").length}</p>
                <p className="text-sm text-gray-600">Total Buyers</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{users.filter((u) => u.type === "seller").length}</p>
                <p className="text-sm text-gray-600">Total Sellers</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <UserX className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-600">
                  {users.filter((u) => u.status === "pending").length}
                </p>
                <p className="text-sm text-gray-600">Pending Approval</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback">
          <FeedbackReview />
        </TabsContent>
      </Tabs>
    </div>
  )
}
