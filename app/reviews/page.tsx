import { allReviews } from "contentlayer/generated"
import { ReviewCard } from "@/components/review-card"

export const revalidate = 3600 // Revalidate every hour

export default function ReviewsPage() {
  // Sort reviews by date (newest first)
  const reviews = allReviews.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">All Reviews</h1>
        <p className="mt-2 text-muted-foreground">Browse our collection of {reviews.length} product reviews</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <ReviewCard key={review.slug} review={review} />
        ))}
      </div>
    </div>
  )
}
