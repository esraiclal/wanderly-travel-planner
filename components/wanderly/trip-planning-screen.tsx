"use client"

import { useState } from "react"
import { ArrowLeft, Utensils, Landmark, Building2, Trees, ShoppingBag, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const interests = [
  { id: "food", icon: Utensils, label: "Food" },
  { id: "history", icon: Landmark, label: "History" },
  { id: "museums", icon: Building2, label: "Museums" },
  { id: "nature", icon: Trees, label: "Nature" },
  { id: "shopping", icon: ShoppingBag, label: "Shopping" },
]

const durations = ["3 days", "5 days", "7 days", "10 days", "14 days"]
const budgets = [
  { id: "low", label: "Budget", description: "$50-100/day" },
  { id: "medium", label: "Moderate", description: "$100-200/day" },
  { id: "high", label: "Luxury", description: "$200+/day" },
]

interface TripPlanningScreenProps {
  destination?: string
  onBack: () => void
  onGenerate: (
    interests: string[],
    duration: string,
    budget: string
  ) => void
}

export function TripPlanningScreen({ destination = "Paris", onBack, onGenerate }: TripPlanningScreenProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedDuration, setSelectedDuration] = useState("5 days")
  const [selectedBudget, setSelectedBudget] = useState("medium")

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen pb-24 px-5 pt-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="h-10 w-10 rounded-xl bg-card flex items-center justify-center shadow-sm"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <p className="text-sm text-muted-foreground">Planning trip to</p>
          <h1 className="text-xl font-semibold text-foreground">{destination}</h1>
        </div>
      </div>

      {/* Interests */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-foreground mb-4">Select your interests</h2>
        <div className="flex flex-wrap gap-3">
          {interests.map((interest) => {
            const Icon = interest.icon
            const isSelected = selectedInterests.includes(interest.id)
            return (
              <button
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 rounded-2xl transition-all duration-200 border",
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary/50"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{interest.label}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Duration */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-foreground mb-4">Travel duration</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5">
          {durations.map((duration) => (
            <button
              key={duration}
              onClick={() => setSelectedDuration(duration)}
              className={cn(
                "px-5 py-3 rounded-xl whitespace-nowrap transition-all duration-200 border flex-shrink-0",
                selectedDuration === duration
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary/50"
              )}
            >
              <span className="text-sm font-medium">{duration}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Budget */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-foreground mb-4">Budget range</h2>
        <div className="grid grid-cols-3 gap-3">
          {budgets.map((budget) => (
            <button
              key={budget.id}
              onClick={() => setSelectedBudget(budget.id)}
              className={cn(
                "flex flex-col items-center p-4 rounded-2xl transition-all duration-200 border",
                selectedBudget === budget.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary/50"
              )}
            >
              <span className="text-sm font-semibold">{budget.label}</span>
              <span className={cn(
                "text-xs mt-1",
                selectedBudget === budget.id ? "text-primary-foreground/80" : "text-muted-foreground"
              )}>
                {budget.description}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Generate Button */}
  <Button
  onClick={() =>
    onGenerate(
      selectedInterests,
      selectedDuration,
      selectedBudget
    )
  }
  className="w-full h-14 rounded-2xl text-base font-semibold shadow-lg shadow-primary/20"
  disabled={selectedInterests.length === 0}
>
  <Sparkles className="h-5 w-5 mr-2" />
  Generate AI Itinerary
</Button>
    </div>
  )
}
