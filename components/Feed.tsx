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
    const [searchedPosts, setSearchedPosts] = useState<PromptAndUser[]>([])
    const [searchType, setSearchType] = useState<'tag' | 'username' | 'prompt'>('prompt')
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/prompt')
            const data = await response.json() as PromptAndUser[]
            setPosts(data)
            setSearchedPosts(data)
        }
        fetchPosts()
    }, [])
    const [searchText, setSearchText] = useState('')
    function handleSearchChange(e: InputEvent) {
        const { value } = e.target as HTMLInputElement
        setSearchText(value)
        if (value === '') {
            setSearchedPosts(posts)
            setSearchText(value)
            return
        }
        const filteredPosts = posts.filter((post) => {
            switch (searchType) {
                case "prompt":
                    if (post.prompt.toLowerCase().includes(value.toLowerCase())) {
                        return true
                    }
                    break;
                case "tag":
                    if (post.tag.includes(value)) {
                        return true
                    }
                    break;
                case "username":
                    if (post.creator.username.toLowerCase().includes(value.toLowerCase())) {
                        return true
                    }
                default:
                    break;
            }
        })
        setSearchedPosts(filteredPosts)
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
