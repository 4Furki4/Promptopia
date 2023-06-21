import Feed from '@components/Feed'
import React from 'react'

export default function Home() {
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
            <Feed />
        </section>
    )
}
