"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MessageSquare, ThumbsUp, ThumbsDown, User, Calendar, TrendingUp, Award, Send } from "lucide-react"

interface Review {
  id: string
  userName: string
  rating: number
  comment: string
  category: string
  date: string
  helpful: number
  verified: boolean
}

interface Feedback {
  id: string
  userName: string
  email: string
  category: string
  message: string
  priority: "low" | "medium" | "high"
  status: "pending" | "reviewed" | "resolved"
  date: string
}

export default function FeedbackReview() {
  const [activeTab, setActiveTab] = useState("reviews")
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    category: "",
  })
  const [newFeedback, setNewFeedback] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
    priority: "medium" as "low" | "medium" | "high",
  })

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      userName: "Ahmad Khan",
      rating: 5,
      comment:
        "MFCS has transformed my farming. The AI crop predictor helped me choose the right crops and increased my yield by 40%. Excellent service!",
      category: "AI Tools",
      date: "2024-01-20",
      helpful: 12,
      verified: true,
    },
    {
      id: "2",
      userName: "Fatima Ali",
      rating: 4,
      comment:
        "Great educational content and very helpful fertilizer calculator. The market prices feature is very useful for planning sales.",
      category: "Education",
      date: "2024-01-18",
      helpful: 8,
      verified: true,
    },
    {
      id: "3",
      userName: "Muhammad Hassan",
      rating: 5,
      comment:
        "The chatbot is amazing! Got instant answers to my pest control questions. Saved my apple crop from aphids.",
      category: "Chatbot",
      date: "2024-01-15",
      helpful: 15,
      verified: false,
    },
  ])

  const [feedback, setFeedback] = useState<Feedback[]>([
    {
      id: "1",
      userName: "Zainab Shah",
      email: "zainab@example.com",
      category: "Feature Request",
      message: "Please add weather forecasting feature for better crop planning.",
      priority: "medium",
      status: "pending",
      date: "2024-01-22",
    },
    {
      id: "2",
      userName: "Ali Raza",
      email: "ali@example.com",
      category: "Bug Report",
      message: "The fertilizer calculator sometimes shows incorrect results for barley.",
      priority: "high",
      status: "reviewed",
      date: "2024-01-21",
    },
  ])

  const handleReviewSubmit = () => {
    if (newReview.rating > 0 && newReview.comment && newReview.category) {
      const review: Review = {
        id: Date.now().toString(),
        userName: "Anonymous User", // In real app, get from auth
        rating: newReview.rating,
        comment: newReview.comment,
        category: newReview.category,
        date: new Date().toISOString().split("T")[0],
        helpful: 0,
        verified: false,
      }
      setReviews([review, ...reviews])
      setNewReview({ rating: 0, comment: "", category: "" })
    }
  }

  const handleFeedbackSubmit = () => {
    if (newFeedback.name && newFeedback.email && newFeedback.message && newFeedback.category) {
      const feedbackItem: Feedback = {
        id: Date.now().toString(),
        userName: newFeedback.name,
        email: newFeedback.email,
        category: newFeedback.category,
        message: newFeedback.message,
        priority: newFeedback.priority,
        status: "pending",
        date: new Date().toISOString().split("T")[0],
      }
      setFeedback([feedbackItem, ...feedback])
      setNewFeedback({ name: "", email: "", category: "", message: "", priority: "medium" })
    }
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewed":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6" />
            <span>Feedback & Reviews</span>
          </CardTitle>
          <CardDescription className="text-yellow-100">
            Share your experience and help us improve MFCS services
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2 fill-current" />
            <p className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</p>
            <p className="text-sm text-gray-600">Average Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">{reviews.length}</p>
            <p className="text-sm text-gray-600">Total Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{feedback.length}</p>
            <p className="text-sm text-gray-600">Feedback Items</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">{reviews.filter((r) => r.verified).length}</p>
            <p className="text-sm text-gray-600">Verified Reviews</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="feedback">Submit Feedback</TabsTrigger>
          <TabsTrigger value="admin-feedback">Manage Feedback</TabsTrigger>
        </TabsList>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-6">
          {/* Write Review */}
          <Card>
            <CardHeader>
              <CardTitle>Write a Review</CardTitle>
              <CardDescription>Share your experience with MFCS services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Rating</Label>
                {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={newReview.category}
                  onValueChange={(value) => setNewReview({ ...newReview, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AI Tools">AI Tools</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Market">Market Information</SelectItem>
                    <SelectItem value="Chatbot">Chatbot</SelectItem>
                    <SelectItem value="Overall">Overall Experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Your Review</Label>
                <Textarea
                  placeholder="Tell us about your experience..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                />
              </div>

              <Button
                onClick={handleReviewSubmit}
                className="w-full bg-yellow-600 hover:bg-yellow-700"
                disabled={!newReview.rating || !newReview.comment || !newReview.category}
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Review
              </Button>
            </CardContent>
          </Card>

          {/* Existing Reviews */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">User Reviews</h3>
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{review.userName}</h4>
                          {review.verified && <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">{review.category}</Badge>
                  </div>

                  <p className="text-gray-700 mb-4">{review.comment}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-green-600">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Helpful ({review.helpful})
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        Not Helpful
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Submit Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit Feedback</CardTitle>
              <CardDescription>
                Help us improve by sharing your suggestions, reporting bugs, or requesting features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="feedbackName">Your Name</Label>
                  <Input
                    id="feedbackName"
                    placeholder="Enter your name"
                    value={newFeedback.name}
                    onChange={(e) => setNewFeedback({ ...newFeedback, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedbackEmail">Email</Label>
                  <Input
                    id="feedbackEmail"
                    type="email"
                    placeholder="Enter your email"
                    value={newFeedback.email}
                    onChange={(e) => setNewFeedback({ ...newFeedback, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={newFeedback.category}
                    onValueChange={(value) => setNewFeedback({ ...newFeedback, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bug Report">Bug Report</SelectItem>
                      <SelectItem value="Feature Request">Feature Request</SelectItem>
                      <SelectItem value="Improvement">Improvement Suggestion</SelectItem>
                      <SelectItem value="General">General Feedback</SelectItem>
                      <SelectItem value="Support">Support Request</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={newFeedback.priority}
                    onValueChange={(value: "low" | "medium" | "high") =>
                      setNewFeedback({ ...newFeedback, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  placeholder="Describe your feedback in detail..."
                  rows={4}
                  value={newFeedback.message}
                  onChange={(e) => setNewFeedback({ ...newFeedback, message: e.target.value })}
                />
              </div>

              <Button
                onClick={handleFeedbackSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!newFeedback.name || !newFeedback.email || !newFeedback.message || !newFeedback.category}
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Feedback
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin Feedback Management */}
        <TabsContent value="admin-feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Management</CardTitle>
              <CardDescription>Review and manage user feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedback.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{item.userName}</h4>
                        <p className="text-sm text-gray-600">{item.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{item.message}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Mark as Reviewed
                      </Button>
                      <Button size="sm" variant="outline">
                        Mark as Resolved
                      </Button>
                      <Button size="sm" variant="outline">
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
