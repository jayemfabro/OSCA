import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function SeniorRegistration({ auth, barangays }) {
    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        middle_name: '',
        last_name: '',
        suffix: '',
        birth_date: '',
        gender: '',
        civil_status: '',
        address: '',
        contact_number: '',
        barangay_id: '',
        emergency_contact_name: '',
        emergency_contact_number: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('seniors.registration.store'), {
            onSuccess: () => {
                // Redirect will happen automatically based on server response
                // No need to use router.push here
            },
            preserveScroll: true,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Senior Citizen Registration</h2>}
        >
            <Head title="Senior Registration" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Personal Information */}
                                    <div>
                                        <InputLabel htmlFor="first_name" value="First Name" />
                                        <TextInput
                                            id="first_name"
                                            name="first_name"
                                            value={data.first_name}
                                            className="mt-1 block w-full"
                                            onChange={handleChange}
                                            required
                                        />
                                        <InputError message={errors.first_name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="middle_name" value="Middle Name" />
                                        <TextInput
                                            id="middle_name"
                                            name="middle_name"
                                            value={data.middle_name}
                                            className="mt-1 block w-full"
                                            onChange={handleChange}
                                        />
                                        <InputError message={errors.middle_name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="last_name" value="Last Name" />
                                        <TextInput
                                            id="last_name"
                                            name="last_name"
                                            value={data.last_name}
                                            className="mt-1 block w-full"
                                            onChange={handleChange}
                                            required
                                        />
                                        <InputError message={errors.last_name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="suffix" value="Suffix" />
                                        <TextInput
                                            id="suffix"
                                            name="suffix"
                                            value={data.suffix}
                                            className="mt-1 block w-full"
                                            onChange={handleChange}
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
                                            onChange={handleChange}
                                            required
                                        />
                                        <InputError message={errors.birth_date} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="gender" value="Gender" />
                                        <select
                                            id="gender"
                                            name="gender"
                                            value={data.gender}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                        <InputError message={errors.gender} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="civil_status" value="Civil Status" />
                                        <select
                                            id="civil_status"
                                            name="civil_status"
                                            value={data.civil_status}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Civil Status</option>
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                            <option value="Widowed">Widowed</option>
                                            <option value="Divorced">Divorced</option>
                                            <option value="Separated">Separated</option>
                                        </select>
                                        <InputError message={errors.civil_status} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="barangay_id" value="Barangay" />
                                        <select
                                            id="barangay_id"
                                            name="barangay_id"
                                            value={data.barangay_id}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select Barangay</option>
                                            {barangays?.map((barangay) => (
                                                <option key={barangay.id} value={barangay.id}>
                                                    {barangay.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.barangay_id} className="mt-2" />
                                    </div>

                                    <div className="col-span-2">
                                        <InputLabel htmlFor="address" value="Complete Address" />
                                        <TextInput
                                            id="address"
                                            name="address"
                                            value={data.address}
                                            className="mt-1 block w-full"
                                            onChange={handleChange}
                                            required
                                        />
                                        <InputError message={errors.address} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="contact_number" value="Contact Number" />
                                        <TextInput
                                            id="contact_number"
                                            name="contact_number"
                                            value={data.contact_number}
                                            className="mt-1 block w-full"
                                            onChange={handleChange}
                                        />
                                        <InputError message={errors.contact_number} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="emergency_contact_name" value="Emergency Contact Name" />
                                        <TextInput
                                            id="emergency_contact_name"
                                            name="emergency_contact_name"
                                            value={data.emergency_contact_name}
                                            className="mt-1 block w-full"
                                            onChange={handleChange}
                                        />
                                        <InputError message={errors.emergency_contact_name} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="emergency_contact_number" value="Emergency Contact Number" />
                                        <TextInput
                                            id="emergency_contact_number"
                                            name="emergency_contact_number"
                                            value={data.emergency_contact_number}
                                            className="mt-1 block w-full"
                                            onChange={handleChange}
                                        />
                                        <InputError message={errors.emergency_contact_number} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-6">
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        {processing ? 'Registering...' : 'Register Senior Citizen'}
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
