import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import SeniorIdCard from '@/Components/SeniorIdCard';

export default function Edit({ auth, senior }) {
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    
    useEffect(() => {
        // Generate QR code on component mount
        generateQrCode();
    }, []);

    const generateQrCode = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(route('id-generation.qrcode', senior.id));
            const data = await response.json();
            setQrCodeUrl(data.qr_code_url);
            setIsLoading(false);
        } catch (error) {
            console.error('Error generating QR code:', error);
            setIsLoading(false);
        }
    };

    const handlePrint = () => {
        window.location.href = route('id-generation.print', senior.id);
    };

    const togglePreviewMode = () => {
        setPreviewMode(!previewMode);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    ID Customization - {senior.first_name} {senior.last_name}
                </h2>
            }
        >
            <Head title="ID Customization" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4 flex justify-between">
                                <Link href={route('id-generation.index')}>
                                    <SecondaryButton>Back to List</SecondaryButton>
                                </Link>
                                <div className="space-x-2">
                                    <PrimaryButton
                                        onClick={togglePreviewMode}
                                        className="ml-2"
                                    >
                                        {previewMode ? 'Edit Mode' : 'Preview Mode'}
                                    </PrimaryButton>
                                    <PrimaryButton
                                        onClick={handlePrint}
                                        disabled={isLoading || !qrCodeUrl}
                                        className="ml-2"
                                    >
                                        {isLoading ? 'Loading...' : 'Generate PDF'}
                                    </PrimaryButton>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="mb-4 text-lg font-medium">Senior Citizen ID Preview</h3>
                                    {isLoading ? (
                                        <div className="flex h-64 items-center justify-center">
                                            <span className="text-gray-500">Loading QR code...</span>
                                        </div>
                                    ) : (
                                        <SeniorIdCard 
                                            senior={senior}
                                            qrCodeUrl={qrCodeUrl}
                                            previewMode={previewMode}
                                        />
                                    )}
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="mb-4 text-lg font-medium">Senior Citizen Information</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <span className="block text-sm font-medium text-gray-700">ID Number:</span>
                                            <span className="mt-1 block">{senior.senior_citizen_id}</span>
                                        </div>
                                        <div>
                                            <span className="block text-sm font-medium text-gray-700">Name:</span>
                                            <span className="mt-1 block">{senior.first_name} {senior.middle_name ? `${senior.middle_name.charAt(0)}. ` : ''}{senior.last_name}{senior.suffix ? ` ${senior.suffix}` : ''}</span>
                                        </div>
                                        <div>
                                            <span className="block text-sm font-medium text-gray-700">Birth Date:</span>
                                            <span className="mt-1 block">{new Date(senior.birth_date).toLocaleDateString()}</span>
                                        </div>
                                        <div>
                                            <span className="block text-sm font-medium text-gray-700">Address:</span>
                                            <span className="mt-1 block">{senior.address}, Brgy. {senior.barangay}</span>
                                        </div>
                                        <div>
                                            <span className="block text-sm font-medium text-gray-700">Contact:</span>
                                            <span className="mt-1 block">{senior.contact_number || 'Not provided'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
