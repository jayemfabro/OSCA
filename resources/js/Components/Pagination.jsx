import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    // Don't render pagination if there's only 1 page
    if (links.length <= 3) {
        return null;
    }
    
    return (
        <nav role="navigation" aria-label="Pagination Navigation" className="flex justify-between">
            <div className="flex flex-1 justify-between sm:hidden">
                {links[0].url ? (
                    <Link
                        href={links[0].url}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </Link>
                ) : (
                    <span className="relative inline-flex cursor-not-allowed items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500">
                        Previous
                    </span>
                )}
                
                {links[links.length - 1].url ? (
                    <Link
                        href={links[links.length - 1].url}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </Link>
                ) : (
                    <span className="relative ml-3 inline-flex cursor-not-allowed items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500">
                        Next
                    </span>
                )}
            </div>
            
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing
                        <span className="mx-1 font-medium">{links[1].label}</span>
                        to
                        <span className="mx-1 font-medium">{links[links.length - 2].label}</span>
                        of
                        <span className="mx-1 font-medium">{links[links.length - 2].label}</span>
                        results
                    </p>
                </div>
                
                <div>
                    <span className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm">
                        {links.map((link, key) => {
                            if (link.url === null) {
                                return (
                                    <span
                                        key={key}
                                        className="relative inline-flex cursor-not-allowed items-center border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            }
                            
                            return (
                                <Link
                                    key={key}
                                    href={link.url}
                                    className={`relative inline-flex items-center border border-gray-300 px-4 py-2 text-sm font-medium ${
                                        link.active ? 'z-10 border-indigo-500 bg-indigo-50 text-indigo-600' : 'bg-white text-gray-500 hover:bg-gray-50'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            );
                        })}
                    </span>
                </div>
            </div>
        </nav>
    );
}
