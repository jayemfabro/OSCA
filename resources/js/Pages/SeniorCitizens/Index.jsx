import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';

export default function Index({ seniors, filters, auth }) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [barangayFilter, setBarangayFilter] = useState(filters.barangay || '');
    
    const { get, delete: destroy } = useForm();
    
    const search = (e) => {
        e.preventDefault();
        get(route('seniors.index', { 
            search: searchQuery,
            barangay: barangayFilter,
        }));
    };

    const clearFilters = () => {
        setSearchQuery('');
        setBarangayFilter('');
        get(route('seniors.index'));
    };

    const confirmDelete = (senior) => {
        if (confirm(`Are you sure you want to delete ${senior.first_name} ${senior.last_name}?`)) {
            destroy(route('seniors.destroy', senior.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Senior Citizens Masterlist
                </h2>
            }
        >
            <Head title="Senior Citizens Masterlist" />

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
                                            placeholder="Search by name or ID..."
                                            className="w-full"
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-48">                                        
                                        <select
                                            value={barangayFilter}
                                            onChange={(e) => setBarangayFilter(e.target.value)}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="">All Barangays</option>
                                            {seniors.barangays?.map((barangay) => (
                                                <option key={barangay.id} value={barangay.id}>
                                                    {barangay.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-gray-700 focus:bg-gray-700"
                                    >
                                        Search
                                    </button>
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition hover:bg-gray-50"
                                    >
                                        Clear
                                    </button>
                                </form>
                                
                                {auth.user.role === 'admin' || auth.user.role === 'encoder' ? (                                    <Link
                                        href={route('seniors.registration')}
                                        className="ml-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-indigo-500 focus:bg-indigo-700"
                                    >
                                        Register New Senior
                                    </Link>
                                ) : null}
                            </div>
                            
                            <div className="mt-4 overflow-x-auto rounded-lg border">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                ID
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Age
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Barangay
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {seniors.data && seniors.data.length > 0 ? seniors.data.map((senior) => (
                                                <tr key={senior.id}>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {senior.senior_citizen_id}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                        <Link
                                                            href={route('seniors.show', senior.id)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            {`${senior.first_name} ${senior.middle_name ? senior.middle_name + ' ' : ''}${senior.last_name}${senior.suffix ? ', ' + senior.suffix : ''}`}
                                                        </Link>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {calculateAge(senior.birth_date)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {typeof senior.barangay === 'string' ? senior.barangay : senior.barangay?.name || ''}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {senior.is_deceased ? (
                                                            <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                                                                Deceased
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                                Active
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                        <div className="flex justify-end space-x-2">
                                                            <Link
                                                                href={route('seniors.show', senior.id)}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                View
                                                            </Link>
                                                            
                                                            {(auth.user.role === 'admin' || auth.user.role === 'encoder') && (
                                                                <Link
                                                                    href={route('seniors.edit', senior.id)}
                                                                    className="text-amber-600 hover:text-amber-900"
                                                                >
                                                                    Edit
                                                                </Link>
                                                            )}
                                                            
                                                            {auth.user.role === 'admin' && (
                                                                <button
                                                                    onClick={() => confirmDelete(senior)}
                                                                    className="text-red-600 hover:text-red-900"
                                                                >
                                                                    Delete
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        : (
                                            <tr>
                                                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                                    No senior citizens found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="mt-6">
                                <Pagination links={seniors.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Helper function to calculate age from birth date
function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}
