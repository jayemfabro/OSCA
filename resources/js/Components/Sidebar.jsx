import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Sidebar({ className = '', expanded = true, setExpanded, toggleSidebar }) {
    const { url, component } = usePage();
    const user = usePage().props.auth.user;
    
    // Using props for expanded state and toggle function instead of internal state
    
    const isActive = (path) => {
        return url.startsWith(path);
    };    const navigationItems = [        {
            name: 'Dashboard',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
            ),
            href: route('dashboard'),
            active: route().current('dashboard'),
            roles: ['admin', 'barangay_admin', 'encoder', 'viewer'],
        },        {
            name: 'Senior Registration',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                </svg>
            ),
            href: route('seniors.registration'),
            active: route().current('seniors.registration'),
            roles: ['admin', 'encoder'],
        },
        {            name: 'Masterlist',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                </svg>
            ),            href: route('seniors.index'),
            active: route().current('seniors.index'),
            roles: ['admin', 'barangay_admin', 'encoder', 'viewer'],        },
        {
            name: 'ID Generation',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-3 3h6a3.001 3.001 0 00-3-3z"
                    />
                </svg>
            ),
            href: route('id-generation.index'),
            active: route().current('id-generation.*'),
            roles: ['admin', 'barangay_admin', 'encoder', 'viewer'],
        },
        {
            name: 'Benefits Tracker',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                </svg>
            ),
            href: route('benefits.tracker'),
            active: route().current('benefits.*'),
            roles: ['admin', 'barangay_admin', 'encoder', 'viewer'],
        },
        {
            name: 'Activities & Events',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            ),
            href: route('events.index'),
            active: route().current('events.*'),
            roles: ['admin', 'barangay_admin', 'encoder', 'viewer'],
        },
        {
            name: 'Settings',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            ),
            href: route('settings.index'),
            active: route().current('settings.*'),
            roles: ['admin'],
        },
    ];

    return (
        <div className={`${className} ${expanded ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
            <div className="flex h-full flex-col bg-white shadow-lg">
                <div className="flex items-center justify-between p-4 border-b">
                    {expanded ? (
                        <div className="text-2xl font-semibold text-gray-800">OSCA</div>
                    ) : (
                        <div className="text-xl font-bold text-center w-full text-gray-800">O</div>
                    )}
                    <button
                        onClick={toggleSidebar}
                        className="rounded p-1 hover:bg-gray-100"
                        title={expanded ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 transition-transform ${expanded ? '' : 'transform rotate-180'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                            />
                        </svg>
                    </button>
                </div>                <div className="flex flex-grow flex-col p-4 space-y-2 overflow-y-auto">
                    {navigationItems.map((item) => {
                        if (!item.roles.includes(user.role)) {
                            return null;
                        }
                        
                        const hasChildren = item.children && item.children.length > 0;
                        const visibleChildren = hasChildren ? item.children.filter(child => child.roles.includes(user.role)) : [];
                        
                        return (
                            <div key={item.name} className="space-y-1">
                                <Link
                                    href={item.href}
                                    className={`flex items-center space-x-2 rounded-lg p-2 transition-colors ${
                                        item.active
                                            ? 'bg-indigo-100 text-indigo-600'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <div className="flex-shrink-0">{item.icon}</div>
                                    {expanded && (
                                        <span className="truncate text-sm font-medium flex-grow">
                                            {item.name}
                                        </span>
                                    )}
                                </Link>
                                
                                {expanded && visibleChildren.length > 0 && (
                                    <div className="ml-6 space-y-1 border-l border-gray-200 pl-2">
                                        {visibleChildren.map((child) => (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                className={`flex items-center space-x-2 rounded-lg p-2 transition-colors text-sm ${
                                                    child.active
                                                        ? 'bg-indigo-50 text-indigo-600'
                                                        : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                            >
                                                <span className="truncate font-medium">
                                                    {child.name}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="p-4 border-t">
                    {expanded ? (
                        <div className="text-sm">
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-xs text-gray-500">{user.role}</div>
                        </div>
                    ) : (
                        <div className="text-center text-xl font-bold text-gray-600">
                            {user.name.charAt(0)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
