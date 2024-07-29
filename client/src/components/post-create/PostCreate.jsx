import './PostCreate.css'
import {useNavigate} from 'react-router-dom'
import * as postService from '../../services/postService.js'
import {useState} from "react"
import useForm from "../../hooks/useForm.js"

export default function PostCreate() {
    const navigate = useNavigate()

    const validate = {
        title: (value) => {
            if (!value) return "Title is required!"
            if (value.length < 5) return "Title must be at least 5 characters!"
            return ""
        },
        imgUrl: (value) => {
            if (!value) return "imgUrl is required!"
            if (!/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)\.(?:jpeg|jpg|gif|png)$/.test(value)) {
                return "imgUrl is not valid!"
            }
        },
        description: (value) => {
            if (!value) return "Description is required!"
            if (value.length < 10) return "Description must be at least 10 characters!"
            return ""
        },
        price: (value) => {
            if (!value) return "Price is required!"
            if (!value.match(/^[0-9]+$/)) {
                return "Price must be a number!"
            }
            if (value.length < 1) {
                return "Price must be at least one digit long!"
            }
        }
    }


    const initialValues = {title: '', imgUrl: '', price: '', description: ''}
    const [serverError, setServerError] = useState('')

    const submitHandler = async () => {
        try {
            await postService.create(values)
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
