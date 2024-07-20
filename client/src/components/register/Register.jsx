import './Register.css'
import {useContext} from "react"
import AuthContext from "../../contexts/authContext.jsx"
import useFormUser from "../../hooks/useFormUser.js"
import {Link} from "react-router-dom"

export default function Register() {

    const RegisterFormKeys = {
        Username: 'username',
        Email: 'email',
        Password: 'password',
        ConfirmPassword: 'confirm-password'
    }

    const {registerSubmitHandler} = useContext(AuthContext)

    const {errors, values ,onBlur, onChange, onSubmit} = useFormUser(registerSubmitHandler, {
        [RegisterFormKeys.Username]: '',
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: '',
    })



    return (
        <div className='container'>
            <form onSubmit={onSubmit}>
                <fieldset className="w-50 m-auto pt-5">
                    <div className='mb-3'>
                        <label htmlFor='username' className='form-label'>Username</label>
                        <input
                            type='text'
                            className='form-control'
                            id='username'
                            name='username'
                            autoComplete='username'
                            placeholder='john'
                            onBlur={onBlur}
                            onChange={onChange}
                            value={values[RegisterFormKeys.Username]}

                        />
                        {errors[RegisterFormKeys.Username] && (
                            <p className="error">{errors[RegisterFormKeys.Username]}</p>
                        )}
                        {/*{touched.username && (*/}
                        {/*    <>*/}
                        {/*        {form.username === '' && <p className="error">Username is required!</p>}*/}
                        {/*        {form.username.length < 5 &&*/}
                        {/*            <p className="error">Username must be at least 5 characters!</p>}*/}
                        {/*    </>*/}
                        {/*)}*/}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email' className='form-label'>Email</label>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            autoComplete='email'
                            placeholder='john.doe@gmail.com'
                            onBlur={onBlur}
                            required
                            onChange={onChange}
                            value={values[RegisterFormKeys.Email]}
                        />
                        {/*{touched.email && (*/}
                        {/*    <>*/}
                        {/*        {form.email === '' && <p className="error">Email is required!</p>}*/}
                        {/*        {!form.email.includes('@') && <p className="error">Email is not valid!</p>}*/}
                        {/*    </>*/}
                        {/*)}*/}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='form-label'>Password</label>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            autoComplete='password'
                            placeholder='******'
                            onBlur={onBlur}
                            required
                            minLength="6"
                            onChange={onChange}
                            value={values[RegisterFormKeys.Password]}
                        />
                        {/*{touched.password && (*/}
                        {/*    <>*/}
                        {/*        {form.password === '' && <p className="error">Password is required!</p>}*/}
                        {/*        {form.password.length < 6 &&*/}
                        {/*            <p className="error">Password must be at least 6 characters!</p>}*/}
                        {/*    </>*/}
                        {/*)}*/}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='confirm-password' className='form-label'>Repeat password</label>
                        <input
                            type='password'
                            className='form-control'
                            id='confirm-password'
                            name='confirm-password'
                            autoComplete='password'
                            placeholder='******'
                            onBlur={onBlur}
                            required
                            minLength="6"
                            onChange={onChange}
                            value={values[RegisterFormKeys.ConfirmPassword]}
                        />
                        {/*{touched.rePassword && (*/}
                        {/*    <>*/}
                        {/*        {form.rePassword === '' && <p className="error">Repeat password is required!</p>}*/}
                        {/*        {form.rePassword.length < 6 &&*/}
                        {/*            <p className="error">Repeat password must be at least 6 characters!</p>}*/}
                        {/*        {form.password !== form.rePassword &&*/}
                        {/*            <p className="error">Passwords do not match!</p>}*/}
                        {/*    </>*/}
                        {/*)}*/}
                    </div>
                    <button
                        // disabled={!isValid}
                        className="btn btn-primary"
                        // style={{backgroundColor: isValid ? 'blue' : 'grey'}}
                    >
                        Create Account
                    </button>
                    <div>
                        {/*{registerFailed && (<p className="error">A user with the same email exist!</p>)}*/}
                    </div>
                    <p className='text-center'>
                        Have an account?
                        <Link to="/login"> Login</Link>
                    </p>
                </fieldset>
            </form>
        </div>
    )
}
