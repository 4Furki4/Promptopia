"use client"
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

function PromptCardList({ data, handleTagClick }: { data: PromptAndUser[], handleTagClick: Function }) {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post: any) => <PromptCard key={post._id} data={post} handleTagClick={handleTagClick} />)}
        </div>
    )
}

export default function Feed() {
    const [posts, setPosts] = useState<PromptAndUser[]>([])
    const [searchedPosts, setSearchedPosts] = useState<PromptAndUser[]>(posts)
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt')
            const data = await response.json() as PromptAndUser[]
            setPosts(data)
        }
        fetchPosts()
    }, [])
    const [searchText, setSearchText] = useState('')
    function handleSearchChange(e: InputEvent) {
        const { value } = e.target as HTMLInputElement
        setSearchText(value)
        const regex = new RegExp(value, 'i')
        if (value) {
            const filteredPosts = posts.filter((post: PromptAndUser) => {
                if (post.tag.match(regex) || post.prompt.match(regex)) { // search by title or description case-insensitive
                    return true
                }
                return false
            })
            setSearchedPosts(filteredPosts)
        } else {
            setSearchedPosts(posts)
        }
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
            <PromptCardList data={searchedPosts} handleTagClick={() => { }} />
        </section>
    )
}
