import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const SignUp = () => {

    const [successMessage, setSuccessMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    

    const handleSignUp = e => {

        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const terms = e.target.terms.checked ;
        const name= e.target.name.value;
        const photo= e.target.photo.value;

        // reset error and status
        setErrorMessage('');
        setSuccessMessage(false)

        console.log(typeof (password))
        if (password.length < 6) {
            setErrorMessage('Password should be 6 characters or longer');
            return;
        }

        const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegEx.test(password)) {
            setErrorMessage('Your Password should be contain at least one UpperCase, one LowerCase, one Special Character, one Number, and at least 6 character!! ');
            return;
        }

        if(!terms){
            setErrorMessage('Please accept our terms and conditions!');
            return ;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(value => {
                console.log(value)
                setSuccessMessage(true)

                // send verification email address
                sendEmailVerification(auth.currentUser)
                .then(()=>{
                    console.log('Verification email sent.')
                })

                // update profile name and photo url
                const profile = {
                    displayName: name,
                    photoURL: photo
                }
                updateProfile(auth.currentUser, profile)
.then(()=>{
    console.log('User profile updated')
})
.catch(error=>{
    console.log('User profile update error', error)
})
            })

            .catch(error => {
                console.log('Error:', error)
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
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" name='photo' placeholder="Photo URL" className="input input-bordered" required />
                    </div>


                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control relative ">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type={showPassword ? 'text' : 'password'}
                            name='password'
                            placeholder="password"
                            className="input input-bordered" required />

                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className='btn btn-xs absolute right-4 top-12 text-lg '>
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </button>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>

                    <div className="form-control">
                        <label className="label justify-start gap-2 cursor-pointer">
                        <input type="checkbox" name='terms' className="checkbox" />
                            <span className="label-text ">Accept Our Terms and Conditions.</span>
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

            <p className='text-purple-700 font-bold text-lg p-3' >Already have an account? Please <Link to='/login' >Login</Link> </p>

        </div>
    );
};

export default SignUp;