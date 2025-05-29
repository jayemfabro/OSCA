import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard({ stats, analytics, recentEvents, userRole }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Stats Overview */}
                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow-sm">
                            <div className="text-sm font-medium uppercase text-gray-500">Total Senior Citizens</div>
                            <div className="mt-2 text-3xl font-bold">{stats.totalSeniors}</div>
                            <div className="mt-1 text-sm text-gray-600">
                                <span className="text-green-600">{stats.activeSeniors} Active</span> · 
                                <span className="text-gray-500"> {stats.deceasedSeniors} Deceased</span>
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow-sm">
                            <div className="text-sm font-medium uppercase text-gray-500">Activities & Events</div>
                            <div className="mt-2 text-3xl font-bold">{stats.totalEvents}</div>
                            <div className="mt-1 text-sm text-gray-600">
                                {stats.upcomingEvents} Upcoming Events
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg bg-white p-6 shadow-sm">
                            <div className="text-sm font-medium uppercase text-gray-500">Available Benefits</div>
                            <div className="mt-2 text-3xl font-bold">{stats.totalBenefits}</div>
                            <div className="mt-1 text-sm text-gray-600">
                                Types of benefits available
                            </div>
                        </div>
                    </div>

                    {/* Analytics for Admin */}
                    {userRole === 'admin' && analytics && (
                        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {/* Demographics */}
                            <div className="overflow-hidden rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold text-gray-800">Demographics</h3>                                    {/* Gender Distribution Chart */}
                                    <div className="mb-4">
                                        <h4 className="mb-2 font-medium text-gray-700">Gender Distribution</h4>
                                        <div className="h-64 rounded-md bg-gray-50 p-4">
                                            {analytics.genderDistribution && (
                                                <Doughnut
                                                    data={{
                                                        labels: analytics.genderDistribution.map(item => item.gender),
                                                        datasets: [
                                                            {
                                                                data: analytics.genderDistribution.map(item => item.total),
                                                                backgroundColor: [
                                                                    'rgba(54, 162, 235, 0.6)',
                                                                    'rgba(255, 99, 132, 0.6)',
                                                                ],
                                                                borderColor: [
                                                                    'rgba(54, 162, 235, 1)',
                                                                    'rgba(255, 99, 132, 1)',
                                                                ],
                                                                borderWidth: 1,
                                                            },
                                                        ],
                                                    }}
                                                    options={{
                                                        responsive: true,
                                                        maintainAspectRatio: false,
                                                        plugins: {
                                                            legend: {
                                                                position: 'bottom',
                                                            },
                                                            title: {
                                                                display: false,
                                                            },
                                                        },
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>                                    {/* Age Distribution Chart */}
                                    <div>
                                        <h4 className="mb-2 font-medium text-gray-700">Age Distribution</h4>
                                        <div className="h-64 rounded-md bg-gray-50 p-4">
                                            {analytics.ageDistribution && (
                                                <Bar
                                                    data={{
                                                        labels: Object.keys(analytics.ageDistribution),
                                                        datasets: [
                                                            {
                                                                label: 'Number of Seniors',
                                                                data: Object.values(analytics.ageDistribution),
                                                                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                                                borderColor: 'rgba(75, 192, 192, 1)',
                                                                borderWidth: 1,
                                                            },
                                                        ],
                                                    }}
                                                    options={{
                                                        responsive: true,
                                                        maintainAspectRatio: false,
                                                        scales: {
                                                            y: {
                                                                beginAtZero: true,
                                                                ticks: {
                                                                    precision: 0
                                                                }
                                                            }
                                                        },
                                                        plugins: {
                                                            legend: {
                                                                display: false,
                                                            },
                                                        },
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                            </div>
                            
                            {/* Registration Trends */}
                            <div className="overflow-hidden rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold text-gray-800">Registration Trends</h3>                                    {/* Monthly Registration Chart */}
                                    <div className="mb-4">
                                        <h4 className="mb-2 font-medium text-gray-700">Monthly Registrations</h4>
                                        <div className="h-64 rounded-md bg-gray-50 p-4">
                                            {analytics.monthlyRegistrations && (
                                                <Line
                                                    data={{
                                                        labels: [
                                                            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                                                        ],
                                                        datasets: [
                                                            {
                                                                label: 'New Registrations',
                                                                data: Object.values(analytics.monthlyRegistrations),
                                                                fill: false,
                                                                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                                                                borderColor: 'rgba(153, 102, 255, 1)',
                                                                tension: 0.1,
                                                            },
                                                        ],
                                                    }}
                                                    options={{
                                                        responsive: true,
                                                        maintainAspectRatio: false,
                                                        scales: {
                                                            y: {
                                                                beginAtZero: true,
                                                                ticks: {
                                                                    precision: 0
                                                                }
                                                            }
                                                        },
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>                                    {/* Barangay Distribution Chart */}
                                    <div>
                                        <h4 className="mb-2 font-medium text-gray-700">Barangay Distribution</h4>
                                        <div className="h-64 rounded-md bg-gray-50 p-4">
                                            {analytics.barangayDistribution && analytics.barangayDistribution.length > 0 && (
                                                <Bar
                                                    data={{
                                                        labels: analytics.barangayDistribution.map(item => item.barangay),
                                                        datasets: [
                                                            {
                                                                label: 'Number of Seniors',
                                                                data: analytics.barangayDistribution.map(item => item.total),
                                                                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                                                                borderColor: 'rgba(255, 159, 64, 1)',
                                                                borderWidth: 1,
                                                            },
                                                        ],
                                                    }}
                                                    options={{
                                                        responsive: true,
                                                        maintainAspectRatio: false,
                                                        indexAxis: 'y', // Horizontal bar chart
                                                        scales: {
                                                            x: {
                                                                beginAtZero: true,
                                                                ticks: {
                                                                    precision: 0
                                                                }
                                                            }
                                                        },
                                                        plugins: {
                                                            legend: {
                                                                display: false,
                                                            },
                                                        },
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                            </div>
                        </div>
                    )}

                    {/* Recent Events */}
                    <div className="overflow-hidden rounded-lg bg-white p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-800">Recent Events & Activities</h3>
                            <a href={route('events.index')} className="text-sm text-blue-600 hover:text-blue-800">
                                View All
                            </a>
                        </div>
                        
                        <div className="mt-4 overflow-hidden rounded-md border">
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
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {recentEvents.length > 0 ? (
                                        recentEvents.map((event) => (
                                            <tr key={event.id}>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-900">{event.title}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="text-sm text-gray-500">
                                                        {new Date(event.start_date).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="text-sm text-gray-500">{event.location || 'N/A'}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                                        event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                                                        event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                                                        event.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                                                No recent events
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
