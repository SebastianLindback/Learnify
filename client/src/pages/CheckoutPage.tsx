import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import agent from '../actions/agent';
import Checkout from '../components/Checkout';
import { setBasket } from '../redux/slice/basketSlice';
import { useAppDispatch } from '../redux/store/ConfigureStore';

const stripePromise = loadStripe('pk_test_51LmhghKIjZG8diuVbXFvb969e6FbNizlvAJkieeAaR7y9yBcvEmWk4E4oH3xU5OQwD0ZVfA1tmGQv9b0ofKgUFZt00uugg1jtQ');

export default function CheckoutPage() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    agent.Payments.paymentIntent()
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error));
  }, [dispatch]);
  
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
}