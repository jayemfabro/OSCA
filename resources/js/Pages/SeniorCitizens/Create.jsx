import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState, useEffect } from 'react';

export default function Create() {
    const [ageMessage, setAgeMessage] = useState('');
    const [isValidAge, setIsValidAge] = useState(false);
    
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix: '',
        birth_date: '',
        place_of_birth: '',
        gender: '',
        nationality: 'Filipino',
        civil_status: '',
        address: '',
        barangay: '',
        contact_number: '',
        emergency_contact_name: '',
        emergency_contact_number: '',
        photo: null,
        birth_certificate: null,
    });

    const [photoPreview, setPhotoPreview] = useState(null);    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate age before submitting
        if (!isValidAge) {
            alert('The senior citizen must be at least 60 years old to register.');
            return;
        }
        
        // Create FormData for file uploads
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (data[key] !== null) {
                formData.append(key, data[key]);
            }
        });
        
        post(route('seniors.store'), formData);
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
    };    const handleFileChange = (e, field) => {
        setData(field, e.target.files[0]);
    };
    
    // Calculate age based on birth date
    useEffect(() => {
        if (data.birth_date) {
            const birthDate = new Date(data.birth_date);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            if (age < 60) {
                setAgeMessage(`Age: ${age} years (must be at least 60 years old)`);
                setIsValidAge(false);
            } else {
                setAgeMessage(`Age: ${age} years ✓`);
                setIsValidAge(true);
            }
        } else {
            setAgeMessage('');
            setIsValidAge(false);
        }
    }, [data.birth_date]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Senior Citizen Registration
                </h2>
            }
        >
            <Head title="Senior Citizen Registration" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-800">
                                <p className="mb-2 font-medium">Registration Information</p>
                                <p className="text-sm">
                                    Registering a senior citizen will automatically:
                                </p>
                                <ul className="ml-6 mt-2 list-disc text-sm">
                                    <li>Add them to the Senior Citizens Masterlist</li>
                                    <li>Make them eligible for ID Generation</li>
                                    <li>Enable tracking of their benefits</li>
                                    <li>Allow them to participate in events and activities</li>
                                </ul>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                                    </div>                                    <div>                                        <InputLabel htmlFor="birth_date" value="Birth Date" />
                                        <TextInput
                                            id="birth_date"
                                            type="date"
                                            name="birth_date"
                                            value={data.birth_date}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('birth_date', e.target.value)}
                                            required
                                            max={new Date(new Date().getFullYear() - 60, new Date().getMonth(), new Date().getDate()).toISOString().split('T')[0]}
                                        />
                                        <div className="mt-1 text-sm">
                                            {ageMessage ? (
                                                <span className={isValidAge ? "text-green-600" : "text-red-500"}>
                                                    {ageMessage}
                                                </span>
                                            ) : (
                                                <span className="text-gray-500">
                                                    Senior must be at least 60 years old
                                                </span>
                                            )}
                                        </div>
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

                                    {/* Documents and Photo */}
                                    <div className="space-y-4 md:col-span-2 lg:col-span-3">
                                        <h3 className="text-lg font-medium">Documents and Photo</h3>
                                        <div className="h-px bg-gray-200"></div>
                                    </div>                                    <div>
                                        <InputLabel htmlFor="photo" value="Photo" />
                                        <input
                                            id="photo"
                                            type="file"
                                            name="photo"
                                            accept="image/*"
                                            className="mt-1 block w-full rounded-md border border-gray-300 p-1 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            onChange={handlePhotoChange}
                                            required
                                        />
                                        <div className="mt-1 text-sm text-gray-500">
                                            Required: Recent 2x2 ID picture
                                        </div>
                                        <InputError message={errors.photo} className="mt-2" />
                                        {photoPreview && (
                                            <div className="mt-2">
                                                <img 
                                                    src={photoPreview} 
                                                    alt="Preview" 
                                                    className="h-32 w-32 rounded-full object-cover" 
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="birth_certificate" value="Birth Certificate" />
                                        <input
                                            id="birth_certificate"
                                            type="file"
                                            name="birth_certificate"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            className="mt-1 block w-full rounded-md border border-gray-300 p-1 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            onChange={(e) => handleFileChange(e, 'birth_certificate')}
                                            required
                                        />
                                        <div className="mt-1 text-sm text-gray-500">
                                            Required: Birth certificate or any valid ID
                                        </div>
                                        <InputError message={errors.birth_certificate} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-4 pt-4">
                                    <a
                                        href={route('seniors.index')}
                                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25"
                                    >
                                        Cancel
                                    </a>
                                    <PrimaryButton disabled={processing || !isValidAge}>
                                        Complete Registration
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
