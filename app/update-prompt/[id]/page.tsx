"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Form from '@components/Form'
export default function EditPrompt({ params: { id: promptId } }: { params: { id: string } }) {
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [post, setPost] = useState<InputPromt>({
        prompt: 'Loading...',
        tags: "Loading..."
    })
    useEffect(() => {
        const fetchPost = async (promptId: string) => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data: PromptAndUser = await response.json()
            const { prompt, tags } = data
            setPost({
                prompt,
                tags: tags.map((tag) => tag.tag).join(' ')
            })
        }
        if (promptId) fetchPost(promptId)
    }, [promptId])
    const router = useRouter()

    async function updatePrompt(event: InputEvent) {
        event.preventDefault()
        const { prompt, tags } = post
        if (!prompt || !tags) return alert('Please fill out all fields')

        const tagArray = tags.trim().split(' ')
        if (tagArray.length > 5) return alert('Please only use 5 tags or less')
        console.log(tagArray);
        const data = {
            prompt,
            tags: tagArray
        }
        setSubmitting(true);
        if (!promptId) return alert('No prompt id found')
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
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
