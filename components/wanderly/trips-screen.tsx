"use client"

import { MapPin, Calendar, CircleCheck } from "lucide-react"
import Image from "next/image"

interface Trip {
  id: string
  city: string
  country: string
  dates: string
  activities: number
  image: string
  status: "upcoming" | "past"
}

const trips: Trip[] = [
  {
    id: "1",
    city: "Rome",
    country: "Italy",
    dates: "June 10-13",
    activities: 12,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop",
    status: "upcoming",
  },
  {
    id: "2",
    city: "Tokyo",
    country: "Japan",
    dates: "Aug 5-10",
    activities: 18,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    status: "upcoming",
  },
  {
    id: "3",
    city: "Paris",
    country: "France",
    dates: "Mar 15-20",
    activities: 15,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop",
    status: "past",
  },
  {
    id: "4",
    city: "Barcelona",
    country: "Spain",
    dates: "Jan 8-12",
    activities: 10,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop",
    status: "past",
  },
]

interface TripsScreenProps {
  onTripClick?: (trip: Trip) => void
}

export function TripsScreen({ onTripClick }: TripsScreenProps) {
  const upcomingTrips = trips.filter((t) => t.status === "upcoming")
  const pastTrips = trips.filter((t) => t.status === "past")

  return (
    <div className="min-h-screen pb-24 px-5 pt-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">My Trips</h1>
        <p className="text-muted-foreground mt-1">Your travel adventures</p>
      </div>

      {/* Upcoming Trips */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Upcoming Trips</h2>
        </div>
        <div className="space-y-4">
          {upcomingTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} onClick={() => onTripClick?.(trip)} />
          ))}
        </div>
      </section>

      {/* Past Trips */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <CircleCheck className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Past Trips</h2>
        </div>
        <div className="space-y-4">
          {pastTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} onClick={() => onTripClick?.(trip)} isPast />
          ))}
        </div>
      </section>
    </div>
  )
}

function TripCard({ trip, onClick, isPast = false }: { trip: Trip; onClick?: () => void; isPast?: boolean }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow"
    >
      <div className="flex">
        {/* Image */}
        <div className="relative w-28 h-28 flex-shrink-0">
          <Image
            src={trip.image}
            alt={trip.city}
            fill
            className={`object-cover ${isPast ? "grayscale-[30%]" : ""}`}
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-center">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-foreground text-lg">{trip.city}</h3>
              <p className="text-sm text-muted-foreground">{trip.country}</p>
            </div>
            {!isPast && (
              <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                Upcoming
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span className="text-xs">{trip.dates}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="text-xs">{trip.activities} activities</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}
