"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'
import { useSession } from 'next-auth/react'
export default function CreatePrompt() {
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [post, setPost] = useState<Prompt>({
        prompt: '',
        tag: '',
    })
    const router = useRouter()
    const { data: session }: { data: CustomSession } = useSession()
    async function createPrompt(e: InputEvent) {
        e.preventDefault()

        setSubmitting(true)

        try {
            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.sessionId,
                    tag: post.tag,
                })
            })

            if (response.ok) router.push("/")
        } catch (err) {
            console.error(err)
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}
