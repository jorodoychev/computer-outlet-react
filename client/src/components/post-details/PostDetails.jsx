import {useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import * as postService from "../../services/postService.js"


export default function PostDetails() {
    const [post, setPost] = useState({})
    const {postId} = useParams()

    useEffect(() => {
        postService.getOne(postId)
            .then(setPost)
    }, [postId])

    return (
        <div className="card mt-5 w-50 m-auto">
            <img src={post.imgUrl}
                 className="card-img-top w-25 m-auto" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.description}</p>
                <p className="card-text">{post.price}$</p>
            </div>
        </div>
    )
}





