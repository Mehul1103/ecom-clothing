import React from 'react';

import './sign-in.styles.scss';

import {SignInWithGoogle} from '../../firebase/firebase.utils';

import FormInput from '../../component/form-input/form-input.component';
import CustomButton from '../../component/custom-button/custom-button.component';

class SignIn extends React.Component{
    constructor(){
        super();

        this.state={
            email:'',
            password:''
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({email:'', password:''})
    }

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({[name] : value})
    }

    render(){
        return (
            <div className='sign-in'>
                <h2>Already have an account?</h2>
                <span>Continue with email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" name="email" value={this.state.email} label="email" handleChange={this.handleChange} required />
                    <FormInput type="password" name="password" value={this.state.password} label="password" handleChange={this.handleChange} required />
                    <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton onClick={SignInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}


export default SignIn;