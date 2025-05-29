import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { useForm } from '@inertiajs/react';

export default function Tracker({ auth, seniors, benefits, filters }) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [barangayFilter, setBarangayFilter] = useState(filters.barangay || '');
    
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [selectedSenior, setSelectedSenior] = useState(null);
    const [selectedBenefit, setSelectedBenefit] = useState(null);
    
    const { data, setData, post, processing, errors, reset } = useForm({
        benefit_id: '',
        date_received: new Date().toISOString().substr(0, 10),
        remarks: '',
    });
    
    const { data: removeData, setData: setRemoveData, post: postRemove, processing: removeProcessing } = useForm({
        benefit_id: '',
    });
    
    const search = (e) => {
        e.preventDefault();
        window.location = route('benefits.tracker', { 
            search: searchQuery,
            barangay: barangayFilter,
        });
    };
    
    const clearFilters = () => {
        setSearchQuery('');
        setBarangayFilter('');
        window.location = route('benefits.tracker');
    };
    
    const openAssignModal = (senior) => {
        setSelectedSenior(senior);
        setShowAssignModal(true);
    };
    
    const closeAssignModal = () => {
        setShowAssignModal(false);
        reset();
    };
    
    const openRemoveModal = (senior, benefit) => {
        setSelectedSenior(senior);
        setSelectedBenefit(benefit);
        setRemoveData('benefit_id', benefit.id);
        setShowRemoveModal(true);
    };
    
    const closeRemoveModal = () => {
        setShowRemoveModal(false);
    };
    
    const handleAssignSubmit = (e) => {
        e.preventDefault();
        post(route('benefits.assign', selectedSenior.id), {
            onSuccess: () => {
                closeAssignModal();
            },
        });
    };
    
    const handleRemoveSubmit = (e) => {
        e.preventDefault();
        postRemove(route('benefits.remove', selectedSenior.id), {
            onSuccess: () => {
                closeRemoveModal();
            },
        });
    };
    
    const generateReport = () => {
        window.location.href = route('benefits.report');
    };
    
    const hasUnreceivedBenefits = (senior) => {
        const seniorBenefitIds = senior.benefits.map(b => b.id);
        return benefits.some(b => !seniorBenefitIds.includes(b.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Benefits Tracker
                </h2>
            }
        >
            <Head title="Benefits Tracker" />

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
                                            className="border-gray-300 rounded-md shadow-sm w-full"
                                            onChange={(e) => setBarangayFilter(e.target.value)}
                                        >
                                            <option value="">All Barangays</option>
                                            <option value="Barangay 1">Barangay 1</option>
                                            <option value="Barangay 2">Barangay 2</option>
                                            <option value="Barangay 3">Barangay 3</option>
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
                                
                                <div className="ml-4">
                                    <PrimaryButton onClick={generateReport}>Generate Report</PrimaryButton>
                                </div>
                            </div>

                            <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Senior Citizen
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                ID Number
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Barangay
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Benefits Received
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {seniors.data && seniors.data.length > 0 ? 
                                            seniors.data.map(senior => (
                                                <tr key={senior.id}>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <Link href={route('seniors.show', senior.id)} className="text-indigo-600 hover:text-indigo-900">
                                                            {senior.last_name}, {senior.first_name} {senior.middle_name ? senior.middle_name.charAt(0) + '. ' : ''}
                                                            {senior.suffix || ''}
                                                        </Link>
                                                        {senior.is_deceased && (
                                                            <span className="ml-2 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                                                                Deceased
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {senior.senior_citizen_id}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {typeof senior.barangay === 'string' ? senior.barangay : senior.barangay?.name || ''}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {senior.benefits && senior.benefits.length > 0 ? (
                                                            <div className="flex flex-wrap gap-1">
                                                                {senior.benefits.map(benefit => (
                                                                    <div key={benefit.id} className="flex items-center gap-1">
                                                                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                                                            {benefit.name}
                                                                        </span>
                                                                        {auth.user.role !== 'viewer' && !senior.is_deceased && (
                                                                            <button
                                                                                onClick={() => openRemoveModal(senior, benefit)}
                                                                                className="text-xs text-red-500 hover:text-red-700"
                                                                            >
                                                                                ×
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <span className="text-sm text-gray-500">No benefits received</span>
                                                        )}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                        {auth.user.role !== 'viewer' && !senior.is_deceased && hasUnreceivedBenefits(senior) && (
                                                            <button
                                                                onClick={() => openAssignModal(senior)}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                Assign Benefit
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                    No senior citizens found.
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
            
            {/* Assign Benefit Modal */}
            <Modal show={showAssignModal} onClose={closeAssignModal}>
                <form onSubmit={handleAssignSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Assign Benefit to {selectedSenior?.first_name} {selectedSenior?.last_name}
                    </h2>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700">Benefit</label>
                        <select
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={data.benefit_id}
                            onChange={(e) => setData('benefit_id', e.target.value)}
                            required
                        >
                            <option value="">Select a benefit</option>
                            {benefits.filter(
                                benefit => !selectedSenior?.benefits.some(sb => sb.id === benefit.id)
                            ).map(benefit => (
                                <option key={benefit.id} value={benefit.id}>{benefit.name}</option>
                            ))}
                        </select>
                        {errors.benefit_id && <p className="mt-1 text-sm text-red-600">{errors.benefit_id}</p>}
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Date Received</label>
                        <input
                            type="date"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={data.date_received}
                            onChange={(e) => setData('date_received', e.target.value)}
                            required
                        />
                        {errors.date_received && <p className="mt-1 text-sm text-red-600">{errors.date_received}</p>}
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Remarks</label>
                        <textarea
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={data.remarks}
                            onChange={(e) => setData('remarks', e.target.value)}
                            rows="3"
                        />
                        {errors.remarks && <p className="mt-1 text-sm text-red-600">{errors.remarks}</p>}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeAssignModal} className="mr-2">Cancel</SecondaryButton>
                        <PrimaryButton type="submit" disabled={processing}>Assign</PrimaryButton>
                    </div>
                </form>
            </Modal>
            
            {/* Remove Benefit Modal */}
            <Modal show={showRemoveModal} onClose={closeRemoveModal}>
                <form onSubmit={handleRemoveSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Remove Benefit
                    </h2>

                    <p className="mt-3 text-sm text-gray-600">
                        Are you sure you want to remove "{selectedBenefit?.name}" from {selectedSenior?.first_name} {selectedSenior?.last_name}?
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeRemoveModal} className="mr-2">Cancel</SecondaryButton>
                        <DangerButton type="submit" disabled={removeProcessing}>Remove</DangerButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
