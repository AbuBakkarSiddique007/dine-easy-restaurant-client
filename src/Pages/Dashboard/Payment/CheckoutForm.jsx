import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import useCart from '../../../hooks/useCart/useCart';
import useAuth from '../../../hooks/useAuth/useAuth';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const axiosSecure = useAxiosSecure()
    const [cart, refetch] = useCart()
    const { user } = useAuth()
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const navigate = useNavigate()

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post("/create-payment-intent", { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])

    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }

        // confirm card payment:
        // https://docs.stripe.com/js/payment_intents/confirm_card_payment

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error');

        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('Transaction Id', paymentIntent.id);
                setTransactionId(paymentIntent.id)

                // Now save the payment history in db
                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment)
                refetch()
                // console.log('payment save', res.data);
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment Successful.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/payment-history')
                }



            }
        }


    }

    return (
        <div className='bg-gray-50 flex items-center justify-center p-4' >
            <div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-lg'>
                <form
                    onSubmit={handleSubmit}
                    className='space-y-6'
                >
                    <div className='border border-gray-300 rounded-md p-4 bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200'>
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        color: '#9e2146',
                                    },
                                },
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!stripe || !clientSecret}

                        className='w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'
                    >
                        Pay
                    </button>
                    <p className='text-lg text-red-500'>
                        {error}
                    </p>
                    {
                        transactionId && <p> Your transaction Id: {transactionId} </p>
                    }
                </form>
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        🔒 Your payment information is secure and encrypted
                    </p>
                </div>
            </div>
        </div >
    );
};

export default CheckoutForm;
