import './Login.css'
import {useContext, useState} from 'react'
import AuthContext from "../../contexts/authContext.jsx"
import useFormUser from "../../hooks/useFormUser.js"
import {Link} from "react-router-dom"

const loginFormKeys = {
    Email: 'email',
    Password: 'password',
}

export default function Login() {
    const {loginSubmitHandler} = useContext(AuthContext)
    const [serverError, setServerError] = useState('')
    const {values, errors, isValid, onChange, onBlur, onSubmit} = useFormUser(async (formData) => {
        try {
            await loginSubmitHandler(formData)
        } catch (error) {
            setServerError(error.message)
        }
    }, {
        [loginFormKeys.Email]: '',
        [loginFormKeys.Password]: '',
    });

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <fieldset className="w-50 m-auto pt-5">
                    <h2>Login</h2>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name={loginFormKeys.Email}
                            autoComplete="email"
                            placeholder="john@gmail.com"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={values[loginFormKeys.Email]}
                            required
                        />
                        {errors[loginFormKeys.Email] && (
                            <p className="error">{errors[loginFormKeys.Email]}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name={loginFormKeys.Password}
                            autoComplete="password"
                            onChange={onChange}
                            onBlur={onBlur}
                            required
                            minLength="6"
                            value={values[loginFormKeys.Password]}
                        />
                        {errors[loginFormKeys.Password] && (
                            <p className="error">{errors[loginFormKeys.Password]}</p>
                        )}
                    </div>
                    {serverError && (
                        <p className="error">{serverError}</p>
                    )}
                    <button
                        disabled={!isValid}
                        className="btn btn-primary"
                        style={{backgroundColor: isValid ? 'blue' : 'grey'}}
                    >
                        Login
                    </button>
                    <p className="text-center">
                        Dont have an account?
                        <Link to="/register"> Register</Link>
                    </p>
                </fieldset>
            </form>
        </div>
    )
}
