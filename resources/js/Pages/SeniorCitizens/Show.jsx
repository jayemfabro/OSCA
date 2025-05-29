import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';

export default function Show({ senior, auth }) {
    const [activeTab, setActiveTab] = useState('profile');
    
    const calculateAge = (birthDateString) => {
        const birthDate = new Date(birthDateString);
        const today = new Date();
        
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Senior Citizen Profile
                </h2>
            }
        >
            <Head title={`${senior.first_name} ${senior.last_name} - Profile`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <Link
                                href={route('seniors.index')}
                                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition hover:bg-gray-50"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to List
                            </Link>
                        </div>
                        <div className="flex space-x-2">
                            <Link
                                href={route('seniors.pdf', senior.id)}
                                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition hover:bg-gray-50"
                                target="_blank"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Print PDF
                            </Link>
                            
                            {(auth.user.role === 'admin' || auth.user.role === 'encoder') && (
                                <Link
                                    href={route('seniors.edit', senior.id)}
                                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-indigo-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Profile
                                </Link>
                            )}
                            
                            {(auth.user.role === 'admin' || auth.user.role === 'encoder') && !senior.is_deceased && (
                                <button
                                    onClick={() => alert('Mark as Deceased functionality will be implemented')}
                                    className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-red-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    Mark as Deceased
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6 flex flex-col items-center border-b border-gray-200 pb-6 md:flex-row md:items-start">
                                <div className="mb-4 md:mb-0 md:mr-6">
                                    {senior.photo_path ? (
                                        <img
                                            src={`/storage/${senior.photo_path}`}
                                            alt={`${senior.first_name} ${senior.last_name}`}
                                            className="h-32 w-32 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-200 text-gray-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {`${senior.first_name} ${senior.middle_name ? senior.middle_name + ' ' : ''}${senior.last_name}${senior.suffix ? ', ' + senior.suffix : ''}`}
                                        {senior.is_deceased && (
                                            <span className="ml-2 rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                                                Deceased
                                            </span>
                                        )}
                                    </h2>
                                    <p className="mt-1 text-gray-600">ID: {senior.senior_citizen_id}</p>
                                    <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        <div>
                                            <span className="text-sm font-semibold text-gray-500">Age:</span>
                                            <span className="ml-2 text-sm text-gray-900">{calculateAge(senior.birth_date)} years</span>
                                        </div>
                                        <div>
                                            <span className="text-sm font-semibold text-gray-500">Gender:</span>
                                            <span className="ml-2 text-sm text-gray-900">{senior.gender}</span>
                                        </div>
                                        <div>
                                            <span className="text-sm font-semibold text-gray-500">Civil Status:</span>
                                            <span className="ml-2 text-sm text-gray-900">{senior.civil_status}</span>
                                        </div>
                                        <div>
                                            <span className="text-sm font-semibold text-gray-500">Barangay:</span>
                                            <span className="ml-2 text-sm text-gray-900">{senior.barangay}</span>
                                        </div>
                                        <div>
                                            <span className="text-sm font-semibold text-gray-500">Birth Date:</span>
                                            <span className="ml-2 text-sm text-gray-900">
                                                {new Date(senior.birth_date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        {senior.is_deceased && senior.deceased_date && (
                                            <div>
                                                <span className="text-sm font-semibold text-gray-500">Deceased Date:</span>
                                                <span className="ml-2 text-sm text-gray-900">
                                                    {new Date(senior.deceased_date).toLocaleDateString()}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4 border-b border-gray-200">
                                <nav className="-mb-px flex space-x-8">
                                    <button
                                        onClick={() => setActiveTab('profile')}
                                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                                            activeTab === 'profile'
                                                ? 'border-indigo-500 text-indigo-600'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }`}
                                    >
                                        Profile Information
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('benefits')}
                                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                                            activeTab === 'benefits'
                                                ? 'border-indigo-500 text-indigo-600'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }`}
                                    >
                                        Benefits
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('events')}
                                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                                            activeTab === 'events'
                                                ? 'border-indigo-500 text-indigo-600'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }`}
                                    >
                                        Activities & Events
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('documents')}
                                        className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                                            activeTab === 'documents'
                                                ? 'border-indigo-500 text-indigo-600'
                                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }`}
                                    >
                                        Documents
                                    </button>
                                </nav>
                            </div>

                            {activeTab === 'profile' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                                        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <span className="block text-sm font-medium text-gray-500">Full Name</span>
                                                <span className="block text-sm text-gray-900">
                                                    {`${senior.first_name} ${senior.middle_name ? senior.middle_name + ' ' : ''}${senior.last_name}${senior.suffix ? ', ' + senior.suffix : ''}`}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="block text-sm font-medium text-gray-500">Birth Date</span>
                                                <span className="block text-sm text-gray-900">
                                                    {new Date(senior.birth_date).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="block text-sm font-medium text-gray-500">Gender</span>
                                                <span className="block text-sm text-gray-900">{senior.gender}</span>
                                            </div>
                                            <div>
                                                <span className="block text-sm font-medium text-gray-500">Civil Status</span>
                                                <span className="block text-sm text-gray-900">{senior.civil_status}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                                        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div>
                                                <span className="block text-sm font-medium text-gray-500">Address</span>
                                                <span className="block text-sm text-gray-900">{senior.address}</span>
                                            </div>
                                            <div>
                                                <span className="block text-sm font-medium text-gray-500">Barangay</span>
                                                <span className="block text-sm text-gray-900">{senior.barangay}</span>
                                            </div>
                                            <div>
                                                <span className="block text-sm font-medium text-gray-500">Contact Number</span>
                                                <span className="block text-sm text-gray-900">{senior.contact_number || 'Not provided'}</span>
                                            </div>
                                            <div>
                                                <span className="block text-sm font-medium text-gray-500">Emergency Contact</span>
                                                <span className="block text-sm text-gray-900">
                                                    {senior.emergency_contact_name ? `${senior.emergency_contact_name} (${senior.emergency_contact_number || 'No number'})` : 'Not provided'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'benefits' && (
                                <div>
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-lg font-medium text-gray-900">Benefits Received</h3>
                                        {(auth.user.role === 'admin' || auth.user.role === 'encoder') && (
                                            <button
                                                onClick={() => alert('Add Benefit functionality will be implemented')}
                                                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-indigo-500"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Add Benefit
                                            </button>
                                        )}
                                    </div>
                                    {senior.benefits && senior.benefits.length > 0 ? (
                                        <div className="overflow-x-auto rounded-lg border">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                            Benefit
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                            Date Received
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                            Remarks
                                                        </th>
                                                        {(auth.user.role === 'admin' || auth.user.role === 'encoder') && (
                                                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                                                Actions
                                                            </th>
                                                        )}
                                                    </tr>
                                                </thead>                                                <tbody className="divide-y divide-gray-200 bg-white">{
                                                    senior.benefits.map((benefit) => (
                                                        <tr key={benefit.id}>
                                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                                {benefit.name}
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                                {new Date(benefit.pivot.date_received).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                                {benefit.pivot.remarks || 'No remarks'}
                                                            </td>
                                                            {(auth.user.role === 'admin' || auth.user.role === 'encoder') && (
                                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                                    <button
                                                                        onClick={() => alert('Remove Benefit functionality will be implemented')}
                                                                        className="text-red-600 hover:text-red-900"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </td>
                                                            )}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="rounded-md bg-yellow-50 p-4">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="text-sm font-medium text-yellow-800">No benefits recorded</h3>
                                                    <div className="mt-2 text-sm text-yellow-700">
                                                        <p>This senior citizen has not received any benefits yet.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'events' && (
                                <div>
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-lg font-medium text-gray-900">Activities & Events</h3>
                                        {(auth.user.role === 'admin' || auth.user.role === 'encoder') && (
                                            <button
                                                onClick={() => alert('Register for Event functionality will be implemented')}
                                                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-indigo-500"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                Register for Event
                                            </button>
                                        )}
                                    </div>
                                    {senior.events && senior.events.length > 0 ? (
                                        <div className="overflow-x-auto rounded-lg border">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                            Event
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                            Date
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                            Location
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                            Status
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                            Attendance
                                                        </th>
                                                        {(auth.user.role === 'admin' || auth.user.role === 'encoder') && (
                                                            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                                                Actions
                                                            </th>
                                                        )}
                                                    </tr>
                                                </thead>                                                <tbody className="divide-y divide-gray-200 bg-white">{
                                                    senior.events.map((event) => (
                                                        <tr key={event.id}>
                                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                                {event.title}
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                                {new Date(event.start_date).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                                {event.location || 'N/A'}
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                                    event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                                                                    event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                                                                    event.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                                                                    'bg-red-100 text-red-800'
                                                                }`}>
                                                                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                                                </span>
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                                {event.pivot.attended ? (
                                                                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                                        Attended
                                                                    </span>
                                                                ) : (
                                                                    <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                                                                        Not Attended
                                                                    </span>
                                                                )}
                                                            </td>
                                                            {(auth.user.role === 'admin' || auth.user.role === 'encoder') && (
                                                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                                    {!event.pivot.attended && event.status !== 'cancelled' && event.status !== 'upcoming' && (
                                                                        <button
                                                                            onClick={() => alert('Mark Attendance functionality will be implemented')}
                                                                            className="text-green-600 hover:text-green-900"
                                                                        >
                                                                            Mark Attended
                                                                        </button>
                                                                    )}
                                                                </td>
                                                            )}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="rounded-md bg-yellow-50 p-4">
                                            <div className="flex">
                                                <div className="flex-shrink-0">
                                                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="ml-3">
                                                    <h3 className="text-sm font-medium text-yellow-800">No events recorded</h3>
                                                    <div className="mt-2 text-sm text-yellow-700">
                                                        <p>This senior citizen has not participated in any events yet.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'documents' && (
                                <div>
                                    <h3 className="mb-4 text-lg font-medium text-gray-900">Documents</h3>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {senior.birth_certificate_path && (
                                            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
                                                <div className="p-5">
                                                    <div className="mb-2 flex items-center">
                                                        <svg className="mr-2 h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                        <h4 className="text-lg font-medium text-gray-900">Birth Certificate</h4>
                                                    </div>
                                                    <p className="text-sm text-gray-500">Uploaded document for verification.</p>
                                                    <div className="mt-4">
                                                        <a
                                                            href={`/storage/${senior.birth_certificate_path}`}
                                                            target="_blank"
                                                            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-indigo-500"
                                                        >
                                                            View Document
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
                                            <div className="p-5">
                                                <div className="mb-2 flex items-center">
                                                    <svg className="mr-2 h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9a2 2 0 10-4 0v5a2 2 0 104 0V9z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01M19 6.7a2 2 0 11-4 0 2 2 0 014 0zM8 17a2 2 0 100-4 2 2 0 000 4z" />
                                                    </svg>
                                                    <h4 className="text-lg font-medium text-gray-900">Senior Citizen ID</h4>
                                                </div>
                                                <p className="text-sm text-gray-500">Official senior citizen identification.</p>
                                                <div className="mt-4">
                                                    <Link
                                                        href={route('id-generation.edit', senior.id)}
                                                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-indigo-500"
                                                    >
                                                        View & Print ID
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
