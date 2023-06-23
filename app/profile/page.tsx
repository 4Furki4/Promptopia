"use client"
import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile'
import router from 'next/router'

export default function MyProfile() {
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
                fetchPosts(session?.user?.sessionId)
            }
        }
        initializeUserSession()
    }, [])

    function handleEdit() {

    }
    async function handleDelete() {

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
