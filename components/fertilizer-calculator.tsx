"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calculator, Leaf, Zap, TestTube } from "lucide-react"

interface FertilizerRecommendation {
  nutrient: string
  current: number
  required: number
  deficit: number
  fertilizer: string
  amount: number
  cost: number
  application: string[]
}

export default function FertilizerCalculator() {
  const [formData, setFormData] = useState({
    crop: "",
    area: "",
    currentN: "",
    currentP: "",
    currentK: "",
    soilType: "",
    season: "",
  })
  const [recommendations, setRecommendations] = useState<FertilizerRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const cropRequirements: Record<string, { N: number; P: number; K: number }> = {
    wheat: { N: 120, P: 60, K: 40 },
    barley: { N: 90, P: 45, K: 30 },
    potato: { N: 150, P: 80, K: 120 },
    maize: { N: 180, P: 90, K: 60 },
    apple: { N: 100, P: 50, K: 80 },
    buckwheat: { N: 60, P: 30, K: 40 },
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateFertilizer = async () => {
    setIsLoading(true)

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const crop = formData.crop
    const area = Number.parseFloat(formData.area) || 1
    const currentN = Number.parseFloat(formData.currentN) || 0
    const currentP = Number.parseFloat(formData.currentP) || 0
    const currentK = Number.parseFloat(formData.currentK) || 0

    if (!crop || !cropRequirements[crop]) {
      setIsLoading(false)
      return
    }

    const required = cropRequirements[crop]
    const recommendations: FertilizerRecommendation[] = []

    // Nitrogen calculation
    const nDeficit = Math.max(0, required.N - currentN)
    if (nDeficit > 0) {
      recommendations.push({
        nutrient: "Nitrogen (N)",
        current: currentN,
        required: required.N,
        deficit: nDeficit,
        fertilizer: "Urea (46% N)",
        amount: Math.round((nDeficit / 0.46) * area),
        cost: Math.round((nDeficit / 0.46) * area * 0.8), // PKR per kg
        application: ["Apply 1/3 at planting", "Apply 1/3 at tillering stage", "Apply 1/3 at flowering stage"],
      })
    }

    // Phosphorus calculation
    const pDeficit = Math.max(0, required.P - currentP)
    if (pDeficit > 0) {
      recommendations.push({
        nutrient: "Phosphorus (P)",
        current: currentP,
        required: required.P,
        deficit: pDeficit,
        fertilizer: "DAP (18% N, 46% P2O5)",
        amount: Math.round((pDeficit / 0.2) * area), // Approximate P2O5 to P conversion
        cost: Math.round((pDeficit / 0.2) * area * 1.2),
        application: ["Apply full amount at planting", "Mix well with soil", "Place near root zone"],
      })
    }

    // Potassium calculation
    const kDeficit = Math.max(0, required.K - currentK)
    if (kDeficit > 0) {
      recommendations.push({
        nutrient: "Potassium (K)",
        current: currentK,
        required: required.K,
        deficit: kDeficit,
        fertilizer: "SOP (50% K2O)",
        amount: Math.round((kDeficit / 0.42) * area), // K2O to K conversion
        cost: Math.round((kDeficit / 0.42) * area * 1.5),
        application: ["Apply 1/2 at planting", "Apply 1/2 at fruit development", "Water immediately after application"],
      })
    }

    setRecommendations(recommendations)
    setIsLoading(false)
  }

  const totalCost = recommendations.reduce((sum, rec) => sum + rec.cost, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-green-600" />
            <span>Fertilizer Calculator</span>
          </CardTitle>
          <CardDescription>
            Calculate precise fertilizer requirements for your crops based on soil test results
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="crop">Select Crop</Label>
              <Select value={formData.crop} onValueChange={(value) => handleInputChange("crop", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="barley">Barley</SelectItem>
                  <SelectItem value="potato">Potato</SelectItem>
                  <SelectItem value="maize">Maize</SelectItem>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="buckwheat">Buckwheat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Farm Area (hectares)</Label>
              <Input
                id="area"
                type="number"
                step="0.1"
                placeholder="e.g., 1.5"
                value={formData.area}
                onChange={(e) => handleInputChange("area", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentN" className="flex items-center space-x-1">
                <Zap className="h-4 w-4 text-blue-500" />
                <span>Current Nitrogen (kg/ha)</span>
              </Label>
              <Input
                id="currentN"
                type="number"
                placeholder="e.g., 30"
                value={formData.currentN}
                onChange={(e) => handleInputChange("currentN", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentP" className="flex items-center space-x-1">
                <TestTube className="h-4 w-4 text-orange-500" />
                <span>Current Phosphorus (kg/ha)</span>
              </Label>
              <Input
                id="currentP"
                type="number"
                placeholder="e.g., 20"
                value={formData.currentP}
                onChange={(e) => handleInputChange("currentP", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentK" className="flex items-center space-x-1">
                <Leaf className="h-4 w-4 text-green-500" />
                <span>Current Potassium (kg/ha)</span>
              </Label>
              <Input
                id="currentK"
                type="number"
                placeholder="e.g., 25"
                value={formData.currentK}
                onChange={(e) => handleInputChange("currentK", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="soilType">Soil Type</Label>
              <Select value={formData.soilType} onValueChange={(value) => handleInputChange("soilType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="loamy">Loamy</SelectItem>
                  <SelectItem value="clay">Clay</SelectItem>
                  <SelectItem value="rocky">Rocky/Mountain</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={calculateFertilizer}
            disabled={isLoading || !formData.crop}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isLoading ? "Calculating..." : "Calculate Fertilizer Needs"}
          </Button>
        </CardContent>
      </Card>

      {recommendations.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Fertilizer Recommendations</h3>
            <Badge variant="outline" className="text-lg px-3 py-1">
              Total Cost: PKR {totalCost}
            </Badge>
          </div>

          {recommendations.map((rec, index) => (
            <Card key={index} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    <span>{rec.nutrient}</span>
                  </span>
                  <Badge className="bg-blue-600 text-white">{rec.deficit} kg/ha needed</Badge>
                </CardTitle>
                <CardDescription>
                  Current: {rec.current} kg/ha • Required: {rec.required} kg/ha
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-medium text-gray-600">Recommended Fertilizer</p>
                    <p className="font-semibold">{rec.fertilizer}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-medium text-gray-600">Amount Needed</p>
                    <p className="font-semibold">{rec.amount} kg</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-medium text-gray-600">Estimated Cost</p>
                    <p className="font-semibold">PKR {rec.cost}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Application Instructions:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    {rec.application.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <h4 className="font-medium text-green-800 mb-2">General Tips:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                <li>Always conduct soil tests before applying fertilizers</li>
                <li>Apply fertilizers when soil moisture is adequate</li>
                <li>Avoid over-fertilization which can harm crops and environment</li>
                <li>Consider organic alternatives like compost and manure</li>
                <li>Store fertilizers in dry, cool places away from children</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
