"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import path from 'path'
export default function PromptCard({ data, handleTagClick, handleEdit, handleDelete }: { data: PromptAndUser, handleTagClick: Function, handleEdit?: Function, handleDelete?: Function }) {
    function handleCopy() {
        const textToCopy = data.prompt
        navigator.clipboard.writeText(textToCopy)
        setCopied(textToCopy)
        setTimeout(() => setCopied(""), 3000)
    }
    const { data: session }: { data: CustomSession } = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const [copied, setCopied] = useState("")
    return (
        <div className='prompt_card'>
            <div
                className="flex justify-between items-start gap-5">
                <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
                    <Image src={data?.creator?.image} alt="user profile picture"
                        width={50} height={50} className='rounded-full object-contain' />
                    <div className='flex flex-col'>
                        <h3 className='font-satoshi font-semibold text-gray-900'>
                            {data?.creator?.username}
                        </h3>
                        <p className='font-inter text-sm text-gray-500'>
                            {data?.creator?.email}
                        </p>
                    </div>
                </div>
                <div className='copy_btn' onClick={handleCopy}>
                    <Image src={
                        copied === data?.prompt ?
                            "/assets/icons/tick.svg" :
                            "/assets/icons/copy.svg"}
                        width={12}
                        height={12}
                        alt={
                            copied === data?.prompt ? "copied icon" : "copy icon"
                        } />
                </div>
            </div>
            <p className='my-4 font-satoshi text-sm text-gray-700'>
                {data.prompt}
            </p>
            <p className='font-inter text-sm blue_gradient cursor-pointer'
                onClick={() => handleTagClick && handleTagClick(data.tag)}
            >
                {data.tag}
            </p>

            {
                session?.user.sessionId === data?.creator._id && pathname === "/profile" &&
                <div className='flex justify-end items-center gap-5 mt-5'>
                    <button className='font-inter text-sm green_gradient cursor-pointer'
                        onClick={() => handleEdit(data)}
                    >
                        Edit
                    </button>
                    <button className='font-inter text-sm orange_gradient cursor-pointer'
                        onClick={() => handleDelete(data._id)}
                    >
                        Delete
                    </button>
                </div>
            }
        </div>
    )
}