import { FaBus, FaUsers, FaWallet } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdFastfood } from 'react-icons/md';
import { Activity, TrendingUp, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Pie, PieChart, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8A2BE2', '#FF69B4'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading: statsLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    const { data: chartData = [], isLoading: chartLoading } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats');
            return res.data;
        }
    });

    // Custom shape for bar chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    // Custom label for pie chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize="12"
                fontWeight="bold"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    // Pie chart data
    const pieChartData = chartData.map(data => ({
        name: data.category || 'Unknown',
        value: data.revenue || 0
    }));

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const StatCard = ({ icon: Icon, title, value, description, color, bgGradient, isLoading }) => (
        <div className={`relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl ${bgGradient}
                        transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl
                        group cursor-pointer border border-white/20`}>
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10 transform translate-x-4 -translate-y-4">
                <Icon size={96} />
            </div>
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                        <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex items-center space-x-1 opacity-75">
                        <TrendingUp size={16} />
                        <span className="text-xs font-medium">Live</span>
                    </div>
                </div>
                <h3 className="text-sm font-medium opacity-90 mb-3 tracking-wide uppercase">
                    {title}
                </h3>
                <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-4xl font-bold tracking-tight">
                        {isLoading ? '...' : value}
                    </span>
                </div>
                <p className="text-sm opacity-80 font-medium">{description}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent
                           opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30 transform scale-x-0
                           group-hover:scale-x-100 transition-transform duration-300" />
        </div>
    );

    if (statsLoading && chartLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-10 bg-gray-300 rounded-lg w-80 mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="bg-gray-300 rounded-3xl h-48"></div>
                            ))}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-gray-300 rounded-3xl h-80"></div>
                            <div className="bg-gray-300 rounded-3xl h-80"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
                                {getGreeting()}, {user?.displayName?.split(' ')[0] || 'Admin'}! 👨‍💼
                            </h1>
                            <p className="text-slate-600 mt-2 font-medium text-lg">
                                Here's your business overview for today
                            </p>
                        </div>
                        <div className="hidden md:flex items-center space-x-2 text-sm text-slate-500
                                       bg-slate-100/80 px-4 py-2 rounded-full">
                            <Activity size={16} />
                            <span>Admin Dashboard</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                <div className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <StatCard
                            icon={FaWallet}
                            title="Revenue"
                            value={`$${stats?.revenue?.toFixed(2) || '0.00'}`}
                            description="Total earnings"
                            bgGradient="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700"
                            isLoading={statsLoading}
                        />
                        <StatCard
                            icon={FaUsers}
                            title="Customers"
                            value={stats?.users || 0}
                            description="Registered users"
                            bgGradient="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"
                            isLoading={statsLoading}
                        />
                        <StatCard
                            icon={MdFastfood}
                            title="Products"
                            value={stats?.menuItems || 0}
                            description="Menu items"
                            bgGradient="bg-gradient-to-br from-amber-500 via-orange-600 to-red-600"
                            isLoading={statsLoading}
                        />
                        <StatCard
                            icon={FaBus}
                            title="Orders"
                            value={stats?.orders || 0}
                            description="Total orders"
                            bgGradient="bg-gradient-to-br from-pink-500 via-rose-600 to-red-700"
                            isLoading={statsLoading}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-200/50
                                   overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <BarChart3 className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Sales by Category</h2>
                                    <p className="text-blue-100 text-sm font-medium">
                                        Quantity distribution across categories
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            {chartLoading ? (
                                <div className="animate-pulse">
                                    <div className="h-64 bg-gray-200 rounded-lg"></div>
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        data={chartData}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis
                                            dataKey="category"
                                            tick={{ fontSize: 12 }}
                                            tickLine={{ stroke: '#e0e0e0' }}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 12 }}
                                            tickLine={{ stroke: '#e0e0e0' }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                background: 'rgba(255, 255, 255, 0.95)',
                                                border: 'none',
                                                borderRadius: '12px',
                                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                                            }}
                                        />
                                        <Bar
                                            dataKey="quantity"
                                            fill="#8884d8"
                                            shape={<TriangleBar />}
                                            label={{ position: 'top', fontSize: 12 }}
                                            radius={[4, 4, 0, 0]}
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl border border-slate-200/50
                                   overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-700 px-8 py-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                    <PieChartIcon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Revenue Distribution</h2>
                                    <p className="text-purple-100 text-sm font-medium">
                                        Revenue breakdown by category
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 flex justify-center">
                            {chartLoading ? (
                                <div className="animate-pulse">
                                    <div className="w-64 h-64 bg-gray-200 rounded-full"></div>
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height={350}>
                                    <PieChart>
                                        <Pie
                                            data={pieChartData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={renderCustomizedLabel}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                            stroke="#fff"
                                            strokeWidth={2}
                                        >
                                            {pieChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value) => [`$${value.toFixed(2)}`, 'Revenue']}
                                            contentStyle={{
                                                background: 'rgba(255, 255, 255, 0.95)',
                                                border: 'none',
                                                borderRadius: '12px',
                                                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
                                            }}
                                        />
                                        <Legend
                                            wrapperStyle={{
                                                fontSize: '14px',
                                                fontWeight: '500'
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-white rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden">
                    <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-6">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Business Insights</h3>
                                <p className="text-slate-200 text-sm font-medium">
                                    Key performance indicators
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-600 mb-2">
                                    ${stats?.revenue && stats?.orders ? (stats.revenue / stats.orders).toFixed(2) : '0.00'}
                                </div>
                                <div className="text-sm text-slate-500 font-medium">Average Order Value</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 mb-2">
                                    {stats?.users && stats?.orders ? Math.round((stats.orders / stats.users) * 100) : 0}%
                                </div>
                                <div className="text-sm text-slate-500 font-medium">Customer Engagement</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-purple-600 mb-2">
                                    {stats?.menuItems && stats?.orders ? (stats.orders / stats.menuItems).toFixed(1) : '0.0'}
                                </div>
                                <div className="text-sm text-slate-500 font-medium">Orders per Item</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-orange-600 mb-2">
                                    {stats?.revenue > 50000 ? 'Excellent' : stats?.revenue > 20000 ? 'Good' : stats?.revenue > 5000 ? 'Average' : 'Growing'}
                                </div>
                                <div className="text-sm text-slate-500 font-medium">Business Status</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
