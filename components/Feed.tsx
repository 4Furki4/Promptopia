"use client"
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

function PromptCardList({ data, handleTagClick }: { data: [], handleTagClick: Function }) {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post: any) => <PromptCard key={post._id} data={post} handleTagClick={handleTagClick} />)}
        </div>
    )
}

export default function Feed() {
    const [posts, setPosts] = useState([] as any)
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt')
            const data = await response.json()
            setPosts(data)
        }
        fetchPosts()
    }, [])
    const [searchText, setSearchText] = useState('')
    function handleSearchChange(e: InputEvent) {

    }

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type="text"
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    // @ts-ignore
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>
            <PromptCardList data={posts} handleTagClick={() => { }} />
        </section>
    )
}
