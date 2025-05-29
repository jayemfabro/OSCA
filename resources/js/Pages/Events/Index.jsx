import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Index({ auth, events, filters }) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const search = (e) => {
        e.preventDefault();
        window.location = route('events.index', { 
            search: searchQuery, 
            status: statusFilter 
        });
    };
    
    const clearFilters = () => {
        setSearchQuery('');
        setStatusFilter('');
        window.location = route('events.index');
    };
    
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'upcoming':
                return 'bg-blue-100 text-blue-800';
            case 'ongoing':
                return 'bg-green-100 text-green-800';
            case 'completed':
                return 'bg-gray-100 text-gray-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };
    
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Events
                </h2>
            }
        >
            <Head title="Events" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6 flex items-center justify-between">
                                <form onSubmit={search} className="flex flex-1 items-center space-x-4">
                                    <div className="flex-1">
                                        <TextInput
                                            type="text"
                                            value={searchQuery}
                                            placeholder="Search events..."
                                            className="w-full"
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-48">
                                        <select
                                            value={statusFilter}
                                            className="border-gray-300 rounded-md shadow-sm w-full"
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                        >
                                            <option value="">All Statuses</option>
                                            <option value="upcoming">Upcoming</option>
                                            <option value="ongoing">Ongoing</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <div>
                                        <PrimaryButton type="submit">Search</PrimaryButton>
                                    </div>
                                    <div>
                                        <SecondaryButton type="button" onClick={clearFilters}>
                                            Clear
                                        </SecondaryButton>
                                    </div>
                                </form>
                                
                                {(auth.user.role === 'admin' || auth.user.role === 'encoder') && (
                                    <Link href={route('events.create')}>
                                        <PrimaryButton>Create Event</PrimaryButton>
                                    </Link>
                                )}
                            </div>

                            <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Title
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Location
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Attendees
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {events.data.length > 0 ? (
                                            events.data.map(event => (
                                                <tr key={event.id}>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <Link href={route('events.show', event.id)} className="text-indigo-600 hover:text-indigo-900">
                                                            {event.title}
                                                        </Link>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {formatDate(event.start_date)}
                                                        {event.end_date && event.end_date !== event.start_date && (
                                                            <span> to {formatDate(event.end_date)}</span>
                                                        )}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {event.location || 'N/A'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(event.status)}`}>
                                                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {event.seniors_count || 0} seniors
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                    No events found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6">
                                <Pagination links={events.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
