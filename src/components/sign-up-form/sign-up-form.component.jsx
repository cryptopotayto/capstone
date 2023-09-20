import { useState } from 'react';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUp = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    
    const handleChange (event) => {
        const {name} = event;
        
    };
    
    return(
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={()=>{}}>
                <label>Display Name
                    <input type="text" onChange={handleChange} name= 'displayName' required/>
                </label>
                <label>Email
                    <input type="email" onChange={handleChange} name='email' required/>
                </label>
                <label>Pasword
                    <input type="password" onChange={handleChange} name='password' required/>
                </label>
                <label>Confirm Password
                    <input type="password" onChange={handleChange} name='confirmPassword' required/>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SignUp;