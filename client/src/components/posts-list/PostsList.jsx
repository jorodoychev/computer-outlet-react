import "./PostsList.css"
import {useEffect, useState} from 'react'
import * as postService from '../../services/postService'
import PostListItem from "./post-list-item/PostListItem.jsx"

export default function PostsList() {
    const [posts, setPosts] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

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
                <label htmlFor="search"></label>
                <input
                    type="text"
                    id="search"
                    className="form-control"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {
                    posts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
                        .sort((a, b) => b._id.localeCompare(a._id))
                        .map(post => (
                            <PostListItem key={post._id} {...post} />
                        ))
                }

                {posts.length === 0 && (
                    <h3 className="no-articles">No articles yet</h3>
                )}

            </section>
        </div>
    )
}
