import { FaBus, FaUsers, FaWallet } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { MdFastfood } from 'react-icons/md';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Pie, PieChart, Legend, Tooltip } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8A2BE2', '#FF69B4'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
            return res.data
        }
    })

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats')
            return res.data
        }
    })

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

    return (
        <div className="p-4">
            <h1 className='text-3xl mb-6 font-bold'>
                <span>Hi, Welcome </span>
                {user?.displayName || 'Back!'}
            </h1>

            {/* Stats Cards */}
            <div className="mb-8">
                <div className="stats shadow w-full">
                    <div className="stat place-items-center">
                        <div className="stat-figure text-primary">
                            <FaWallet className='text-3xl' />
                        </div>
                        <div className="stat-title">Revenue</div>
                        <div className="stat-value text-primary">
                            ${stats?.revenue?.toFixed(2) || '0.00'}
                        </div>
                        <div className="stat-desc">Total earnings</div>
                    </div>

                    <div className="stat place-items-center">
                        <div className="stat-figure text-secondary">
                            <FaUsers className='text-3xl' />
                        </div>
                        <div className="stat-title">Customers</div>
                        <div className="stat-value text-secondary">
                            {stats?.users || 0}
                        </div>
                        <div className="stat-desc">Registered users</div>
                    </div>

                    <div className="stat place-items-center">
                        <div className="stat-figure text-accent">
                            <MdFastfood className='text-3xl' />
                        </div>
                        <div className="stat-title">Products</div>
                        <div className="stat-value text-accent">
                            {stats?.menuItems || 0}
                        </div>
                        <div className="stat-desc">Menu items</div>
                    </div>

                    <div className="stat place-items-center">
                        <div className="stat-figure text-info">
                            <FaBus className='text-3xl' />
                        </div>
                        <div className="stat-title">Orders</div>
                        <div className="stat-value text-info">
                            {stats?.orders || 0}
                        </div>
                        <div className="stat-desc">Total orders</div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className='flex flex-col lg:flex-row gap-8'>
                {/* Bar Chart */}
                <div className='w-full lg:w-1/2'>
                    <h2 className="text-xl font-semibold mb-4">Sales by Category</h2>
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                            dataKey="quantity"
                            fill="#8884d8"
                            shape={<TriangleBar />}
                            label={{ position: 'top' }}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>

                {/* Pie Chart */}
                <div className='w-full lg:w-1/2'>
                    <h2 className="text-xl font-semibold mb-4">Revenue Distribution</h2>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Revenue']} />
                        <Legend />
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
