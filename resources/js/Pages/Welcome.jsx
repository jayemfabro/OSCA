import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="OSCA Management System" />
            <div className="min-h-screen bg-[#F5ECD5] text-[#626F47]">
                <div className="relative flex min-h-screen flex-col selection:bg-[#A0C878] selection:text-white">
                    {/* Header */}
                    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <svg className="h-10 w-10 text-[#626F47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <span className="text-2xl font-bold text-[#626F47]">OSCA Management System</span>
                                </div>
                                <nav className="flex gap-4">
                                    {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="rounded-md px-4 py-2 text-[#626F47] ring-1 ring-[#A0C878] transition hover:bg-[#A0C878] hover:text-white focus:outline-none"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="rounded-md px-4 py-2 text-[#626F47] ring-1 ring-[#A0C878] transition hover:bg-[#A0C878] hover:text-white focus:outline-none"
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="rounded-md px-4 py-2 bg-[#A0C878] text-white transition hover:bg-[#626F47] focus:outline-none"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </nav>
                            </div>
                        </div>
                    </header>

                    {/* Hero Section */}
                    <div className="pt-24 pb-16 px-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <h1 className="text-5xl font-bold text-[#626F47] mb-6">
                                    Supporting Our Senior Citizens
                                </h1>
                                <p className="text-xl text-[#626F47]/80 max-w-3xl mx-auto">
                                    A comprehensive management system designed to enhance the quality of life for our elderly community through efficient registration, benefits distribution, and event organization.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="flex-grow px-6 pb-16">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {/* Registration Card */}
                                <div className="bg-white rounded-lg p-8 shadow-lg ring-1 ring-[#A0C878]/20 transition duration-300 hover:shadow-xl">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#A0C878]/20">
                                            <svg className="h-7 w-7 text-[#626F47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-xl font-semibold text-[#626F47]">Easy Registration</h2>
                                    </div>
                                    <p className="text-[#626F47]/80">
                                        Streamlined registration process for senior citizens with digital record-keeping and instant ID generation.
                                    </p>
                                </div>

                                {/* Benefits Card */}
                                <div className="bg-white rounded-lg p-8 shadow-lg ring-1 ring-[#A0C878]/20 transition duration-300 hover:shadow-xl">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#A0C878]/20">
                                            <svg className="h-7 w-7 text-[#626F47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                            </svg>
                                        </div>
                                        <h2 className="text-xl font-semibold text-[#626F47]">Benefits Management</h2>
                                    </div>
                                    <p className="text-[#626F47]/80">
                                        Track and manage various benefits including healthcare, discounts, and special privileges efficiently.
                                    </p>
                                </div>

                                {/* Events Card */}
                                <div className="bg-white rounded-lg p-8 shadow-lg ring-1 ring-[#A0C878]/20 transition duration-300 hover:shadow-xl">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#A0C878]/20">
                                            <svg className="h-7 w-7 text-[#626F47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h2 className="text-xl font-semibold text-[#626F47]">Community Events</h2>
                                    </div>
                                    <p className="text-[#626F47]/80">
                                        Organize and participate in community events, workshops, and activities designed for senior citizens.
                                    </p>
                                </div>

                                {/* Statistics Card */}
                                <div className="bg-white rounded-lg p-8 shadow-lg ring-1 ring-[#A0C878]/20 transition duration-300 hover:shadow-xl md:col-span-2 lg:col-span-3">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-[#A0C878] mb-2">24/7</div>
                                            <div className="text-[#626F47]">Support Available</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-[#A0C878] mb-2">Easy</div>
                                            <div className="text-[#626F47]">Registration Process</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-[#A0C878] mb-2">Quick</div>
                                            <div className="text-[#626F47]">Benefits Processing</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-[#A0C878] mb-2">Active</div>
                                            <div className="text-[#626F47]">Community Events</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="bg-white/80 backdrop-blur-sm py-8">
                        <div className="max-w-7xl mx-auto px-6 text-center text-[#626F47]/70">
                            <p>© 2025 OSCA Management System. All rights reserved.</p>
                            <p className="mt-2 text-sm">Version {laravelVersion} | PHP {phpVersion}</p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
