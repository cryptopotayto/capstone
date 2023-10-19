import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentFormContainer, PFContainer } from "./payment-form.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";


const PaymentForm = () => {
    //create stripe instance using stripe api hook
    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (e) => {
        e.preventDefault();
        if(!stripe || !elements) {
            return;
        }
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 10000 }),
        }).then((res) => {
            return res.json();
        });
        console.log(response);
    }


    return(
        <PaymentFormContainer>
            <PFContainer onSubmit={paymentHandler}>
                <h2>CREDIT CARD PAYMENT: </h2>
                <CardElement />
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>PAY NOW</Button>
            </PFContainer>
        </PaymentFormContainer>
    )
};

export default PaymentForm;