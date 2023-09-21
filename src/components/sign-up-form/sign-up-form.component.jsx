import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //check if passwords match
        if(password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
           await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            alert(error);
        }
    };
    
    return(
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    type="text" 
                    onChange={handleChange} 
                    name= 'displayName' 
                    value={displayName} 
                    required 
                />
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
                    type="text" 
                    onChange={handleChange} 
                    name= 'password' 
                    value={password} 
                    required 
                />
                <FormInput
                    label='Confirm Password'
                    type="text" 
                    onChange={handleChange} 
                    name= 'confirmPassword' 
                    value={confirmPassword} 
                    required 
                />
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUp;