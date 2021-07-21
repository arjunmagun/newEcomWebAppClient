import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'

export default function PaymentForm(props) {
    const [success, setSuccess] = useState(false);
    // const stripe = useStripe();
    // const element = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(props)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <fieldset className="FormRow">
                    <input type="number" />
                </fieldset>
                <button>
                    Pay {props.totalPrice} Now
                </button>
            </form>
        </div>
    )
}
