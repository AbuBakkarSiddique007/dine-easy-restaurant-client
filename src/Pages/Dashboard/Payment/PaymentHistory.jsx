import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import { FaMoneyCheckAlt, FaRegCreditCard } from 'react-icons/fa';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <FaMoneyCheckAlt className="text-3xl text-primary" />
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Payment History
                    </h1>
                </div>
                <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold text-lg">
                    {payments.length} {payments.length === 1 ? 'Payment' : 'Payments'}
                </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-base-300 shadow-lg bg-base-100 transition duration-300 hover:shadow-xl">
                <table className="table w-full text-sm md:text-base">
                    <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                        <tr>
                            <th className="py-3 px-2 md:px-4">#</th>
                            <th className="py-3 px-2 md:px-4">Amount</th>
                            <th className="py-3 px-2 md:px-4">Transaction ID</th>
                            <th className="py-3 px-2 md:px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length > 0 ? (
                            payments.map((payment, index) => (
                                <tr
                                    key={payment._id}
                                    className="hover:bg-base-200 transition-colors duration-200"
                                >
                                    <td className="py-2 px-2 md:px-4 font-semibold text-base-content/80">
                                        {index + 1}
                                    </td>
                                    <td className="py-2 px-2 md:px-4 font-bold text-green-600 flex items-center gap-2">
                                        <FaRegCreditCard className="text-lg" />
                                        ${Number(payment.price || 0).toFixed(2)}
                                    </td>
                                    <td className="py-2 px-2 md:px-4 break-all font-mono text-base-content/90">
                                        {payment.transactionId}
                                    </td>
                                    <td className="py-2 px-2 md:px-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold capitalize
                                                ${payment.status === 'completed'
                                                    ? 'bg-green-100 text-green-700'
                                                    : payment.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center py-10 text-base-content/70 font-medium"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <FaMoneyCheckAlt className="text-4xl text-base-content/30" />
                                        No payment history found.
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
