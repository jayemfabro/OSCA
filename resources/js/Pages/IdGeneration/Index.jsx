import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import { useState } from 'react';

export default function Index({ seniors, filters, auth }) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [barangayFilter, setBarangayFilter] = useState(filters.barangay || '');
    const [selectedSeniors, setSelectedSeniors] = useState([]);
    const [showBatchModal, setShowBatchModal] = useState(false);
    
    const search = (e) => {
        e.preventDefault();
        window.location = route('id-generation.index', { 
            search: searchQuery,
            barangay: barangayFilter,
        });
    };

    const clearFilters = () => {
        setSearchQuery('');
        setBarangayFilter('');
        window.location = route('id-generation.index');
    };
    
    const toggleSelectSenior = (seniorId) => {
        if (selectedSeniors.includes(seniorId)) {
            setSelectedSeniors(selectedSeniors.filter(id => id !== seniorId));
        } else {
            setSelectedSeniors([...selectedSeniors, seniorId]);
        }
    };
    
    const selectAll = () => {
        const allIds = seniors.data.map(senior => senior.id);
        setSelectedSeniors(allIds);
    };
    
    const deselectAll = () => {
        setSelectedSeniors([]);
    };
    
    const openBatchModal = () => {
        if (selectedSeniors.length === 0) {
            alert('Please select at least one senior citizen');
            return;
        }
        setShowBatchModal(true);
    };
    
    const closeBatchModal = () => {
        setShowBatchModal(false);
    };      const printBatchIds = () => {
        const url = route('id-generation.batch-print') + '?' + new URLSearchParams({
            ids: selectedSeniors.join(',')
        }).toString();
        
        // Open in new tab
        const win = window.open('about:blank', '_blank');
        if (win) {
            win.location.href = url;
        }
        
        closeBatchModal();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    ID Generation
                </h2>
            }
        >
            <Head title="ID Generation" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">                            <div className="mb-6 flex items-center justify-between">
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
                                            <option value="Barangay 1">Barangay 1</option>
                                            <option value="Barangay 2">Barangay 2</option>
                                            <option value="Barangay 3">Barangay 3</option>
                                            {/* More barangays can be added here */}
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
                                  <button
                                    onClick={openBatchModal}
                                    className="ml-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-indigo-500"
                                >
                                    Batch Print IDs
                                </button>
                            </div>
                            
                            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {seniors.data.length > 0 ? (
                                    seniors.data.map((senior) => (                                        <div key={senior.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                                            <div className="p-4">
                                                <div className="mb-1 flex justify-end">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedSeniors.includes(senior.id)}
                                                        onChange={() => toggleSelectSenior(senior.id)}
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                </div>
                                                <div className="mb-2 flex items-center justify-center">
                                                    {senior.photo_path ? (
                                                        <img
                                                            src={`/storage/${senior.photo_path}`}
                                                            alt={`${senior.first_name} ${senior.last_name}`}
                                                            className="h-24 w-24 rounded-full object-cover"
                                                        />
                                                    ) : (                                                        <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gray-200 text-gray-600">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            <Link 
                                                                href={route('seniors.edit', senior.id)} 
                                                                className="text-xs text-indigo-600 hover:text-indigo-800"
                                                            >
                                                                Upload Photo
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="text-center">
                                                    <h3 className="text-md font-medium text-gray-900 truncate">
                                                        {`${senior.first_name} ${senior.last_name}`}
                                                    </h3>                                                    <p className="text-xs text-gray-500">ID: {senior.senior_citizen_id}</p>
                                                    <p className="text-xs text-gray-500">{typeof senior.barangay === 'string' ? senior.barangay : senior.barangay?.name || ''}</p>
                                                </div>
                                                <div className="mt-4 flex items-center justify-center space-x-2">
                                                    <Link
                                                        href={route('id-generation.edit', senior.id)}
                                                        className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-3 py-2 text-xs font-medium text-indigo-700 hover:bg-indigo-200"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-3 3h6a3.001 3.001 0 00-3-3z" />
                                                        </svg>
                                                        Edit/Print ID
                                                    </Link>
                                                    <Link
                                                        href={route('id-generation.print', senior.id)}
                                                        className="inline-flex items-center rounded-md border border-transparent bg-green-100 px-3 py-2 text-xs font-medium text-green-700 hover:bg-green-200"
                                                        target="_blank"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                                        </svg>
                                                        Print
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full rounded-md bg-yellow-50 p-4">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-sm font-medium text-yellow-800">No senior citizens found</h3>
                                                <div className="mt-2 text-sm text-yellow-700">
                                                    <p>No records match your search criteria. Try adjusting your filters.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="mt-6">
                                <Pagination links={seniors.links} />
                            </div>
                        </div>
                    </div>                </div>
            </div>
            
            {/* Batch Print Modal */}
            <Modal show={showBatchModal} onClose={closeBatchModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Batch Print Senior IDs
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        You are about to print {selectedSeniors.length} senior citizen IDs. This will generate a PDF document.
                    </p>
                    
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeBatchModal} className="mr-2">
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton onClick={printBatchIds}>
                            Print Selected IDs
                        </PrimaryButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
