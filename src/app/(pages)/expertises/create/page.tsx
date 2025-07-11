"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { createExpertise } from "@/lib/data/expertises"

export default function CreateExpertisePage() {
    const [title, setTitle] = useState("")
    const [mdxContent, setMdxContent] = useState(`# ${title || "Your Expertise Title"}

## Overview

Provide a comprehensive overview of your expertise service here.

## Our Approach

### Methodology
- Step 1: Initial assessment and consultation
- Step 2: Detailed analysis and research
- Step 3: Report preparation and recommendations

### Key Features
- Professional analysis
- Detailed documentation
- Expert recommendations
- Ongoing support

## Case Studies

### Case Study 1: Example Project
Brief description of a successful project or engagement.

**Challenge:** What was the main challenge?
**Solution:** How did you address it?
**Result:** What was the outcome?

## Contact Information

For more information about this expertise service, please contact us:

- **Email:** expertise@company.com
- **Phone:** +1 (555) 123-4567
- **Website:** www.company.com

---

*This expertise service is provided by our certified professionals with extensive experience in the field.*`)

    const [creating, setCreating] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim()) {
            toast.error("Please enter a title")
            return
        }

        if (!mdxContent.trim()) {
            toast.error("Please enter MDX content")
            return
        }

        try {
            setCreating(true)
            const expertise = await createExpertise(
                title.trim(),
                mdxContent,
            )

            toast.success("Expertise created successfully!")
            router.push(`/expertises/${expertise.id}`)
        } catch (error) {
            console.error("Error creating expertise:", error)
            toast.error("Failed to create expertise")
        } finally {
            setCreating(false)
        }
    }

    // Update MDX content when title changes
    const handleTitleChange = (newTitle: string) => {
        setTitle(newTitle)
        if (mdxContent.startsWith("# ")) {
            const lines = mdxContent.split("\n")
            lines[0] = `# ${newTitle || "Your Expertise Title"}`
            setMdxContent(lines.join("\n"))
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Create New Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => handleTitleChange(e.target.value)}
                                placeholder="Enter expertise title..."
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">MDX Content</Label>
                            <Textarea
                                id="content"
                                value={mdxContent}
                                onChange={(e) => setMdxContent(e.target.value)}
                                placeholder="Enter your MDX content here..."
                                className="min-h-[400px] font-mono text-sm"
                                required
                            />
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                <p className="font-medium mb-1">MDX Formatting Tips:</p>
                                <ul className="list-disc list-inside space-y-1 text-xs">
                                    <li># Heading 1, ## Heading 2, ### Heading 3</li>
                                    <li>**bold text**, *italic text*</li>
                                    <li>- Bullet points, 1. Numbered lists</li>
                                    <li>{"> Blockquotes for important notes"}</li>
                                    <li>```code blocks``` for code examples</li>
                                    <li>[Link text](URL) for links</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button type="submit" disabled={creating}>
                                {creating ? "Creating..." : "Create Expertise"}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => router.push("/expertises")}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
