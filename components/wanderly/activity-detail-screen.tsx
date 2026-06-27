"use client"

import { ArrowLeft, Clock, MapPin, Star, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Activity {
  id: string
  time: string
  title: string
  location: string
  type: "activity" | "food"
  description: string
}

const activityImages: Record<string, string> = {
  "Eiffel Tower": "https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=800&h=500&fit=crop",
  "Café de Flore": "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=500&fit=crop",
  "Louvre Museum": "https://images.unsplash.com/photo-1499426600726-7f5c1b10b585?w=800&h=500&fit=crop",
  "Le Comptoir": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop",
  "Montmartre": "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800&h=500&fit=crop",
  "Pink Mamma": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop",
  "Musée d'Orsay": "https://images.unsplash.com/photo-1587361039547-f3f01aa45c54?w=800&h=500&fit=crop",
  "Seine River Cruise": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=500&fit=crop",
  "Palace of Versailles": "https://images.unsplash.com/photo-1585830142036-a8ac34917c71?w=800&h=500&fit=crop",
  "Ore Restaurant": "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&h=500&fit=crop",
  "Champs-Élysées": "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=500&fit=crop",
  "Le Train Bleu": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop",
}

const activityDescriptions: Record<string, string> = {
  "Eiffel Tower": "The iconic iron lattice tower on the Champ de Mars is the most-visited paid monument in the world. Take the elevator to the top for breathtaking panoramic views of Paris.",
  "Café de Flore": "One of the oldest and most prestigious coffeehouses in Paris. Enjoy classic French cuisine in the same spot where Sartre and de Beauvoir once debated philosophy.",
  "Louvre Museum": "Home to the Mona Lisa and Venus de Milo, the Louvre is the world's largest art museum. Plan to spend at least 3-4 hours exploring its vast collections.",
  "Le Comptoir": "A beloved neighborhood bistro serving refined French cuisine. Known for its seasonal tasting menus and warm, convivial atmosphere.",
  "Montmartre": "This hilltop village is famous for its artistic history, white-domed Basilica of Sacré-Cœur, and charming cobblestone streets filled with artists and cafés.",
  "Pink Mamma": "A four-story Italian restaurant with stunning decor and authentic dishes. The fresh pasta and truffle pizza are must-tries.",
  "Musée d'Orsay": "Housed in a former railway station, this museum showcases the world's largest collection of Impressionist and Post-Impressionist masterpieces.",
  "Seine River Cruise": "Glide past illuminated monuments including Notre-Dame, the Louvre, and the Eiffel Tower on this magical evening cruise.",
  "Palace of Versailles": "The opulent royal residence features the famous Hall of Mirrors and sprawling formal gardens. A UNESCO World Heritage Site.",
  "Ore Restaurant": "Alain Ducasse's restaurant in the Pavilion Dufour offers modern French cuisine with stunning views of the palace gardens.",
  "Champs-Élysées": "The world's most famous avenue stretches from the Arc de Triomphe to Place de la Concorde, lined with luxury shops and theaters.",
  "Le Train Bleu": "A Belle Époque masterpiece with ornate painted ceilings and gilded decorations. The perfect setting for a memorable farewell dinner.",
}

interface ActivityDetailScreenProps {
  activity: Activity
  onBack: () => void
}

export function ActivityDetailScreen({ activity, onBack }: ActivityDetailScreenProps) {
  const image = activityImages[activity.title] || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=500&fit=crop"
  const description = activityDescriptions[activity.title] || activity.description

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Image */}
      <div className="relative h-72">
        <Image
          src={image}
          alt={activity.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-12 left-5 h-10 w-10 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>

        {/* Title Overlay */}
        <div className="absolute bottom-4 left-5 right-5">
          <h1 className="text-2xl font-bold text-white mb-1">{activity.title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-white/90">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{activity.location}</span>
            </div>
            <div className="flex items-center gap-1 text-white/90">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">4.8</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-6">
        {/* Time Card */}
        <div className="bg-card rounded-2xl p-4 border border-border shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scheduled time</p>
                <p className="font-semibold text-foreground">{activity.time}</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
              {activity.type === "food" ? "Restaurant" : "Attraction"}
            </span>
          </div>
        </div>

        {/* Description */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">About</h2>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </section>

        {/* Map Preview */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-3">Location</h2>
          <div className="relative h-40 rounded-2xl overflow-hidden bg-muted border border-border">
            <Image
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(activity.location + ", Paris")}&zoom=15&size=400x200&style=feature:all|saturation:-100&markers=color:blue|${encodeURIComponent(activity.location + ", Paris")}&key=YOUR_API_KEY`}
              alt="Map preview"
              fill
              className="object-cover opacity-60"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">{activity.location}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-xl"
          >
            <Navigation className="h-4 w-4 mr-2" />
            Directions
          </Button>
          <Button className="flex-1 h-12 rounded-xl">
            Save to Trip
          </Button>
        </div>
      </div>
    </div>
  )
}
