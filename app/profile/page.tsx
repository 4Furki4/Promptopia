"use client"
import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'

export default function MyProfile() {
    // @ts-ignore
    const { data: session }: { data: CustomSession } = useSession()
    const [posts, setPosts] = useState<PromptAndUser[]>([])
    const router = useRouter()
    useEffect(() => {
        const fetchPosts = async (sessionId: string) => {
            const response = await fetch(`/api/users/${sessionId}/posts`)
            const data: PromptAndUser[] = await response.json()
            setPosts(data)
        }
        /**
         * This function is a workaround for the fact that when user refreshes the page, useSession hook doesn't work.
         */
        const initializeUserSession = async () => {
            const session = await getSession()
            if (!session) {
                router.push('/')
            }
            else {
                // @ts-ignore
                fetchPosts(session?.user?.sessionId)
            }
        }
        initializeUserSession()
    }, [])

    function handleEdit(post: PromptAndUser) {
        router.push(`/update-prompt/${post._id}`)
    }
    async function handleDelete(post: PromptAndUser) {

        const hasConfirmed = confirm('Are you sure you want to delete this prompt?')
        if (!hasConfirmed) return
        try {
            const response = await fetch(`/api/prompt/${post._id.toString()}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                setPosts(posts.filter(post => post._id !== post._id))
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page."
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}
