import './Register.css'
import {useContext, useState} from "react"
import AuthContext from "../../contexts/authContext.jsx"
import useForm from "../../hooks/useForm.js"
import {Link} from "react-router-dom"
import validator from "../../utils/validator.js"

export default function Register() {
    const validate = validator

    const initialValues = {email: '', password: '', confirmPassword: '', username: ''}

    const {registerSubmitHandler} = useContext(AuthContext)
    const [serverError, setServerError] = useState('')

    const {values, errors, isValid, onChange, onBlur, onSubmit} = useForm(async (formData) => {
        try {
            await registerSubmitHandler(formData)
        } catch (error) {
            setServerError(error.message)
        }
    }, initialValues, validate)


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
                            value={values.username}

                        />
                        {errors.username && <p className="error">{errors.username}</p>}
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
                            value={values.email}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
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
                            value={values.password}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='confirmPassword' className='form-label'>Repeat password</label>
                        <input
                            type='password'
                            className='form-control'
                            id='confirmPassword'
                            name='confirmPassword'
                            autoComplete='password'
                            placeholder='******'
                            onBlur={onBlur}
                            required
                            minLength="6"
                            onChange={onChange}
                            value={values.confirmPassword}
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    </div>
                    {serverError && (
                        <p className="error">{serverError}</p>
                    )}
                    <button
                        disabled={!isValid}
                        style={{backgroundColor: isValid ? 'blue' : 'grey'}}
                        className="btn btn-primary"

                    >
                        Create Account
                    </button>
                    <div>
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
