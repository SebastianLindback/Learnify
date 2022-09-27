import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from '../components/Checkout';

const stripePromise = loadStripe('pk_test_51LmhghKIjZG8diuVbXFvb969e6FbNizlvAJkieeAaR7y9yBcvEmWk4E4oH3xU5OQwD0ZVfA1tmGQv9b0ofKgUFZt00uugg1jtQ');

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  );
}