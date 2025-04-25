#!/usr/bin/env node

import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import { OpenAI } from "openai"

// Get the directory name using ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Initialize OpenAI client
// NOTE: Set your OpenAI API key in your environment variables or replace process.env.OPENAI_API_KEY with your actual key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Get from environment variable
})

// Product categories and types for random generation
const productCategories = [
  { name: "Tech Gadgets", products: ["Smartphone", "Tablet", "Laptop", "Smartwatch", "Wireless Earbuds"] },
  { name: "Home Appliances", products: ["Coffee Maker", "Robot Vacuum", "Air Purifier", "Blender", "Smart Speaker"] },
  { name: "Fitness", products: ["Fitness Tracker", "Yoga Mat", "Adjustable Dumbbells", "Treadmill", "Massage Gun"] },
  { name: "Photography", products: ["DSLR Camera", "Mirrorless Camera", "Camera Lens", "Tripod", "Drone"] },
]

// Function to generate a random product
function getRandomProduct() {
  const categoryIndex = Math.floor(Math.random() * productCategories.length)
  const category = productCategories[categoryIndex]
  const productIndex = Math.floor(Math.random() * category.products.length)
  const product = category.products[productIndex]

  return {
    product,
    category: category.name,
  }
}

// Function to generate a random rating between 3.5 and 5.0
function getRandomRating() {
  return (Math.random() * 1.5 + 3.5).toFixed(1)
}

// Function to generate a random date within the last 30 days
function getRandomDate() {
  const now = new Date()
  const daysAgo = Math.floor(Math.random() * 30)
  const date = new Date(now.setDate(now.getDate() - daysAgo))
  return date.toISOString().split("T")[0]
}

// Function to generate a slug from a title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// Function to generate a review using OpenAI
async function generateReview() {
  try {
    console.log("Generating a new product review...")

    // Get random product and category
    const { product, category } = getRandomProduct()
    const rating = getRandomRating()
    const date = getRandomDate()

    console.log(`Selected product: ${product} (${category}) with rating ${rating}`)

    // Generate a creative product name
    const nameResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a creative product naming assistant. Create a catchy, marketable name for a product.",
        },
        {
          role: "user",
          content: `Create a catchy product name for a ${product}. Just return the name, nothing else.`,
        },
      ],
      temperature: 0.8,
      max_tokens: 50,
    })

    const productName = nameResponse.choices[0].message.content.trim().replace(/"/g, "")
    console.log(`Generated product name: ${productName}`)

    // Generate a title for the review
    const titleResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a product review title generator. Create engaging, SEO-friendly titles.",
        },
        {
          role: "user",
          content: `Create a catchy title for a review of ${productName}, which is a ${product}. The rating is ${rating}/5. Just return the title, nothing else.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 50,
    })

    const title = titleResponse.choices[0].message.content.trim().replace(/"/g, "")
    console.log(`Generated title: ${title}`)

    // Generate an excerpt
    const excerptResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a product review excerpt generator. Create concise, informative summaries.",
        },
        {
          role: "user",
          content: `Write a short excerpt (1-2 sentences) for a review of ${productName}, which is a ${product}. The rating is ${rating}/5. Just return the excerpt, nothing else.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    })

    const excerpt = excerptResponse.choices[0].message.content.trim()
    console.log(`Generated excerpt: ${excerpt}`)

    // Generate the full review content
    const reviewResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are an expert product reviewer who writes detailed, honest reviews. 
          Your reviews are well-structured with clear sections, pros and cons, and a final verdict.
          You use Markdown formatting for structure.`,
        },
        {
          role: "user",
          content: `Write a detailed review for ${productName}, which is a ${product}. 
          The review should have a rating of ${rating}/5.
          
          Include the following sections:
          1. Introduction
          2. Design and Build Quality
          3. Features and Performance
          4. Battery Life (if applicable)
          5. User Experience
          6. Pros and Cons (as bullet points)
          7. Verdict
          
          Use Markdown formatting with proper headings (# for main title, ## for sections).
          The review should be informative, balanced, and around 800-1000 words.
          Do not include the frontmatter section.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const reviewContent = reviewResponse.choices[0].message.content.trim()

    // Generate a random affiliate link
    const affiliateLink = `https://example.com/buy-${generateSlug(productName)}`

    // Create the frontmatter
    const frontmatter = `---
title: "${title}"
date: ${date}
rating: ${rating}
affiliateLink: "${affiliateLink}"
image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000"
excerpt: "${excerpt}"
category: "${category}"
---`

    // Combine frontmatter and content
    const fullReview = `${frontmatter}\n\n${reviewContent}`

    // Generate a slug for the filename
    const slug = generateSlug(productName)
    const filename = `${slug}-review.mdx`

    // Create the reviews directory if it doesn't exist
    const reviewsDir = path.join(__dirname, "..", "content", "reviews")
    if (!fs.existsSync(reviewsDir)) {
      fs.mkdirSync(reviewsDir, { recursive: true })
    }

    // Write the review to a file
    const filePath = path.join(reviewsDir, filename)
    fs.writeFileSync(filePath, fullReview)

    console.log(`Review successfully generated and saved to: ${filePath}`)
    return { title, slug, filePath }
  } catch (error) {
    console.error("Error generating review:", error)
    throw error
  }
}

// Main function
async function main() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error("Error: OPENAI_API_KEY environment variable is not set")
      console.error("Please set your OpenAI API key using:")
      console.error("  export OPENAI_API_KEY=your_api_key_here")
      process.exit(1)
    }

    await generateReview()
  } catch (error) {
    console.error("Error in main function:", error)
    process.exit(1)
  }
}

// Run the main function
main()
