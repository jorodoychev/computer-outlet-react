import {Link} from "react-router-dom"
import PropTypes from 'prop-types'

PostListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imgUrl: PropTypes.string,
    price: PropTypes.string.isRequired,
};

export default function PostListItem({
                                         _id,
                                         title,
                                         description,
                                         imgUrl,
                                         price,
                                     }) {
    return (
            <div className="pb-5">
                <div className="card mt-5 mb-5">
                    <img src={imgUrl} className="card-img-top" alt="img"/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text">{price}$</p>
                        <p className="d-flex justify-content-center">
                            <Link to={`/posts/${_id}`} className="btn btn-secondary">Read more</Link>
                        </p>
                    </div>
                </div>
            </div>
    )
}
