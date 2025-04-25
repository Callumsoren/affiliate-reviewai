"use client"

import type React from "react"

import { useMDXComponent } from "next-contentlayer/hooks"
import Image from "next/image"
import Link from "next/link"

const components = {
  Image,
  a: ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    if (href && href.startsWith("/")) {
      return <Link href={href} {...props} />
    }

    if (href && (href.startsWith("http") || href.startsWith("mailto:"))) {
      return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    }

    return <a href={href} {...props} />
  },
}

interface MDXContentProps {
  code: string
}

export function MDXContent({ code }: MDXContentProps) {
  const MDXComponent = useMDXComponent(code)
  return <MDXComponent components={components} />
}
