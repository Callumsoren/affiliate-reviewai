import { allReviews } from "contentlayer/generated"
import { ReviewCard } from "@/components/review-card"
import Link from "next/link"

export const revalidate = 3600 // Revalidate every hour

export default function Home() {
  // Sort reviews by date (newest first)
  const reviews = allReviews.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  // Get the latest 6 reviews
  const latestReviews = reviews.slice(0, 6)

  // Get top rated reviews (rating >= 4.5)
  const topRatedReviews = [...reviews]
    .filter((review) => review.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)

  return (
    <div className="container py-8 md:py-12">
      <section className="mb-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">AI-Powered Affiliate Reviews</h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Honest, detailed product reviews to help you make informed decisions
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Top Rated Products</h2>
          <Link href="/reviews" className="text-sm font-medium text-primary hover:underline">
            View all reviews
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topRatedReviews.map((review) => (
            <ReviewCard key={review.slug} review={review} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Latest Reviews</h2>
          <Link href="/reviews" className="text-sm font-medium text-primary hover:underline">
            View all reviews
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestReviews.map((review) => (
            <ReviewCard key={review.slug} review={review} />
          ))}
        </div>
      </section>
    </div>
  )
}
