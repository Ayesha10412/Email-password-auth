import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../firebase.init';
import { Link } from 'react-router-dom';

const Login = () => {

    const [success, setSuccess] = useState(false);
const [loginError, setLoginError] = useState('')
const emailRef = useRef();
    const handleLogin =e =>{

        e.preventDefault();
const email = e.target.email.value;
const password = e.target.password.value;
setLoginError('')
setSuccess(false)

signInWithEmailAndPassword(auth, email, password)

.then(value=>{
    console.log(value.user)

    if(!value.user.emailVerified){
        setLoginError('Please verify your email address.')
    }

   else{
    setSuccess(true)
   }
})

.catch(error=>{
    console.log('Error:', error)
    setLoginError(error.message)
})

    }

    const handleForgetPassword = ()=>{

console.log('get my email address',emailRef.current.value)
const email = emailRef.current.value ;
if(!email){
    console.log('Please provide a valid email address.')
}

else{
    sendPasswordResetEmail(auth, email)
    .then(()=>{
        alert('Password reset email sent, please check your email')
    })
}

    }


    return (
        <div className='flex flex-col items-center mt-16'>
            <h1 className='font-bold text-3xl mb-4'>Login Now!!</h1>

            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' ref={emailRef} placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label onClick={handleForgetPassword} className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>

{
    success && <p className='text-green-700 font-bold text-2xl'>Successfully login.</p>
}
{
    loginError && <p className='text-red-700 font-bold text-3xl'>{loginError}</p>
}

<p className='text-purple-700 font-bold text-lg p-3'>New to this Website? Please <Link to='/signUp' >SignUp</Link> </p>
        </div>
    );
};

export default Login;