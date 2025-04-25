# AffiliateReviewAI

A production-ready Next.js + Tailwind CSS affiliate review web app that uses Contentlayer to source Markdown files and OpenAI to generate content.

## Features

- Next.js 14 with App Router
- Tailwind CSS for styling
- Contentlayer for sourcing Markdown files
- Static Site Generation (SSG) with Incremental Static Regeneration (ISR)
- OpenAI integration for AI-generated reviews
- GitHub Actions for automated content generation
- Responsive design
- SEO optimized

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key

### Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/yourusername/affiliate-review-ai.git
cd affiliate-review-ai
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Create a `.env.local` file in the root directory and add your OpenAI API key:

\`\`\`
OPENAI_API_KEY=your_openai_api_key_here
\`\`\`

### Development

Run the development server:

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

\`\`\`bash
npm run build
\`\`\`

### Generating Reviews

To generate a new review using OpenAI:

\`\`\`bash
npm run generate-review
\`\`\`

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - React components
- `content/reviews/` - Markdown files for reviews
- `lib/` - Utility functions
- `scripts/` - Scripts for generating content
- `.github/workflows/` - GitHub Actions workflows

## Customization

### Adding New Reviews Manually

1. Create a new MDX file in the `content/reviews/` directory
2. Add the required frontmatter:

---
title: "Product Name: A Comprehensive Review"
date: YYYY-MM-DD
rating: 4.5
affiliateLink: "https://example.com/affiliate-link"
image: "https://example.com/image.jpg"
excerpt: "A brief summary of the review"
category: "Category Name"
---

# Your review content here
\`\`\`

### Customizing the Theme

Edit the `tailwind.config.ts` file to customize colors, fonts, and other design elements.

## Deployment

This project is ready to be deployed on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add your environment variables
4. Deploy

## GitHub Actions

The project includes a GitHub Actions workflow that automatically generates new reviews daily. To set it up:

1. Add your OpenAI API key as a repository secret named `OPENAI_API_KEY`
2. The workflow will run daily at 12:00 UTC

## License

This project is licensed under the MIT License - see the LICENSE file for details.
\`\`\`

Let's create a tsconfig.json file:
