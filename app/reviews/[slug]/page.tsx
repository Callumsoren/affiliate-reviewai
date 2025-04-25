import { allReviews } from "contentlayer/generated"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Rating } from "@/components/rating"
import { formatDate } from "@/lib/utils"
import { MDXContent } from "@/components/mdx-content"

export const revalidate = 3600 // Revalidate every hour

interface ReviewPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return allReviews.map((review) => ({
    slug: review.slug,
  }))
}

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const review = allReviews.find((review) => review.slug === params.slug)

  if (!review) {
    return {
      title: "Review Not Found",
    }
  }

  return {
    title: review.title,
    description: review.excerpt || `Review of ${review.title}`,
  }
}

export default function ReviewPage({ params }: ReviewPageProps) {
  const review = allReviews.find((review) => review.slug === params.slug)

  if (!review) {
    notFound()
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/reviews"
          className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          ← Back to all reviews
        </Link>

        <article className="prose prose-blue mx-auto max-w-none dark:prose-invert">
          <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">{review.title}</h1>

          <div className="mb-4 flex items-center space-x-4">
            <time className="text-sm text-muted-foreground" dateTime={review.date}>
              {formatDate(review.date)}
            </time>
            <Rating rating={review.rating} size="md" />
          </div>

          {review.image && (
            <div className="my-6 overflow-hidden rounded-lg">
              <Image
                src={review.image || "/placeholder.svg"}
                alt={review.title}
                width={800}
                height={450}
                className="w-full object-cover"
              />
            </div>
          )}

          <MDXContent code={review.body.code} />

          <div className="mt-8 rounded-lg bg-primary/5 p-6">
            <h2 className="mb-4 text-xl font-bold">Ready to buy?</h2>
            <p className="mb-4">
              If you found this review helpful and want to purchase this product, you can use our affiliate link below:
            </p>
            <a
              href={review.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Buy Now
            </a>
            <p className="mt-2 text-xs text-muted-foreground">
              *We may earn a commission for purchases made through this link.
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}
