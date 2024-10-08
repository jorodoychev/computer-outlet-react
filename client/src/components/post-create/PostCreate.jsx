import './PostCreate.css'
import {useNavigate} from 'react-router-dom'
import * as postService from '../../services/postService.js'
import {useContext, useState} from "react"
import useForm from "../../hooks/useForm.js"
import AuthContext from "../../contexts/authContext.jsx"
import validator from "../../utils/validator.js"

export default function PostCreate() {
    const navigate = useNavigate()
    const {userId} = useContext(AuthContext)

    const validate = validator

    const initialValues = {title: '', imgUrl: '', price: '', description: ''}
    const [serverError, setServerError] = useState('')

    const submitHandler = async () => {

        try {
            await postService.create({...values, userId})
            navigate('/')
        } catch (err) {
            console.error(err)
        }
    }

    const {values, errors, isValid, onChange, onBlur, onSubmit} = useForm(async (formData) => {
        try {
            await submitHandler(formData)
        } catch (error) {
            setServerError(error.message)
        }
    }, initialValues, validate)


    return (
        <div className="container mb-5 pb-5">
            <form onSubmit={onSubmit} className="mb-5 pb-5">
                <fieldset className="w-50 m-auto pt-5">
                    <h2>Create post</h2>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            autoComplete="on"
                            placeholder="title"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={values.title}
                            required
                            minLength="5"
                        />
                        {errors.title && (
                            <p className="error">{errors.title}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imgUrl" className="form-label">Image</label>
                        <input
                            type="text"
                            className="form-control"
                            id="imgUrl"
                            name="imgUrl"
                            autoComplete="on"
                            placeholder="imgUrl"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={values.imgUrl}
                            required
                        />
                        {errors.imgUrl && (
                            <p className="error">{errors.imgUrl}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            autoComplete="on"
                            placeholder="description"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={values.description}
                            required
                            minLength="10"
                        />
                        {errors.description && (
                            <p className="error">{errors.description}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            type="text"
                            className="form-control"
                            id="price"
                            name="price"
                            autoComplete="on"
                            placeholder="price"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={values.price}
                            required
                            minLength="1"
                        />
                        {errors.price && (
                            <p className="error">{errors.price}</p>
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
                        Create post
                    </button>
                </fieldset>
            </form>
        </div>
    )
}
