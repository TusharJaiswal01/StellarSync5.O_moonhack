'use client'

import { Layers3, LogIn, LogOut, Menu, UserPlus, X } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

const items = [
    {
        name: 'Round',
        href: '/round1',
        icon: <Layers3 className="mr-2 h-4 w-4 text-blue-500" />,
        protected: true
    }
]

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { status } = useSession()

    return (
        <nav className="sticky top-0 z-50 border-b border-white/40 bg-white/30 shadow-md backdrop-blur-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-blue-800 hover:text-blue-900"
                        >
                            Techno x AI
                        </Link>

                        <div className="hidden sm:flex sm:space-x-6">
                            {items.map((item, index) =>
                                item.protected && status !== 'authenticated' ? null : (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100 hover:text-blue-900"
                                    >
                                        {item.icon}
                                        {item.name}
                                    </Link>
                                )
                            )}
                        </div>
                    </div>

                    {/* Auth Actions Desktop */}
                    <div className="hidden items-center space-x-4 sm:flex">
                        {status === 'authenticated' ? (
                            <Button
                                onClick={() => signOut()}
                                className="flex items-center gap-2 text-sm font-semibold hover:bg-red-100 hover:text-red-600"
                                variant="ghost"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </Button>
                        ) : (
                            <>
                                <Link href="/signin">
                                    <Button
                                        variant="ghost"
                                        className="flex items-center gap-2 text-sm"
                                    >
                                        <LogIn className="h-4 w-4" />
                                        Sign in
                                    </Button>
                                </Link>
                               
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex sm:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-expanded={isMenuOpen}
                        >
                            <span className="sr-only">Toggle menu</span>
                            {isMenuOpen ? (
                                <X className="h-6 w-6 text-blue-700" />
                            ) : (
                                <Menu className="h-6 w-6 text-blue-700" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isMenuOpen && (
                <div className="border-t border-white/30 bg-white/40 shadow-inner backdrop-blur-md sm:hidden">
                    <div className="space-y-2 px-4 py-4">
                        {items.map((item, index) =>
                            item.protected && status !== 'authenticated' ? null : (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-blue-800 transition hover:bg-blue-100"
                                >
                                    {item.icon}
                                    {item.name}
                                </Link>
                            )
                        )}

                        <div className="border-t border-white/40 pt-4">
                            {status === 'authenticated' ? (
                                <Button
                                    onClick={() => signOut()}
                                    className="flex w-full items-center gap-2 text-left text-sm hover:bg-red-100 hover:text-red-600"
                                    variant="ghost"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Sign Out
                                </Button>
                            ) : (
                                <>
                                    <Link href="/signin">
                                        <Button
                                            variant="ghost"
                                            className="flex w-full items-center gap-2 text-sm"
                                        >
                                            <LogIn className="h-4 w-4" />
                                            Sign in
                                        </Button>
                                    </Link>
                                    <Link href="/signup">
                                        <Button className="flex w-full items-center gap-2 text-sm">
                                            <UserPlus className="h-4 w-4" />
                                            Sign up
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
