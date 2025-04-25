import { Star } from "lucide-react"

interface RatingProps {
  rating: number
  className?: string
  size?: "sm" | "md" | "lg"
}

export function Rating({ rating, className = "", size = "md" }: RatingProps) {
  const sizes = {
    sm: "h-3 w-3",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const starSize = sizes[size]

  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${starSize} ${i < Math.floor(rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
        />
      ))}
      <span className={`ml-2 font-medium ${size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : ""}`}>
        {rating.toFixed(1)}
      </span>
    </div>
  )
}
