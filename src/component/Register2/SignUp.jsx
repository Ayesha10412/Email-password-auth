import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';

const SignUp = () => {

    const [successMessage, setSuccessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSignUp = e =>{

e.preventDefault();
const email = e.target.email.value;
const password = e.target.password.value ;

// reset error and status
setErrorMessage('');
setSuccessMessage(false)

console.log(typeof(password))
if(password.length < 6){
    setErrorMessage('Password should be 6 characters or longer');
    return ;
}

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/ ;

if(!passwordRegEx.test(password)){
setErrorMessage('Your Password should be contain at least one UpperCase, one LowerCase, one Special Character, one Number, and at least 6 character!! ');
return;
}


createUserWithEmailAndPassword(auth, email, password) 
.then(value =>{
    console.log(value)
    setSuccessMessage(true)
})

.catch(error=>{
    console.log('Error:' , error)
    setErrorMessage(error.message)
    setSuccessMessage(false)
})

    }


    return (
        <div className='flex flex-col mt-16 items-center'>
            <h2 className='text-3xl mb-6 font-bold'> Sign Up Now!! </h2>

            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSignUp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
    </div>

{
    errorMessage && <p className='text-red-700 font-semibold text-xl'>{errorMessage}</p>
}

{
    successMessage && <p className='text-green-700 font-bold text-xl '>Sign Up is Successful. </p>
}

        </div>
    );
};

export default SignUp;