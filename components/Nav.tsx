"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

export default function Nav() {
    const { data: session } = useSession()
    const [loggingProviders, setLoggingProviders] = useState<any>(null)
    const [toggleDropDown, setToggleDropDown] = useState(false)
    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders()
            setLoggingProviders(response)
        }
        (async () => await setProviders())()
    }, [])
    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href={"/"}
                className='gap-2 flex-center'>
                <Image
                    src={"/assets/images/logo.svg"}
                    alt='Promptopia Logo'
                    width={30}
                    height={30}
                    className='object-contain'
                />
                <p className='logo_text'>
                    Promptopia
                </p>
            </Link>
            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className='flex gap-3 md:gap-5'>
                        <Link
                            href={"/create-prompt"}
                            className='black_btn'
                        >
                            Create Post
                        </Link>

                        <button type='button' onClick={() => signOut()}
                            className='outline_btn'
                        >
                            Sign Out
                        </button>
                        <Link href={"/profile"}>
                            <Image
                                src={session?.user?.image || "/assets/images/profile.svg"}
                                alt='Profile'
                                width={37}
                                height={37}
                            />
                        </Link>
                    </div>
                ) :
                    <>
                        {
                            loggingProviders &&
                            Object.values(loggingProviders).map(
                                (provider: any) => (
                                    <button
                                        onClick={() => signIn(provider.id)}
                                        className='black_btn'
                                        type='button'
                                        key={provider.name}>
                                        Sign in with {provider.name}
                                    </button>
                                )
                            )
                        }
                    </>}
            </div>
            {/* Mobile Navigation */}
            <div className='sm:hidden flex relative'>
                {
                    session?.user ? (
                        <div className="flex">
                            <Image
                                src={session?.user?.image || "/assets/images/profile.svg"}
                                alt='Profile'
                                width={37}
                                height={37}
                                onClick={() => setToggleDropDown((prev) => !prev)}
                            />

                            {
                                toggleDropDown && (
                                    <div className="dropdown">
                                        <Link
                                            className='dropdown_item'
                                            onClick={() => setToggleDropDown(false)}
                                            href={"/profile"}
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            className='dropdown_item'
                                            onClick={() => setToggleDropDown(false)}
                                            href={"/create-prompt"}
                                        >
                                            Create Prompt
                                        </Link>
                                        <button
                                            className="mt-5 w-full black_btn"
                                            type='button'
                                            onClick={() => {
                                                setToggleDropDown(false)
                                                signOut()
                                            }}
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    ) : <>
                        {
                            loggingProviders &&
                            Object.values(loggingProviders).map(
                                (provider: any) => (
                                    <button
                                        onClick={() => signIn(provider.id)}
                                        className='black_btn'
                                        type='button'
                                        key={provider.name}>
                                        Sign in with {provider.name}
                                    </button>
                                )
                            )
                        }
                    </>
                }
            </div>
        </nav>
    )
}
