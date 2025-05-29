import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';

export default function Show({ auth, event }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAttendeeModal, setShowAttendeeModal] = useState(false);
    const { delete: destroy, processing } = useForm();
    
    const { data, setData, post, processing: attendeeProcessing } = useForm({
        senior_id: '',
    });

    const confirmDelete = () => {
        setShowDeleteModal(true);
    };

    const deleteEvent = () => {
        destroy(route('events.destroy', event.id), {
            onSuccess: () => setShowDeleteModal(false),
        });
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const openAttendeeModal = () => {
        setShowAttendeeModal(true);
    };

    const closeAttendeeModal = () => {
        setShowAttendeeModal(false);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
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

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Event Details
                </h2>
            }
        >
            <Head title={`Event: ${event.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-6 flex justify-between">
                                <Link href={route('events.index')}>
                                    <SecondaryButton>Back to Events</SecondaryButton>
                                </Link>
                                <div className="space-x-2">
                                    {(auth.user.role === 'admin' || auth.user.role === 'encoder') && (
                                        <>
                                            <Link href={route('events.edit', event.id)}>
                                                <PrimaryButton>Edit Event</PrimaryButton>
                                            </Link>
                                            {auth.user.role === 'admin' && (
                                                <DangerButton onClick={confirmDelete}>Delete Event</DangerButton>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <div className="col-span-2">
                                    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                        <h3 className="mb-3 text-xl font-bold">{event.title}</h3>
                                        <p className="mb-4 text-gray-600">{event.description || 'No description provided.'}</p>
                                        
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-500">Date:</h4>
                                                <p className="mb-2">{formatDate(event.start_date)}</p>
                                                {event.end_date && event.end_date !== event.start_date && (
                                                    <>
                                                        <h4 className="text-sm font-semibold text-gray-500">End Date:</h4>
                                                        <p className="mb-2">{formatDate(event.end_date)}</p>
                                                    </>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-500">Location:</h4>
                                                <p className="mb-2">{event.location || 'N/A'}</p>
                                                
                                                <h4 className="text-sm font-semibold text-gray-500">Status:</h4>
                                                <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusBadgeClass(event.status)}`}>
                                                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                    <h3 className="mb-4 text-lg font-medium">Event Statistics</h3>
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-gray-500">Attendees:</h4>
                                        <p className="text-2xl font-bold">{event.seniors ? event.seniors.length : 0}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-medium">Attendees</h3>
                                    {(auth.user.role === 'admin' || auth.user.role === 'encoder') && (
                                        <PrimaryButton onClick={openAttendeeModal}>Add Attendee</PrimaryButton>
                                    )}
                                </div>
                                
                                <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Senior ID
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Barangay
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {event.seniors && event.seniors.length > 0 ? (
                                                event.seniors.map(senior => (
                                                    <tr key={senior.id}>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            {senior.senior_citizen_id}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            <Link href={route('seniors.show', senior.id)} className="text-indigo-600 hover:text-indigo-900">
                                                                {senior.last_name}, {senior.first_name} {senior.middle_name ? senior.middle_name.charAt(0) + '.' : ''}
                                                                {senior.suffix || ''}
                                                            </Link>
                                                            {senior.is_deceased && (
                                                                <span className="ml-2 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                                                                    Deceased
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4">
                                                            {senior.barangay}
                                                        </td>
                                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                            {(auth.user.role === 'admin' || auth.user.role === 'encoder') && (
                                                                <button
                                                                    onClick={() => {}}
                                                                    className="text-red-600 hover:text-red-900"
                                                                >
                                                                    Remove
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                                        No attendees recorded for this event.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Modal show={showDeleteModal} onClose={closeDeleteModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Delete Event</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Are you sure you want to delete this event? This action cannot be undone.
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeDeleteModal} className="mr-2">Cancel</SecondaryButton>
                        <DangerButton onClick={deleteEvent} disabled={processing}>Delete</DangerButton>
                    </div>
                </div>
            </Modal>
            
            <Modal show={showAttendeeModal} onClose={closeAttendeeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Add Attendee</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Search for and add a senior citizen as an attendee to this event.
                    </p>
                    <div className="mt-4">
                        {/* TODO: Implement senior citizen search/select functionality */}
                        <p className="text-sm text-gray-500">
                            The attendee functionality will be implemented in the next phase.
                        </p>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeAttendeeModal} className="mr-2">Close</SecondaryButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
