import "./PostsList.css"
import {useEffect, useState} from 'react'
import * as postService from '../../services/postService'
import PostListItem from "./post-list-item/PostListItem.jsx"

export default function PostsList() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        postService.getAll()
            .then(result => setPosts(result))
            .catch(err => {
                console.error(err)
            })

    }, [])

    return (
        <div className="d-flex justify-content-center container pb-5">
            <section>

                {posts.map(post => (
                    <PostListItem key={post._id} {...post} />
                ))}

                {posts.length === 0 && (
                    <h3 className="no-articles">No articles yet</h3>
                )}

            </section>
        </div>
    )
}
