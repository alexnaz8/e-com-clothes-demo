import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeChekoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = "pk_test_mJGd7MmZ18ZbWPVwqvsQXm9K00ALasVepu";
    const onToken = token => {
        console.log(token);
        alert("Payment Successfull");
    };
    return (
        <StripeCheckout
            label="Pay Now"
            name="Demo CRWN Clothes"
            billingAddress
            shippingAddress
            image="https://sendeyo.com/up/d/f3eb2117da"
            description={`You total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeChekoutButton;
