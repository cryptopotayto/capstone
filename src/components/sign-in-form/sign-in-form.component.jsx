import { useState } from 'react';
import { signInwithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss'

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

        await signInwithGooglePopup();

        
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
        <div className='sign-up-container'>
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
                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button buttonType='google' type='button' onClick={signInwithGoogle}>
                            Google Sign In
                    </Button>
                </div>
            </form>      
        </div>
    );
}

export default SignIn;