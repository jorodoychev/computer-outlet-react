import {Link, useNavigate} from "react-router-dom"
import {useEffect} from "react"
import "./NotFound.css"
import Path from "../../paths.js"

export default function NotFound() {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(Path.NotFound404)
    }, [navigate])
    return (
        <section className="page_404">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="text-center">
                            <div className="four_zero_four_bg">
                                <h1 className="text-center">404</h1>
                            </div>
                            <div className="content_box_404">
                                <Link className="link_404" to="/">Go to Home</Link>
                                <p>the page you are looking for not available!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
