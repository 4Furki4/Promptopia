"use client"
export const revalidate = 1
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

function PromptCardList({ data, handleTagClick }: { data: PromptAndUser[], handleTagClick: Function }) {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post: PromptAndUser) => <PromptCard key={post._id} data={post} handleTagClick={handleTagClick} />)}
        </div>
    )
}

export default function Feed() {
    const [searchType, setSearchType] = useState<'tag' | 'username' | 'prompt'>('prompt')
    const [searchText, setSearchText] = useState('')
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
                    const tag = post.tags.find((tag) => tag.tag.toLowerCase().includes(value.toLowerCase()))
                    if (tag) {
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

    function handleTypeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const { value } = e.target
        if (value === 'prompt' || value === 'tag' || value === 'username') setSearchType(value)
    }
    function handleTagClick(tag: string) {
        setSearchText(tag)
        setSearchType('tag')
        const filteredPosts = posts.filter((post) => post.tags.find((tagObj) => tagObj.tag === tag))
        setSearchedPosts(filteredPosts)
    }

    return (
        <section className='feed'>
            <form className='relative w-full flex-center max-sm:block'>
                <input
                    type="text"
                    placeholder={`Search for a ${searchType}`}
                    value={searchText}
                    // @ts-ignore
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
                <select className='search_input--type' value={searchType} onChange={(e) => handleTypeSelect(e)}>
                    <option value="prompt">Prompt</option>
                    <option value="tag">Tag</option>
                    <option value="username">Username</option>
                </select>
            </form>
            <PromptCardList data={searchedPosts} handleTagClick={handleTagClick} />
        </section>
    )
}
