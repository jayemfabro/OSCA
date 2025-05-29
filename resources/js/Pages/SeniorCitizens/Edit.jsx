import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link } from '@inertiajs/react';

export default function Edit({ auth, senior }) {
    const [photoPreview, setPhotoPreview] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        first_name: senior.first_name || '',
        middle_name: senior.middle_name || '',
        last_name: senior.last_name || '',
        suffix: senior.suffix || '',
        birth_date: senior.birth_date || '',
        place_of_birth: senior.place_of_birth || '',
        gender: senior.gender || '',
        nationality: senior.nationality || 'Filipino',
        civil_status: senior.civil_status || '',
        address: senior.address || '',
        barangay: senior.barangay || '',
        contact_number: senior.contact_number || '',
        emergency_contact_name: senior.emergency_contact_name || '',
        emergency_contact_number: senior.emergency_contact_number || '',
        photo: undefined,  // Changed to undefined for uncontrolled file input
        _method: 'PATCH'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('seniors.update', senior.id));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setData('photo', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPhotoPreview(null);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Senior Citizen
                </h2>
            }
        >
            <Head title="Edit Senior Citizen" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {/* Photo Upload Section */}
                                    <div className="md:col-span-2 lg:col-span-3">
                                        <div className="mb-6 flex items-center">
                                            <div className="mr-6">
                                                {photoPreview ? (
                                                    <img 
                                                        src={photoPreview} 
                                                        alt="Preview" 
                                                        className="h-32 w-32 rounded-full object-cover" 
                                                    />
                                                ) : senior.photo_path ? (
                                                    <img
                                                        src={`/storage/${senior.photo_path}`}
                                                        alt={`${senior.first_name} ${senior.last_name}`}
                                                        className="h-32 w-32 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gray-200">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <InputLabel htmlFor="photo" value="Photo" />
                                                <input
                                                    id="photo"
                                                    type="file"
                                                    name="photo"
                                                    accept="image/*"
                                                    className="mt-1 block w-full rounded-md border border-gray-300 p-1 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                    onChange={handlePhotoChange}
                                                />
                                                <div className="mt-1 text-sm text-gray-500">
                                                    Upload a 2x2 ID picture (Optional)
                                                </div>
                                                <InputError message={errors.photo} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Personal Information */}
                                    <div className="space-y-4 md:col-span-2 lg:col-span-3">
                                        <h3 className="text-lg font-medium">Personal Information</h3>
                                        <div className="h-px bg-gray-200"></div>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="first_name" value="First Name" />
                                        <TextInput
                                            id="first_name"
                                            type="text"
                                            name="first_name"
                                            value={data.first_name}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.first_name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="middle_name" value="Middle Name" />
                                        <TextInput
                                            id="middle_name"
                                            type="text"
                                            name="middle_name"
                                            value={data.middle_name}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('middle_name', e.target.value)}
                                        />
                                        <InputError message={errors.middle_name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="last_name" value="Last Name" />
                                        <TextInput
                                            id="last_name"
                                            type="text"
                                            name="last_name"
                                            value={data.last_name}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.last_name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="suffix" value="Suffix (Jr., Sr., etc.)" />
                                        <TextInput
                                            id="suffix"
                                            type="text"
                                            name="suffix"
                                            value={data.suffix}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('suffix', e.target.value)}
                                        />
                                        <InputError message={errors.suffix} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="birth_date" value="Birth Date" />
                                        <TextInput
                                            id="birth_date"
                                            type="date"
                                            name="birth_date"
                                            value={data.birth_date}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('birth_date', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.birth_date} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="place_of_birth" value="Place of Birth" />
                                        <TextInput
                                            id="place_of_birth"
                                            type="text"
                                            name="place_of_birth"
                                            value={data.place_of_birth}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('place_of_birth', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.place_of_birth} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="gender" value="Gender" />
                                        <select
                                            id="gender"
                                            name="gender"
                                            value={data.gender}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            onChange={(e) => setData('gender', e.target.value)}
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                        <InputError message={errors.gender} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="nationality" value="Nationality" />
                                        <TextInput
                                            id="nationality"
                                            type="text"
                                            name="nationality"
                                            value={data.nationality}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('nationality', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.nationality} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="civil_status" value="Civil Status" />
                                        <select
                                            id="civil_status"
                                            name="civil_status"
                                            value={data.civil_status}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            onChange={(e) => setData('civil_status', e.target.value)}
                                            required
                                        >
                                            <option value="">Select Civil Status</option>
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                            <option value="Widowed">Widowed</option>
                                            <option value="Separated">Separated</option>
                                            <option value="Divorced">Divorced</option>
                                        </select>
                                        <InputError message={errors.civil_status} className="mt-2" />
                                    </div>

                                    {/* Contact Information */}
                                    <div className="space-y-4 md:col-span-2 lg:col-span-3">
                                        <h3 className="text-lg font-medium">Contact Information</h3>
                                        <div className="h-px bg-gray-200"></div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <InputLabel htmlFor="address" value="Address" />
                                        <TextInput
                                            id="address"
                                            type="text"
                                            name="address"
                                            value={data.address}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('address', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.address} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="barangay" value="Barangay" />
                                        <TextInput
                                            id="barangay"
                                            type="text"
                                            name="barangay"
                                            value={data.barangay}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('barangay', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.barangay} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="contact_number" value="Contact Number" />
                                        <TextInput
                                            id="contact_number"
                                            type="text"
                                            name="contact_number"
                                            value={data.contact_number}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('contact_number', e.target.value)}
                                        />
                                        <InputError message={errors.contact_number} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="emergency_contact_name" value="Emergency Contact Name" />
                                        <TextInput
                                            id="emergency_contact_name"
                                            type="text"
                                            name="emergency_contact_name"
                                            value={data.emergency_contact_name}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('emergency_contact_name', e.target.value)}
                                        />
                                        <InputError message={errors.emergency_contact_name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="emergency_contact_number" value="Emergency Contact Number" />
                                        <TextInput
                                            id="emergency_contact_number"
                                            type="text"
                                            name="emergency_contact_number"
                                            value={data.emergency_contact_number}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('emergency_contact_number', e.target.value)}
                                        />
                                        <InputError message={errors.emergency_contact_number} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-4 border-t pt-4">
                                    <Link
                                        href={route('id-generation.print', senior.id)}
                                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition hover:bg-gray-50"
                                        target="_blank"
                                    >
                                        Export ID
                                    </Link>
                                    <Link
                                        href={route('seniors.show', senior.id)}
                                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition hover:bg-gray-50"
                                    >
                                        Cancel
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'Saving...' : 'Save Changes'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
