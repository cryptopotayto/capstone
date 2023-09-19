import { signInwithGooglePopup } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInwithGooglePopup();
        console.log(response); 
    }
    
    return(
        <div>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
        </div>
    );
};


export default SignIn;