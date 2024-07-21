import './Login.css'
import {useContext, useState} from 'react'
import AuthContext from "../../contexts/authContext.jsx"
import useForm from "../../hooks/useForm.js"
import {Link} from "react-router-dom"

const validate = {
    email: (value) => {
        if (!value) return "Email is required!"
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) return "Email is not valid!"
        return ""
    },
    password: (value) => {
        if (!value) return "Password is required!"
        if (value.length < 6) return "Password must be at least 6 characters!"
        return ""
    },
}

const initialValues = {email: '', password: ''}


export default function Login() {
    const {loginSubmitHandler} = useContext(AuthContext)
    const [serverError, setServerError] = useState('')

    const {values, errors, isValid, onChange, onBlur, onSubmit} = useForm(async (formData) => {
        try {
            await loginSubmitHandler(formData)
        } catch (error) {
            setServerError(error.message)
        }
    }, initialValues, validate)

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
                            name="email"
                            autoComplete="email"
                            placeholder="john@gmail.com"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={values.email}
                            required
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            autoComplete="password"
                            onChange={onChange}
                            onBlur={onBlur}
                            required
                            minLength="6"
                            value={values.password}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    {serverError && (
                        <p className="error">{serverError}</p>
                    )}
                    <button
                        disabled={!isValid}
                        style={{backgroundColor: isValid ? 'blue' : 'grey'}}
                        className="btn btn-primary"
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
