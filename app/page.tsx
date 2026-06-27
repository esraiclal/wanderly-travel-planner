"use client"

import { useState } from "react"
import { BottomNav } from "@/components/wanderly/bottom-nav"
import { HomeScreen } from "@/components/wanderly/home-screen"
import { TripPlanningScreen } from "@/components/wanderly/trip-planning-screen"
import { ItineraryScreen } from "@/components/wanderly/itinerary-screen"
import { ActivityDetailScreen } from "@/components/wanderly/activity-detail-screen"
import { TripsScreen } from "@/components/wanderly/trips-screen"

type Screen = "home" | "planning" | "itinerary" | "activity-detail" | "trips"
type Tab = "home" | "trips" | "plan"

interface Activity {
  id: string
  time: string
  title: string
  location: string
  type: "activity" | "food"
  description: string
}

export default function WanderlyApp() {
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")

  const [selectedDestination, setSelectedDestination] =
    useState<string>("Paris")

  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedDuration, setSelectedDuration] = useState("5 days")
  const [selectedBudget, setSelectedBudget] = useState("medium")

  const [selectedActivity, setSelectedActivity] =
    useState<Activity | null>(null)

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)

    if (tab === "home") {
      setCurrentScreen("home")
    } else if (tab === "trips") {
      setCurrentScreen("trips")
    } else if (tab === "plan") {
      setCurrentScreen("planning")
    }
  }

  const handlePlanTrip = () => {
    setCurrentScreen("planning")
    setActiveTab("plan")
  }

  const handleSelectDestination = (city: string) => {
    setSelectedDestination(city)
    setCurrentScreen("planning")
    setActiveTab("plan")
  }

  const handleGenerateItinerary = (
    interests: string[],
    duration: string,
    budget: string
  ) => {
    
    const safeInterests = interests && interests.length > 0 ? interests : ["Food", "History"]
    const safeDuration = duration || "5 days"
    const safeBudget = budget || "Moderate"

    setSelectedInterests(safeInterests)
    setSelectedDuration(safeDuration)
    setSelectedBudget(safeBudget)

    setCurrentScreen("itinerary")
  }

  const handleActivityClick = (activity: Activity) => {
    setSelectedActivity(activity)
    setCurrentScreen("activity-detail")
  }

  const handleBack = () => {
    if (currentScreen === "activity-detail") {
      setCurrentScreen("itinerary")
    } else if (currentScreen === "itinerary") {
      setCurrentScreen("planning")
    } else if (currentScreen === "planning") {
      setCurrentScreen("home")
      setActiveTab("home")
    }
  }

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen relative">
      <div className="relative">
        <div className="h-12 bg-background" />

        {currentScreen === "home" && (
          <HomeScreen
            onPlanTrip={handlePlanTrip}
            onSelectDestination={handleSelectDestination}
          />
        )}

        {currentScreen === "planning" && (
          <TripPlanningScreen
            destination={selectedDestination}
            onBack={handleBack}
            onGenerate={handleGenerateItinerary}
          />
        )}

        {currentScreen === "itinerary" && (
          <ItineraryScreen
            destination={selectedDestination || "Paris"}
            interests={selectedInterests.length > 0 ? selectedInterests : ["Food", "History"]}
            duration={selectedDuration || "5 days"}
            budget={selectedBudget || "Moderate"}
            onBack={handleBack}
            onActivityClick={handleActivityClick}
          />
        )}

        {currentScreen === "activity-detail" && selectedActivity && (
          <ActivityDetailScreen
            activity={selectedActivity}
            onBack={handleBack}
          />
        )}

        {currentScreen === "trips" && (
  <TripsScreen 
    onTripClick={(trip) => {

      setSelectedDestination(trip.city)
      setSelectedDuration(`${trip.activities > 12 ? "5" : "3"} days`)
      setSelectedInterests(["History", "Food"]) 
      
     
      setCurrentScreen("itinerary")
    }}
  />
)}
      </div>

      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
    </div>
  )
}