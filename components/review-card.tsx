import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import type { Review } from "contentlayer/generated"
import { formatDate } from "@/lib/utils"

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
      {review.image && (
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={review.image || "/placeholder.svg"}
            alt={review.title}
            width={600}
            height={340}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-4">
        {review.category && (
          <div className="mb-2">
            <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {review.category}
            </span>
          </div>
        )}
        <h3 className="text-xl font-bold tracking-tight">
          <Link href={review.url} className="hover:underline">
            {review.title}
          </Link>
        </h3>
        <div className="mt-1 flex items-center">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(review.rating) ? "fill-primary text-primary" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm font-medium">{review.rating.toFixed(1)}</span>
        </div>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{review.excerpt || ""}</p>
        <div className="mt-4 flex items-center justify-between">
          <time className="text-xs text-muted-foreground" dateTime={review.date}>
            {formatDate(review.date)}
          </time>
          <Link href={review.url} className="text-sm font-medium text-primary hover:underline">
            Read more
          </Link>
        </div>
      </div>
    </div>
  )
}
