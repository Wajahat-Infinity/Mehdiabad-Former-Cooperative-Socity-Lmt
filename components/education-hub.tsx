"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Droplets, Bug, Sun, Sprout, Truck, PlayCircle, Clock, Users } from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  duration: string
  level: string
  modules: string[]
  icon: React.ReactNode
}

export default function EducationHub() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

  const courses: Course[] = [
    {
      id: "irrigation",
      title: "Modern Irrigation Techniques",
      description: "Learn efficient water management and irrigation systems suitable for mountain farming",
      duration: "2 hours",
      level: "Beginner",
      icon: <Droplets className="h-6 w-6 text-blue-600" />,
      modules: [
        "Understanding Water Requirements",
        "Drip Irrigation Systems",
        "Sprinkler Systems for Mountain Terrain",
        "Water Conservation Techniques",
        "Scheduling Irrigation",
        "Maintenance and Troubleshooting",
      ],
    },
    {
      id: "pest-control",
      title: "Integrated Pest Management",
      description: "Safe and effective pest control methods using modern techniques and organic solutions",
      duration: "3 hours",
      level: "Intermediate",
      icon: <Bug className="h-6 w-6 text-red-600" />,
      modules: [
        "Identifying Common Pests",
        "Biological Control Methods",
        "Safe Pesticide Application",
        "Organic Pest Control Solutions",
        "Preventive Measures",
        "Monitoring and Record Keeping",
      ],
    },
    {
      id: "fruit-drying",
      title: "Fruit Drying and Preservation",
      description: "Traditional and modern methods for drying and preserving fruits for better market value",
      duration: "2.5 hours",
      level: "Beginner",
      icon: <Sun className="h-6 w-6 text-orange-600" />,
      modules: [
        "Selecting Fruits for Drying",
        "Solar Drying Techniques",
        "Mechanical Drying Methods",
        "Quality Control and Storage",
        "Packaging for Market",
        "Value Addition Strategies",
      ],
    },
    {
      id: "vegetable-farming",
      title: "Vegetable Cultivation",
      description: "Complete guide to growing vegetables in mountain climate conditions",
      duration: "4 hours",
      level: "Beginner",
      icon: <Sprout className="h-6 w-6 text-green-600" />,
      modules: [
        "Soil Preparation for Vegetables",
        "Seed Selection and Sowing",
        "Nutrient Management",
        "Disease Prevention",
        "Harvesting Techniques",
        "Post-Harvest Handling",
      ],
    },
    {
      id: "marketing",
      title: "Agricultural Marketing",
      description: "Learn how to effectively market your produce and maximize profits",
      duration: "3 hours",
      level: "Intermediate",
      icon: <Truck className="h-6 w-6 text-purple-600" />,
      modules: [
        "Understanding Market Demand",
        "Price Discovery and Negotiation",
        "Direct Marketing Strategies",
        "Online Marketing Platforms",
        "Cooperative Marketing",
        "Export Opportunities",
      ],
    },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span>MFCS Education Hub</span>
          </CardTitle>
          <CardDescription className="text-blue-100">
            Comprehensive training programs designed for farmers in Kharmang region
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">500+</p>
              <p className="text-sm opacity-90">Farmers Trained</p>
            </div>
            <div>
              <p className="text-2xl font-bold">15+</p>
              <p className="text-sm opacity-90">Training Modules</p>
            </div>
            <div>
              <p className="text-2xl font-bold">95%</p>
              <p className="text-sm opacity-90">Success Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="courses">Available Courses</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {course.icon}
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <CardDescription className="mt-1">{course.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.modules.length} modules</span>
                    </div>
                  </div>

                  {selectedCourse === course.id ? (
                    <div className="space-y-3">
                      <h4 className="font-medium">Course Modules:</h4>
                      <div className="grid gap-2">
                        {course.modules.map((module, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                            <PlayCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{module}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button className="bg-green-600 hover:bg-green-700">Start Course</Button>
                        <Button variant="outline" onClick={() => setSelectedCourse(null)}>
                          Hide Details
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button variant="outline" onClick={() => setSelectedCourse(course.id)} className="w-full">
                      View Course Details
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <span>Farming Guides</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-3 bg-gray-50 rounded">
                  <h4 className="font-medium">Mountain Farming Handbook</h4>
                  <p className="text-sm text-gray-600">Complete guide for high-altitude agriculture</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <h4 className="font-medium">Seasonal Crop Calendar</h4>
                  <p className="text-sm text-gray-600">Optimal planting and harvesting times</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <h4 className="font-medium">Soil Management Guide</h4>
                  <p className="text-sm text-gray-600">Improving soil health and fertility</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PlayCircle className="h-5 w-5 text-red-600" />
                  <span>Video Tutorials</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-3 bg-gray-50 rounded">
                  <h4 className="font-medium">Drip Irrigation Setup</h4>
                  <p className="text-sm text-gray-600">Step-by-step installation guide</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <h4 className="font-medium">Organic Composting</h4>
                  <p className="text-sm text-gray-600">Making nutrient-rich compost at home</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <h4 className="font-medium">Pest Identification</h4>
                  <p className="text-sm text-gray-600">Visual guide to common pests</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span>Community Forum</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Connect with fellow farmers, share experiences, and get expert advice.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700">Join Community</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span>Upcoming Workshops</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-3 bg-purple-50 rounded">
                  <h4 className="font-medium">Modern Seed Varieties</h4>
                  <p className="text-sm text-gray-600">Jan 15, 2024 • 2:00 PM</p>
                </div>
                <div className="p-3 bg-purple-50 rounded">
                  <h4 className="font-medium">Climate-Smart Agriculture</h4>
                  <p className="text-sm text-gray-600">Jan 22, 2024 • 10:00 AM</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
