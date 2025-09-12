import useAuth from '../../../hooks/useAuth/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import { ShoppingCart, Star, DollarSign, Activity, TrendingUp } from "lucide-react";

const UserHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: usersInfo = {}, isLoading } = useQuery({
        queryKey: ['users-stats', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users-stats/${user.email}`);
            return res.data;
        }
    });

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const StatCard = ({ icon: Icon, title, value, color, bgGradient }) => (
        <div className={`relative overflow-hidden rounded-2xl p-8 text-white shadow-xl ${bgGradient}
                        transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
                        group cursor-pointer`}>
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10 transform translate-x-8 -translate-y-8">
                <Icon size={128} />
            </div>
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm`}>
                        <Icon className="w-8 h-8" />
                    </div>
                    <div className="flex items-center space-x-1 opacity-75">
                        <TrendingUp size={16} />
                        <span className="text-xs font-medium">Active</span>
                    </div>
                </div>
                <h3 className="text-sm font-medium opacity-90 mb-2">{title}</h3>
                <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold tracking-tight">
                        {isLoading ? '...' : value}
                    </span>
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 rounded-lg w-64 mb-8"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            <div className="bg-gray-300 rounded-2xl h-80"></div>
                            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-gray-300 rounded-2xl h-48"></div>
                                ))}
                            </div>
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
                            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                                {getGreeting()}, {user?.displayName?.split(' ')[0] || 'User'}! 👋
                            </h1>
                            <p className="text-slate-600 mt-1 font-medium">
                                Welcome back to your dashboard
                            </p>
                        </div>
                        <div className="hidden md:flex items-center space-x-2 text-sm text-slate-500">
                            <Activity size={16} />
                            <span>Dashboard Overview</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/50
                                       overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
                            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600
                                           h-24 relative">
                                <div className="absolute inset-0 bg-black/10"></div>
                            </div>
                            <div className="relative px-8 pb-8">
                                <div className="flex justify-center -mt-16 mb-6">
                                    <div className="relative">
                                        <div className="w-32 h-32 rounded-full bg-white p-2 shadow-xl">
                                            <img
                                                src={user?.photoURL}
                                                alt="User Avatar"
                                                className="w-full h-full rounded-full object-cover
                                                         ring-4 ring-white shadow-lg"
                                            />
                                        </div>
                                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500
                                                       rounded-full border-3 border-white"></div>
                                    </div>
                                </div>
                                <div className="text-center space-y-3">
                                    <h2 className="text-2xl font-bold text-slate-800">
                                        {user?.displayName || "Anonymous User"}
                                    </h2>
                                    <p className="text-slate-500 text-sm font-medium bg-slate-50
                                                px-4 py-2 rounded-full inline-block">
                                        {user?.email}
                                    </p>
                                    <div className="pt-4 border-t border-slate-100">
                                        <p className="text-xs text-slate-400 uppercase tracking-wider
                                                    font-semibold">
                                            Member Since
                                        </p>
                                        <p className="text-sm font-medium text-slate-600 mt-1">
                                            {user?.metadata?.creationTime ?
                                                new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long'
                                                }) : 'Recently'
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard
                                icon={ShoppingCart}
                                title="Total Orders"
                                value={usersInfo.totalOrders || 0}
                                bgGradient="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"
                            />
                            <StatCard
                                icon={Star}
                                title="Total Reviews"
                                value={usersInfo.totalReviews || 0}
                                bgGradient="bg-gradient-to-br from-amber-500 via-orange-600 to-red-600"
                            />
                            <StatCard
                                icon={DollarSign}
                                title="Total Spent"
                                value={`$${usersInfo.totalSpent?.toFixed(2) || '0.00'}`}
                                bgGradient="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700"
                            />
                        </div>

                        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-slate-200/50
                                       overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-100">
                                <h3 className="text-xl font-bold text-slate-800 flex items-center">
                                    <Activity className="w-5 h-5 mr-2 text-indigo-600" />
                                    Quick Stats
                                </h3>
                                <p className="text-slate-600 text-sm mt-1">
                                    Your account activity at a glance
                                </p>
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-indigo-600">
                                            {usersInfo.totalOrders > 0 ? 'Active' : 'New'}
                                        </div>
                                        <div className="text-sm text-slate-500 mt-1">Account Status</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">
                                            {usersInfo.totalReviews || 0}
                                        </div>
                                        <div className="text-sm text-slate-500 mt-1">Reviews Left</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-purple-600">
                                            {usersInfo.totalOrders ? Math.round((usersInfo.totalSpent || 0) / usersInfo.totalOrders) : 0}
                                        </div>
                                        <div className="text-sm text-slate-500 mt-1">Avg Order Value</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-orange-600">
                                            {usersInfo.totalOrders > 5 ? 'Gold' : usersInfo.totalOrders > 2 ? 'Silver' : 'Bronze'}
                                        </div>
                                        <div className="text-sm text-slate-500 mt-1">Member Tier</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
