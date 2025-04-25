import Link from "next/link"
import { Star } from "lucide-react"

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-2">
          <Star className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">AffiliateReviewAI</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link href="/reviews" className="text-sm font-medium hover:underline">
            All Reviews
          </Link>
        </nav>
      </div>
    </header>
  )
}
