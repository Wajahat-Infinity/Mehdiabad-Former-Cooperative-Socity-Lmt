"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, Sprout, Droplets, Zap, TestTube, CloudRain } from "lucide-react"

interface CropRecommendation {
  crop: string
  suitability: number
  season: string
  expectedYield: string
  tips: string[]
}

export default function CropPredictor() {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    rainfall: "",
    ph: "",
    temperature: "",
  })
  const [predictions, setPredictions] = useState<CropRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const predictCrops = async () => {
    setIsLoading(true)

    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock AI predictions based on input values
    const mockPredictions: CropRecommendation[] = []

    const n = Number.parseFloat(formData.nitrogen) || 0
    const p = Number.parseFloat(formData.phosphorus) || 0
    const k = Number.parseFloat(formData.potassium) || 0
    const rainfall = Number.parseFloat(formData.rainfall) || 0
    const ph = Number.parseFloat(formData.ph) || 7
    const temp = Number.parseFloat(formData.temperature) || 20

    // Wheat - good for moderate conditions
    if (n >= 40 && p >= 20 && k >= 20 && rainfall >= 300 && ph >= 6 && ph <= 8) {
      mockPredictions.push({
        crop: "Wheat",
        suitability: Math.min(95, 70 + (n + p + k) / 10),
        season: "Winter (Rabi)",
        expectedYield: "3-4 tons/hectare",
        tips: ["Plant in October-November", "Ensure proper drainage", "Apply nitrogen in split doses"],
      })
    }

    // Barley - hardy crop for mountain regions
    if (k >= 30 && rainfall >= 200 && ph >= 6.5) {
      mockPredictions.push({
        crop: "Barley",
        suitability: Math.min(90, 65 + k / 5),
        season: "Winter (Rabi)",
        expectedYield: "2-3 tons/hectare",
        tips: ["Drought tolerant", "Good for high altitude", "Harvest before full maturity"],
      })
    }

    // Potatoes - good for cool climate
    if (n >= 50 && p >= 30 && k >= 40 && temp <= 25) {
      mockPredictions.push({
        crop: "Potato",
        suitability: Math.min(88, 60 + (n + p + k) / 15),
        season: "Spring/Summer",
        expectedYield: "15-20 tons/hectare",
        tips: ["Plant in March-April", "Ensure good drainage", "Hill up regularly"],
      })
    }

    // Apples - for mountain regions
    if (temp >= 15 && temp <= 25 && rainfall >= 400 && ph >= 6) {
      mockPredictions.push({
        crop: "Apple",
        suitability: Math.min(85, 70 + (rainfall - 400) / 50),
        season: "Perennial",
        expectedYield: "10-15 tons/hectare",
        tips: ["Requires cold winters", "Prune regularly", "Good for mountain climate"],
      })
    }

    // Maize - warm season crop
    if (n >= 60 && k >= 40 && temp >= 20 && rainfall >= 500) {
      mockPredictions.push({
        crop: "Maize",
        suitability: Math.min(82, 50 + n / 3),
        season: "Summer (Kharif)",
        expectedYield: "4-6 tons/hectare",
        tips: ["Plant after last frost", "Requires warm weather", "Deep watering needed"],
      })
    }

    // Buckwheat - good for poor soils
    if (ph >= 5.5 && temp <= 30) {
      mockPredictions.push({
        crop: "Buckwheat",
        suitability: Math.min(75, 60 + (8 - ph) * 5),
        season: "Summer",
        expectedYield: "1-2 tons/hectare",
        tips: ["Grows in poor soil", "Short growing season", "Good cover crop"],
      })
    }

    // Sort by suitability
    mockPredictions.sort((a, b) => b.suitability - a.suitability)

    setPredictions(mockPredictions.slice(0, 5)) // Top 5 recommendations
    setIsLoading(false)
  }

  const getSuitabilityColor = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-blue-600" />
            <span>AI Crop Predictor</span>
          </CardTitle>
          <CardDescription>Enter your soil and climate data to get AI-powered crop recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nitrogen" className="flex items-center space-x-1">
                <Zap className="h-4 w-4 text-blue-500" />
                <span>Nitrogen (N) - kg/ha</span>
              </Label>
              <Input
                id="nitrogen"
                type="number"
                placeholder="e.g., 50"
                value={formData.nitrogen}
                onChange={(e) => handleInputChange("nitrogen", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phosphorus" className="flex items-center space-x-1">
                <TestTube className="h-4 w-4 text-orange-500" />
                <span>Phosphorus (P) - kg/ha</span>
              </Label>
              <Input
                id="phosphorus"
                type="number"
                placeholder="e.g., 30"
                value={formData.phosphorus}
                onChange={(e) => handleInputChange("phosphorus", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="potassium" className="flex items-center space-x-1">
                <Sprout className="h-4 w-4 text-green-500" />
                <span>Potassium (K) - kg/ha</span>
              </Label>
              <Input
                id="potassium"
                type="number"
                placeholder="e.g., 40"
                value={formData.potassium}
                onChange={(e) => handleInputChange("potassium", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rainfall" className="flex items-center space-x-1">
                <CloudRain className="h-4 w-4 text-blue-400" />
                <span>Annual Rainfall - mm</span>
              </Label>
              <Input
                id="rainfall"
                type="number"
                placeholder="e.g., 400"
                value={formData.rainfall}
                onChange={(e) => handleInputChange("rainfall", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ph" className="flex items-center space-x-1">
                <TestTube className="h-4 w-4 text-purple-500" />
                <span>Soil pH</span>
              </Label>
              <Input
                id="ph"
                type="number"
                step="0.1"
                placeholder="e.g., 6.5"
                value={formData.ph}
                onChange={(e) => handleInputChange("ph", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="temperature" className="flex items-center space-x-1">
                <Droplets className="h-4 w-4 text-red-500" />
                <span>Avg Temperature - °C</span>
              </Label>
              <Input
                id="temperature"
                type="number"
                placeholder="e.g., 20"
                value={formData.temperature}
                onChange={(e) => handleInputChange("temperature", e.target.value)}
              />
            </div>
          </div>

          <Button onClick={predictCrops} disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-700">
            {isLoading ? "Analyzing..." : "Get AI Recommendations"}
          </Button>
        </CardContent>
      </Card>

      {predictions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recommended Crops</h3>
          {predictions.map((prediction, index) => (
            <Card key={index} className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Sprout className="h-5 w-5 text-green-600" />
                    <span>{prediction.crop}</span>
                  </CardTitle>
                  <Badge className={`${getSuitabilityColor(prediction.suitability)} text-white`}>
                    {prediction.suitability.toFixed(0)}% Suitable
                  </Badge>
                </div>
                <CardDescription>
                  {prediction.season} • Expected Yield: {prediction.expectedYield}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium">Growing Tips:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    {prediction.tips.map((tip, tipIndex) => (
                      <li key={tipIndex}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {predictions.length === 0 && formData.nitrogen && (
        <Alert>
          <AlertDescription>
            Based on your soil conditions, consider improving nutrient levels or adjusting pH for better crop options.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
