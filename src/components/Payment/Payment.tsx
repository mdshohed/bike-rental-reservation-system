import {loadStripe} from '@stripe/stripe-js';
import {
  Elements,

} from '@stripe/react-stripe-js';

import CheckoutForm from './CheckoutForm';

const id = import.meta.env.PAYMENT_GATEWAY_PK; 
// const stripePromise = loadStripe(import.meta.env.PAYMENT_GATEWAY_PK);
const stripePromise = loadStripe('pk_test_51L2b0xGxIFJC1OANbUH0gPXgCXdBnKy2SywsHmIvnOGkad1XXygdKhQ4NaDIPGBIVUQdqiHcnsbF535d9yWJli1x00Uaf0y01h');

const Payment = () => {  
  console.log("id", id);
  
  return (
    <div className="mx-auto container max-w-7xl p-4">
       <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
   
  );
};

export default Payment;