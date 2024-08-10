import './Header.css'
import {Link} from 'react-router-dom'
import AuthContext from "../../contexts/authContext.jsx"
import {useContext} from "react"

export default function Header() {
    const {isAuthenticated, username} = useContext(AuthContext)

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top" data-bs-theme="dark">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Catalog</Link>
                            </li>
                            {!isAuthenticated && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                </>
                            )}
                            {isAuthenticated && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/post-create">Create post</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/my-posts">My posts</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/logout">Logout
                                            | {username.split('@')[0]} </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container-fluid" id="jumbotron">
                <h1>Computer Outlet</h1>
            </div>
        </header>
    )
}
