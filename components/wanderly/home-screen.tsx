"use client"

import { useState } from "react"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const destinations = [
  {
    id: 1,
    city: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    city: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    city: "New York",
    country: "USA",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    city: "Barcelona",
    country: "Spain",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop",
  },
]

interface HomeScreenProps {
  onPlanTrip: () => void
  onSelectDestination: (city: string) => void
}

export function HomeScreen({
  onPlanTrip,
  onSelectDestination,
}: HomeScreenProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDestinations = destinations.filter((dest) =>
    dest.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleClick = () => {
    if (searchTerm.trim()) {
      onSelectDestination(searchTerm)
    } else {
      onPlanTrip()
    }
  }

  return (
    <div className="min-h-screen pb-24 px-5 pt-16">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground">
            Wanderly
          </span>
        </div>

        <h1 className="text-3xl font-bold text-foreground leading-tight">
          Where will your next adventure take you?
        </h1>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

        <Input
          placeholder="Enter a destination..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-14 rounded-2xl bg-card border-border text-foreground placeholder:text-muted-foreground shadow-sm"
        />
      </div>

      {/* Button */}
      <Button
        onClick={handleClick}
        className="w-full h-14 rounded-2xl text-base font-semibold mb-10 shadow-lg shadow-primary/20"
      >
        Plan My Trip
      </Button>

      {/* Destinations */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Popular Destinations
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {filteredDestinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => onSelectDestination(dest.city)}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-md hover:shadow-lg transition-shadow"
            >
              <Image
                src={dest.image}
                alt={dest.city}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              <div className="absolute bottom-3 left-3">
                <p className="text-white font-semibold text-base">
                  {dest.city}
                </p>
                <p className="text-white/80 text-xs">{dest.country}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}