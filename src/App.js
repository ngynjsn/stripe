import React, { useState, useEffect } from 'react';
import SubscriptionCard from './SubscriptionCard';
import './App.css';
import { createCustomerPortalSession } from './server/stripeServer';
import { dynamoDBPutItem } from './server/dynamoDB';

const SUBSCRIPTION_TYPES = {
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY"
}

const ProductDisplay = () => (
  <div className='cards-container'>
    <SubscriptionCard title="Monthly Plan" subscription={SUBSCRIPTION_TYPES.MONTHLY} price="$7.00 / month" />
    <SubscriptionCard title="Yearly Plan" subscription={SUBSCRIPTION_TYPES.YEARLY} price="$70.00 / year" />
  </div>
);

const SuccessDisplay = ({ sessionId }) => {
  useEffect(() => {
    // params for dynamoDBPutItem: (uid, userEmail, subscriptionType, licenseExpiryDate, trialPeriod)
    dynamoDBPutItem("12345678", "nguyen.j1305@gmail.com", SUBSCRIPTION_TYPES.MONTHLY, "2022-10-14", "2022-09-14")
  }, [])

  const handleBillingInformationButtonClick = () => {
    const session_id = sessionId;
    createCustomerPortalSession(session_id)
      .then((response) => {
        console.log(response);
        window.location = response.body;
      }).catch(error => {
        console.log(error);
      })
  }

  return (
    <section>
      <div className="product Box-root">
        <div className="description Box-root">
          <h3>Subscription to starter plan successful!</h3>
        </div>
      </div>
      <button onClick={handleBillingInformationButtonClick} type="submit">
        Manage your billing information
      </button>
    </section>
  );
};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }

    if (query.get('billing')) {
      console.log("show page to update billing information");
    }
  }, [sessionId]);

  if (!success && message === '') {
    return <ProductDisplay />;
  } else if (success && sessionId !== '') {
    return <SuccessDisplay sessionId={sessionId} />;
  } else {
    return (
      <div>
        <Message message={message} />;
        <button onClick={() => { window.location = 'http://localhost:3000' }}>
          Return to shop
        </button>
      </div>
    )
  }
}