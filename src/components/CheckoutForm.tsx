import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { errorNotification } from "../config/notification";
import { Button, Card, Divider } from "antd";
import { createIntent } from "../services/Payment";
import { useMutation } from "@tanstack/react-query";
const stripePromise = loadStripe(
  "pk_test_51OtaEARoV1dehEh0ezBGnnHCJ9WIVspwTq2HmVAZVjlCRcDLPe5sEsG6qAlo2FWvKyNivNencRPzautQa88LPQcm0035G6STPD"
);

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const  REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${REACT_APP_BASE_URL}/orders/checkout/success`,
      },
    });

    if (result.error) {
      errorNotification("Error", result.error.message ?? "An error occurred");
    }
  };

  return (
    <div id="checkout-page">
      <Card title="Payment" >
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <Divider />
        <Button disabled={!stripe} htmlType="submit" >
          Pay
        </Button>
      </form>
      </Card>
    </div>
  );
};

interface StripeProps {
  totalPrice: number;
}

const StripeTest: React.FC<StripeProps> = ({ totalPrice }) => {
  const [clientSecret, setClientSecret] = React.useState<string>("");

  const intentMutation = useMutation({
    mutationFn: createIntent,
    onSuccess: (data) => {
      setClientSecret(data.client_secret);
    },
    onError: () => {
      errorNotification("Error", "An error occurred while creating the payment intent");
    },
  });


  React.useEffect(() => {
    const amountInCents = Math.round(totalPrice * 100);
    const mutationData = {
      amount: amountInCents,
      currency: "try",
      paymentMethodTypes: ["card"],
    };
    intentMutation.mutate(mutationData);
  }, [intentMutation, totalPrice]);
  
  const options = {
    clientSecret: clientSecret,
  };

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm />
        </Elements>
      )}
    </>
  );
};

export default StripeTest;
