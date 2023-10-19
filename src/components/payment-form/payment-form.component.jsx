import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentFormContainer, PFContainer } from "./payment-form.styles";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";


const PaymentForm = () => {
    //create stripe instance using stripe api hook
    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (e) => {
        e.preventDefault();
        //don't proceed if stripe isnt hooked in
        if(!stripe || !elements){
            return;
        }
        

    }
    
    return(
        <PaymentFormContainer>
            <PFContainer>
                <h2>CREDIT CARD PAYMENT: </h2>
                <CardElement />
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>PAY NOW</Button>
            </PFContainer>
        </PaymentFormContainer>
    )
};

export default PaymentForm;