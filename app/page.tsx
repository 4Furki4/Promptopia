"use client"
import Feed from '@components/Feed'
import React, { useEffect, useState } from 'react'

export default function Home() {
    const [posts, setPosts] = useState<PromptAndUser[]>([])
    const [searchedPosts, setSearchedPosts] = useState<PromptAndUser[]>([])
    useEffect(() => {
        async function getPosts() {
            const response = await fetch('/api/prompt', {
                next: {
                    revalidate: 1
                }
            })
            const data = await response.json() as PromptAndUser[]
            setPosts(data)
            setSearchedPosts(data)
        }
        getPosts()
    }, [])
    return (
        <section className='w-full flex-center flex-col '>
            <h1 className='head_text text-center'>
                <span>Discover & Share </span>
                <br />
                <span
                    className='orange_gradient'
                > AI-Powered Prompts</span>
            </h1>
            <p className='desc text-center'>
                Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts
            </p>
            <Feed posts={posts} searchedPosts={searchedPosts} setSearchedPosts={setSearchedPosts} />
        </section>
    )
}
