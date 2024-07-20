import './PostCreate.css'
import useFormPost from "../../hooks/useFormPost.js"
import {useNavigate} from 'react-router-dom';
import * as postService from '../../services/postService.js';

const postFormKeys = {
    Title: 'title',
    ImgUrl: 'imgUrl',
    Description: 'description',
    Price: 'price'
}

export default function PostCreate() {
    const navigate = useNavigate()

    const submitHandler = async () => {
        try {
            await postService.create(values)
            navigate('/')
        } catch (err) {
            console.error(err)
        }
    }

    const {values, errors, isValid, onChange, onBlur, onSubmit} = useFormPost(submitHandler, {
        [postFormKeys.Title]: '',
        [postFormKeys.ImgUrl]: '',
        [postFormKeys.Description]: '',
        [postFormKeys.Price]: '',
    })

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
                            name={postFormKeys.Title}
                            autoComplete="on"
                            placeholder="title"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={values[postFormKeys.Title]}
                            required
                            minLength="5"
                        />
                        {errors[postFormKeys.Title] && (
                            <p className="error">{errors[postFormKeys.Title]}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imgUrl" className="form-label">Image</label>
                        <input
                            type="text"
                            className="form-control"
                            id="imgUrl"
                            name={postFormKeys.ImgUrl}
                            autoComplete="on"
                            placeholder="imgUrl"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={values[postFormKeys.ImgUrl]}
                            required
                        />
                        {errors[postFormKeys.ImgUrl] && (
                            <p className="error">{errors[postFormKeys.ImgUrl]}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name={postFormKeys.Description}
                            autoComplete="on"
                            placeholder="description"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={values[postFormKeys.Description]}
                            required
                            minLength="10"
                        />
                        {errors[postFormKeys.Description] && (
                            <p className="error">{errors[postFormKeys.Description]}</p>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            type="text"
                            className="form-control"
                            id="price"
                            name={postFormKeys.Price}
                            autoComplete="on"
                            placeholder="price"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={values[postFormKeys.Price]}
                            required
                            minLength="1"
                        />
                        {errors[postFormKeys.Price] && (
                            <p className="error">{errors[postFormKeys.Price]}</p>
                        )}
                    </div>
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
