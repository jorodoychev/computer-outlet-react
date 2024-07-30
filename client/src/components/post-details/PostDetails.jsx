import {Link, useNavigate, useParams} from "react-router-dom"
import {useContext, useEffect, useReducer, useState} from "react"
import * as postService from "../../services/postService.js"
import * as commentService from '../../services/commentService'
import AuthContext from "../../contexts/authContext.jsx"
import reducer from "./commentReducer.js"
import useForm from "../../hooks/useForm.js"
import validator from "../../utils/validator.js"


export default function PostDetails() {
    const navigate = useNavigate()
    const [post, setPost] = useState({})
    const {email, userId} = useContext(AuthContext)
    const {postId} = useParams()
    const [comments, dispatch] = useReducer(reducer, [])

    const validate = validator

    useEffect(() => {
        postService.getOne(postId)
            .then(setPost)

        commentService.getAll(postId)
            .then((result) => {
                dispatch({
                    type: 'GET_ALL_COMMENTS',
                    payload: result,
                });
            });
    }, [postId])

    const addCommentHandler = async (values) => {
        try {
            const newComment = await commentService.create(
                postId,
                values.comment
            )

            newComment.owner = {email}

            dispatch({
                type: 'ADD_COMMENT',
                payload: newComment
            })
        } catch (err) {
            console.error(err)
        }
    }

    const deleteButtonClickHandler = async () => {
        const hasConfirmed = confirm(`Are you sure you want to delete ${post.title}`)

        if (hasConfirmed) {
            await postService.remove(postId)
            navigate('/')
        }
    }

    const initialValues = {comment: ''}
    const [serverError, setServerError] = useState('')

    const {values, errors, isValid, onChange, onBlur, onSubmit} = useForm(async (formData) => {
        try {
            await addCommentHandler(formData)
            values.comment = ''
        } catch (error) {
            setServerError(error.message)
        }
    }, initialValues, validate)

    return (
        <section className="mb-5 pb-5">
            <div className="card mt-5 w-50 m-auto">
                <img src={post.imgUrl}
                     className="card-img-top w-25 m-auto" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.description}</p>
                    <p className="card-text">{post.price}$</p>
                </div>

                <div className="details-comments p-3">
                    <h5>Comments:</h5>
                    <ul>
                        {comments.map(({_id, text, owner: {email}}) => (
                            <li key={_id} className="comment p-1">
                                {email}: {text}
                            </li>
                        ))}
                    </ul>

                    {comments.length === 0 && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>

                {userId === post.userId && (
                    <div className="p-3">
                        <Link to={`/posts/${postId}/edit`} className="btn btn-primary">Edit</Link>
                        <button className="btn btn-danger mx-3" onClick={deleteButtonClickHandler}>Delete</button>
                    </div>
                )}
                {userId !== post.userId && (
                    <article className="create-comment p-3">
                        <label>Add new comment:</label>
                        <form className="form mb-5 pb-5" onSubmit={onSubmit}>
                            <div className="d-flex justify-content-center align-items-center p-3">
                                 <textarea className="w-75" name="comment" value={values.comment} onChange={onChange}
                                           rows="5"
                                           onBlur={onBlur}
                                           minLength="10"
                                           required
                                           placeholder="Comment......"></textarea>
                            </div>
                            {errors.comment && (
                                <p className="error">{errors.comment}</p>
                            )}
                            {serverError && (
                                <p className="error">{serverError}</p>
                            )}
                            <button
                                disabled={!isValid}
                                className="btn btn-primary mb-5"
                                style={{backgroundColor: isValid ? 'blue' : 'grey'}}
                            >Add Comment
                            </button>
                        </form>
                    </article>
                )}

            </div>
        </section>
    )
}





