import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        location: '',
        status: 'upcoming',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('events.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Event
                </h2>
            }
        >
            <Head title="Create Event" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <InputLabel htmlFor="title" value="Event Title" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="description" value="Description" />
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description || ''}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        rows="4"
                                        onChange={(e) => setData('description', e.target.value)}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="mb-4">
                                        <InputLabel htmlFor="start_date" value="Start Date" />
                                        <TextInput
                                            id="start_date"
                                            type="date"
                                            name="start_date"
                                            value={data.start_date}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('start_date', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.start_date} className="mt-2" />
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel htmlFor="end_date" value="End Date (optional)" />
                                        <TextInput
                                            id="end_date"
                                            type="date"
                                            name="end_date"
                                            value={data.end_date || ''}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('end_date', e.target.value)}
                                        />
                                        <InputError message={errors.end_date} className="mt-2" />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="location" value="Location" />
                                    <TextInput
                                        id="location"
                                        type="text"
                                        name="location"
                                        value={data.location || ''}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('location', e.target.value)}
                                    />
                                    <InputError message={errors.location} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="status" value="Event Status" />
                                    <select
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        onChange={(e) => setData('status', e.target.value)}
                                        required
                                    >
                                        <option value="upcoming">Upcoming</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Link href={route('events.index')}>
                                        <SecondaryButton className="ml-4" type="button">
                                            Cancel
                                        </SecondaryButton>
                                    </Link>
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Create Event
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
