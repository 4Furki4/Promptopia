"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'
import { useSession } from 'next-auth/react'
export default function EditPrompt({ params: { id: promptId } }: { params: { id: string } }) {
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [post, setPost] = useState<Prompt>({
        prompt: 'Loading...',
        tag: 'Loading...',
    })
    useEffect(() => {
        const fetchPost = async (promptId: string) => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data: Prompt = await response.json()
            setPost(data)
        }
        if (promptId) fetchPost(promptId)
    }, [promptId])
    const router = useRouter()

    async function updatePrompt(event: InputEvent) {
        event.preventDefault()

        setSubmitting(true);
        if (!promptId) return alert('No prompt id found')
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            })
            if (response.ok) router.push('/profile')
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}
