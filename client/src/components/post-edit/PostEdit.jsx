import {useNavigate, useParams} from 'react-router-dom'
import {useContext, useEffect, useState} from 'react'
import * as postService from "../../services/postService.js"
import useForm from "../../hooks/useForm.js"
import AuthContext from "../../contexts/authContext.jsx"
import validator from "../../utils/validator.js"


export default function PostEdit() {
    const navigate = useNavigate()
    const [serverError, setServerError] = useState('')
    const {postId} = useParams()
    const [initialValues, setInitialValues] = useState({title: '', imgUrl: '', price: '', description: ''})
    const {userId} = useContext(AuthContext)

    const validate = validator

    useEffect(() => {
        postService.getOne(postId).then((result) => {
            if (result) {
                const {title, imgUrl, price, description} = result
                setInitialValues({title, imgUrl, price, description})
            }
        })
            .catch((error) => {
                console.error("Error fetching post:", error)
            })
    }, [postId])

    const editPostSubmitHandler = async () => {
        try {
            await postService.edit(postId, {...values, _id: postId, userId})
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setInitialValues(prevState => ({...prevState, [name]: value}))
        onChange(e)
    }

    const {values, errors, isValid, onChange, onBlur, onSubmit} = useForm(async (formData) => {
        try {
            await editPostSubmitHandler(formData)
        } catch (error) {
            setServerError(error.message)
        }
    }, initialValues, validate)


    return (
        <div className="container mb-5 pb-5">
            <form onSubmit={onSubmit} className="mb-5 pb-5">
                <fieldset className="w-50 m-auto pt-5">
                    <h2>Update post</h2>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            autoComplete="on"
                            placeholder="title"
                            onChange={handleChange}
                            onBlur={onBlur}
                            value={initialValues.title}
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
                            onChange={handleChange}
                            onBlur={onBlur}
                            value={initialValues.imgUrl}
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
                            onChange={handleChange}
                            onBlur={onBlur}
                            value={initialValues.description}
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
                            onChange={handleChange}
                            onBlur={onBlur}
                            value={initialValues.price}
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
                        Update post
                    </button>
                </fieldset>
            </form>
        </div>
    )
}
