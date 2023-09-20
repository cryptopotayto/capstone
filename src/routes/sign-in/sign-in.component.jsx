
import { 
    signInwithGooglePopup,
    createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {


    const logGoogleUser = async () => {
        
        //destructuring response.user returned from sign in popup
        const {user} = await signInwithGooglePopup();

        const userDocRef = await createUserDocumentFromAuth(user); 
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