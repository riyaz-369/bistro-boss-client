import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";

const CheckOutForm = () => {
  const [err, setErr] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [cart, refetch] = useCart();

  const price = cart.reduce((total, item) => total + item.price, 0);
  // console.log(price);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        price,
      });
      setClientSecret(data.clientSecret);
    };
    if (price > 0) {
      getData();
    }
  }, [price, axiosSecure]);

  // console.log(clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (card == null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setErr(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setErr("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      console.log("payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // payment complete, now save the payment in the database
        const payment = {
          email: user.email,
          price,
          transactionId: paymentIntent.id,
          date: new Date(), // convert to utc date, use moment js
          cartIds: cart.map((item) => item._id),
          menuItemIds: cart.map((item) => item.menuId),
          status: "pending",
        };

        const { data } = await axiosSecure.post("/payment", payment);
        if (data?.paymentResult?.insertedId) {
          alert("payment succeed");
          refetch();
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="border p-2 rounded-md py-4"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <p className="text-red-600">{err}</p>
      <button
        className="btn btn-sm btn-primary mt-4 w-full"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      {transactionId && (
        <p className="text-green-500">Your transaction id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckOutForm;
