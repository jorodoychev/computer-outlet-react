import "../posts-list/PostsList.css";
import { useContext, useEffect, useState } from "react";
import * as postService from "../../services/postService";
import PostListItem from "../posts-list/post-list-item/PostListItem.jsx";
import AuthContext from "../../contexts/authContext.jsx";

export default function MyPosts() {
    const [posts, setPosts] = useState([])
    const { userId } = useContext(AuthContext)

    useEffect(() => {
        postService.getAll()
            .then(result => setPosts(result))
            .catch(err => console.error(err))
    }, [])

    const userPosts = posts
        .filter(post => post.userId === userId)
        .sort((a, b) => b._id.localeCompare(a._id))

    return (
        <div className="d-flex justify-content-center container pb-5">
            <section>
                {
                    userPosts.map(post => (
                        <PostListItem key={post._id} {...post} />
                    ))
                }
                {userPosts.length === 0 && (
                    <h3 className="no-articles mt-5">No articles yet</h3>
                )}
            </section>
        </div>
    )
}
