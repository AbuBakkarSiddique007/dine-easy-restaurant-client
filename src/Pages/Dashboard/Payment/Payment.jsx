import SectionTitles from "../../../Components/SectionTitles/SectionTitles";
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from "./CheckoutForm";

// TODO: provide the publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
    return (
        <div>
            <SectionTitles
                heading="Complete Your Purchase"
                subHeading="Enter your payment details to finalize your order."
            ></SectionTitles>

            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>

                </Elements>

            </div>

        </div>
    );
};

export default Payment;
