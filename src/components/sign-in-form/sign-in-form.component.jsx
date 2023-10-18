import { useState } from 'react';
import { signInwithGoogleRedirect, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles.jsx'

const defaultFormFields = {
    email: '',
    password: ''
};

const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {  email, password } = formFields;
    

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    };

    const signInwithGoogle = async () => {

        await signInwithGoogleRedirect();

        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        //check if user exists in db and credentials match
        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('user not found');
                    break;
                default :
                    alert(error.code);
                    break;
            }
        }
    };
    
    return(
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type="text" 
                    onChange={handleChange} 
                    name= 'email' 
                    value={email} 
                    required 
                />
                <FormInput
                    label='Password'
                    type="password" 
                    onChange={handleChange} 
                    name= 'password' 
                    value={password} 
                    required 
                />
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInwithGoogle}>
                            Google Sign In
                    </Button>
                </ButtonsContainer>
            </form>      
        </SignInContainer>
    );
}

export default SignIn;