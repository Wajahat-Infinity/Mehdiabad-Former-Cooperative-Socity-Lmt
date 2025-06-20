"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, DollarSign, Truck, Users, Globe, Phone, MapPin, Calendar, Package, Star } from "lucide-react"

interface MarketPrice {
  crop: string
  currentPrice: number
  lastWeekPrice: number
  trend: "up" | "down" | "stable"
  unit: string
}

interface Buyer {
  name: string
  location: string
  contact: string
  crops: string[]
  rating: number
  type: "Wholesaler" | "Retailer" | "Exporter"
}

export default function MarketingGuide() {
  const [selectedTab, setSelectedTab] = useState("prices")

  const marketPrices: MarketPrice[] = [
    { crop: "Wheat", currentPrice: 85, lastWeekPrice: 82, trend: "up", unit: "PKR/kg" },
    { crop: "Barley", currentPrice: 65, lastWeekPrice: 67, trend: "down", unit: "PKR/kg" },
    { crop: "Potato", currentPrice: 45, lastWeekPrice: 45, trend: "stable", unit: "PKR/kg" },
    { crop: "Apple", currentPrice: 120, lastWeekPrice: 115, trend: "up", unit: "PKR/kg" },
    { crop: "Dried Apricot", currentPrice: 800, lastWeekPrice: 780, trend: "up", unit: "PKR/kg" },
    { crop: "Walnuts", currentPrice: 1200, lastWeekPrice: 1180, trend: "up", unit: "PKR/kg" },
  ]

  const buyers: Buyer[] = [
    {
      name: "Gilgit Fruit Company",
      location: "Gilgit City",
      contact: "+92-300-1234567",
      crops: ["Apple", "Apricot", "Walnut"],
      rating: 4.8,
      type: "Wholesaler",
    },
    {
      name: "Mountain Fresh Exports",
      location: "Skardu",
      contact: "+92-301-2345678",
      crops: ["Dried Fruits", "Nuts"],
      rating: 4.6,
      type: "Exporter",
    },
    {
      name: "Kharmang Grain Traders",
      location: "Kharmang",
      contact: "+92-302-3456789",
      crops: ["Wheat", "Barley", "Buckwheat"],
      rating: 4.5,
      type: "Wholesaler",
    },
    {
      name: "Organic Valley Store",
      location: "Islamabad",
      contact: "+92-303-4567890",
      crops: ["Organic Vegetables", "Fruits"],
      rating: 4.9,
      type: "Retailer",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6" />
            <span>Agricultural Marketing Hub</span>
          </CardTitle>
          <CardDescription className="text-purple-100">
            Connect with buyers, track prices, and maximize your farm profits
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="prices">Market Prices</TabsTrigger>
          <TabsTrigger value="buyers">Find Buyers</TabsTrigger>
          <TabsTrigger value="tips">Marketing Tips</TabsTrigger>
          <TabsTrigger value="calendar">Harvest Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="prices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span>Current Market Prices</span>
              </CardTitle>
              <CardDescription>Updated daily from major markets in Gilgit-Baltistan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {marketPrices.map((price, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Package className="h-5 w-5 text-gray-600" />
                      <div>
                        <h4 className="font-medium">{price.crop}</h4>
                        <p className="text-sm text-gray-600">
                          Last week: {price.lastWeekPrice} {price.unit}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold">
                          {price.currentPrice} {price.unit}
                        </span>
                        {getTrendIcon(price.trend)}
                      </div>
                      <p className={`text-sm ${getTrendColor(price.trend)}`}>
                        {price.trend === "up" && "+"}
                        {price.trend === "down" && "-"}
                        {price.trend !== "stable" && Math.abs(price.currentPrice - price.lastWeekPrice)}
                        {price.trend === "stable" && "No change"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h4 className="font-medium text-blue-800 mb-2">Price Alerts</h4>
              <p className="text-sm text-blue-700 mb-3">Get notified when prices reach your target levels</p>
              <Button className="bg-blue-600 hover:bg-blue-700">Set Price Alerts</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="buyers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-600" />
                <span>Verified Buyers</span>
              </CardTitle>
              <CardDescription>Connect directly with trusted buyers in your region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {buyers.map((buyer, index) => (
                  <Card key={index} className="border-l-4 border-l-purple-500">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-lg">{buyer.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{buyer.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="h-4 w-4" />
                              <span>{buyer.contact}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{buyer.type}</Badge>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{buyer.rating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Interested in:</p>
                        <div className="flex flex-wrap gap-1">
                          {buyer.crops.map((crop, cropIndex) => (
                            <Badge key={cropIndex} variant="secondary" className="text-xs">
                              {crop}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-purple-600 hover:bg-purple-700">Contact Buyer</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <h4 className="font-medium text-green-800 mb-2">Register as Seller</h4>
              <p className="text-sm text-green-700 mb-3">Create your seller profile to get direct orders from buyers</p>
              <Button className="bg-green-600 hover:bg-green-700">Create Seller Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-orange-600" />
                  <span>Quality Standards</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-orange-50 rounded">
                  <h4 className="font-medium">Grading and Sorting</h4>
                  <p className="text-sm text-gray-600">Separate produce by size, color, and quality</p>
                </div>
                <div className="p-3 bg-orange-50 rounded">
                  <h4 className="font-medium">Proper Packaging</h4>
                  <p className="text-sm text-gray-600">Use appropriate containers and labels</p>
                </div>
                <div className="p-3 bg-orange-50 rounded">
                  <h4 className="font-medium">Cleanliness</h4>
                  <p className="text-sm text-gray-600">Wash and clean produce before packaging</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span>Pricing Strategies</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded">
                  <h4 className="font-medium">Market Research</h4>
                  <p className="text-sm text-gray-600">Know current prices before selling</p>
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <h4 className="font-medium">Bulk vs Retail</h4>
                  <p className="text-sm text-gray-600">Consider different pricing for different quantities</p>
                </div>
                <div className="p-3 bg-blue-50 rounded">
                  <h4 className="font-medium">Seasonal Timing</h4>
                  <p className="text-sm text-gray-600">Sell when demand is high and supply is low</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  <span>Online Marketing</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 rounded">
                  <h4 className="font-medium">Social Media</h4>
                  <p className="text-sm text-gray-600">Use Facebook and WhatsApp to reach customers</p>
                </div>
                <div className="p-3 bg-green-50 rounded">
                  <h4 className="font-medium">Online Marketplaces</h4>
                  <p className="text-sm text-gray-600">List products on agricultural platforms</p>
                </div>
                <div className="p-3 bg-green-50 rounded">
                  <h4 className="font-medium">Digital Payments</h4>
                  <p className="text-sm text-gray-600">Accept mobile payments for convenience</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-purple-600" />
                  <span>Transportation</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-purple-50 rounded">
                  <h4 className="font-medium">Cold Chain</h4>
                  <p className="text-sm text-gray-600">Maintain temperature for perishables</p>
                </div>
                <div className="p-3 bg-purple-50 rounded">
                  <h4 className="font-medium">Shared Transport</h4>
                  <p className="text-sm text-gray-600">Coordinate with other farmers to reduce costs</p>
                </div>
                <div className="p-3 bg-purple-50 rounded">
                  <h4 className="font-medium">Route Planning</h4>
                  <p className="text-sm text-gray-600">Optimize delivery routes for efficiency</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <span>Harvest & Marketing Calendar</span>
              </CardTitle>
              <CardDescription>Optimal harvesting and selling times for maximum profits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Spring (March - May)</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-medium">Harvest:</p>
                      <ul className="list-disc list-inside text-gray-700">
                        <li>Early potatoes</li>
                        <li>Spring vegetables</li>
                        <li>Fresh herbs</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">Market Tips:</p>
                      <ul className="list-disc list-inside text-gray-700">
                        <li>High demand for fresh produce</li>
                        <li>Premium prices for early crops</li>
                        <li>Focus on local markets</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">Summer (June - August)</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-medium">Harvest:</p>
                      <ul className="list-disc list-inside text-gray-700">
                        <li>Apricots (June-July)</li>
                        <li>Early apples</li>
                        <li>Summer vegetables</li>
                        <li>Barley and wheat</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">Market Tips:</p>
                      <ul className="list-disc list-inside text-gray-700">
                        <li>Peak season for fresh fruits</li>
                        <li>Start fruit drying operations</li>
                        <li>Export opportunities</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">Autumn (September - November)</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-medium">Harvest:</p>
                      <ul className="list-disc list-inside text-gray-700">
                        <li>Main apple harvest</li>
                        <li>Walnuts and almonds</li>
                        <li>Late potatoes</li>
                        <li>Buckwheat</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">Market Tips:</p>
                      <ul className="list-disc list-inside text-gray-700">
                        <li>Highest prices for quality apples</li>
                        <li>Bulk sales opportunities</li>
                        <li>Storage and preservation focus</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Winter (December - February)</h4>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="font-medium">Harvest:</p>
                      <ul className="list-disc list-inside text-gray-700">
                        <li>Stored produce sales</li>
                        <li>Dried fruits and nuts</li>
                        <li>Preserved vegetables</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">Market Tips:</p>
                      <ul className="list-disc list-inside text-gray-700">
                        <li>Premium for stored quality produce</li>
                        <li>Urban market demand high</li>
                        <li>Plan for next season</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="pt-6">
              <h4 className="font-medium text-amber-800 mb-2">Marketing Calendar Reminder</h4>
              <p className="text-sm text-amber-700 mb-3">
                Set up notifications for optimal selling times based on your crops
              </p>
              <Button className="bg-amber-600 hover:bg-amber-700">Set Harvest Reminders</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
