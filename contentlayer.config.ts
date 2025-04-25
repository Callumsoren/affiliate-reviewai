import { defineDocumentType, makeSource } from "contentlayer/source-files"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

export const Review = defineDocumentType(() => ({
  name: "Review",
  filePathPattern: `reviews/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    rating: {
      type: "number",
      required: true,
    },
    affiliateLink: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      required: false,
    },
    excerpt: {
      type: "string",
      required: false,
    },
    category: {
      type: "string",
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("reviews/", ""),
    },
    url: {
      type: "string",
      resolve: (doc) => `/reviews/${doc._raw.flattenedPath.replace("reviews/", "")}`,
    },
  },
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Review],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted")
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"]
          },
        },
      ],
    ],
  },
})
