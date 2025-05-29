import { Head, useForm, Link } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';

export default function Index({ auth, settings }) {
    const [activeTab, setActiveTab] = useState('system');
    const [showNewUserModal, setShowNewUserModal] = useState(false);
    
    // System settings form
    const { data: systemData, setData: setSystemData, post: postSystem, processing: systemProcessing, errors: systemErrors } = useForm({
        system_name: settings.system_name || 'OSCA Management System',
        system_tagline: settings.system_tagline || 'Office of Senior Citizens Affairs',
        contact_email: settings.contact_email || '',
        contact_phone: settings.contact_phone || '',
        address: settings.address || '',
        logo: null,
        favicon: null,
    });
    
    // New user form
    const { data: userData, setData: setUserData, post: postUser, processing: userProcessing, errors: userErrors, reset: resetUserData } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'viewer',
    });
    
    const handleSystemSubmit = (e) => {        e.preventDefault();
        postSystem(route('settings.system.update'));
    };
    
    const handleNewUserSubmit = (e) => {
        e.preventDefault();
        postUser(route('settings.users.store'), {
            onSuccess: () => {
                resetUserData();
                setShowNewUserModal(false);
            },
        });
    };
    
    const openNewUserModal = () => {
        setShowNewUserModal(true);
    };
    
    const closeNewUserModal = () => {
        setShowNewUserModal(false);
        resetUserData();
    };
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Settings
                </h2>
            }
        >
            <Head title="Settings" />
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Tabs Navigation */}
                            <div className="mb-4 border-b border-gray-200">
                                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                                    <li className="mr-2">
                                        <button 
                                            onClick={() => setActiveTab('system')}
                                            className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                                activeTab === 'system' 
                                                    ? 'text-indigo-600 border-indigo-600' 
                                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                                            }`}
                                        >
                                            System Settings
                                        </button>
                                    </li>
                                    <li className="mr-2">
                                        <button 
                                            onClick={() => setActiveTab('users')}
                                            className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                                activeTab === 'users' 
                                                    ? 'text-indigo-600 border-indigo-600' 
                                                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                                            }`}
                                        >
                                            User Management
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            
                            {/* System Settings Tab */}
                            {activeTab === 'system' && (
                                <form onSubmit={handleSystemSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <InputLabel htmlFor="system_name" value="System Name" />
                                            <TextInput
                                                id="system_name"
                                                type="text"
                                                name="system_name"
                                                value={systemData.system_name}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setSystemData('system_name', e.target.value)}
                                                required
                                            />
                                            <InputError message={systemErrors.system_name} className="mt-2" />
                                        </div>
                                        
                                        <div>
                                            <InputLabel htmlFor="system_tagline" value="System Tagline" />
                                            <TextInput
                                                id="system_tagline"
                                                type="text"
                                                name="system_tagline"
                                                value={systemData.system_tagline}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setSystemData('system_tagline', e.target.value)}
                                            />
                                            <InputError message={systemErrors.system_tagline} className="mt-2" />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <InputLabel htmlFor="contact_email" value="Contact Email" />
                                            <TextInput
                                                id="contact_email"
                                                type="email"
                                                name="contact_email"
                                                value={systemData.contact_email}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setSystemData('contact_email', e.target.value)}
                                            />
                                            <InputError message={systemErrors.contact_email} className="mt-2" />
                                        </div>
                                        
                                        <div>
                                            <InputLabel htmlFor="contact_phone" value="Contact Phone" />
                                            <TextInput
                                                id="contact_phone"
                                                type="text"
                                                name="contact_phone"
                                                value={systemData.contact_phone}
                                                className="mt-1 block w-full"
                                                onChange={(e) => setSystemData('contact_phone', e.target.value)}
                                            />
                                            <InputError message={systemErrors.contact_phone} className="mt-2" />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <InputLabel htmlFor="address" value="Address" />
                                        <TextInput
                                            id="address"
                                            type="text"
                                            name="address"
                                            value={systemData.address}
                                            className="mt-1 block w-full"
                                            onChange={(e) => setSystemData('address', e.target.value)}
                                        />
                                        <InputError message={systemErrors.address} className="mt-2" />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div>
                                            <InputLabel htmlFor="logo" value="Logo" />
                                            <input
                                                id="logo"
                                                type="file"
                                                name="logo"
                                                className="mt-1 block w-full text-sm text-gray-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-md file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-indigo-50 file:text-indigo-700
                                                    hover:file:bg-indigo-100"
                                                onChange={(e) => setSystemData('logo', e.target.files[0])}
                                            />
                                            <InputError message={systemErrors.logo} className="mt-2" />
                                            {settings.logo && (
                                                <div className="mt-2">
                                                    <p className="text-xs text-gray-500">Current Logo</p>
                                                    <img 
                                                        src={`/storage/${settings.logo}`} 
                                                        alt="Current Logo" 
                                                        className="mt-1 h-10 w-auto"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div>
                                            <InputLabel htmlFor="favicon" value="Favicon" />
                                            <input
                                                id="favicon"
                                                type="file"
                                                name="favicon"
                                                className="mt-1 block w-full text-sm text-gray-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-md file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-indigo-50 file:text-indigo-700
                                                    hover:file:bg-indigo-100"
                                                onChange={(e) => setSystemData('favicon', e.target.files[0])}
                                            />
                                            <InputError message={systemErrors.favicon} className="mt-2" />
                                            {settings.favicon && (
                                                <div className="mt-2">
                                                    <p className="text-xs text-gray-500">Current Favicon</p>
                                                    <img 
                                                        src={`/storage/${settings.favicon}`} 
                                                        alt="Current Favicon" 
                                                        className="mt-1 h-8 w-auto"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end">
                                        <PrimaryButton disabled={systemProcessing}>
                                            Save System Settings
                                        </PrimaryButton>
                                    </div>
                                </form>
                            )}
                            
                            {/* User Management Tab */}
                            {activeTab === 'users' && (
                                <div>
                                    <div className="mb-4 flex justify-end">
                                        <PrimaryButton onClick={openNewUserModal}>
                                            Add New User
                                        </PrimaryButton>
                                    </div>
                                    
                                    <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                        Name
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                        Email
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                        Role
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                <tr>
                                                    <td className="px-6 py-4 text-center text-gray-500" colSpan="4">
                                                        User list will be implemented in the next phase.
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Add New User Modal */}
            <Modal show={showNewUserModal} onClose={closeNewUserModal}>
                <form onSubmit={handleNewUserSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Add New User
                    </h2>

                    <div className="mt-6">
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={userData.name}
                            className="mt-1 block w-full"
                            onChange={(e) => setUserData('name', e.target.value)}
                            required
                            autoFocus
                        />
                        <InputError message={userErrors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={userData.email}
                            className="mt-1 block w-full"
                            onChange={(e) => setUserData('email', e.target.value)}
                            required
                        />
                        <InputError message={userErrors.email} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={userData.password}
                            className="mt-1 block w-full"
                            onChange={(e) => setUserData('password', e.target.value)}
                            required
                        />
                        <InputError message={userErrors.password} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={userData.password_confirmation}
                            className="mt-1 block w-full"
                            onChange={(e) => setUserData('password_confirmation', e.target.value)}
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="role" value="Role" />
                        <select
                            id="role"
                            name="role"
                            value={userData.role}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(e) => setUserData('role', e.target.value)}
                            required
                        >
                            <option value="admin">Admin</option>
                            <option value="barangay_admin">Barangay Admin</option>
                            <option value="encoder">Encoder</option>
                            <option value="viewer">Viewer</option>
                        </select>
                        <InputError message={userErrors.role} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeNewUserModal} className="mr-2">
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton type="submit" disabled={userProcessing}>
                            Add User
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
