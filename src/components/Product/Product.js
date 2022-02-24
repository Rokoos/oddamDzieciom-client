import React from 'react'
import { Link} from 'react-router-dom'
import { useSelector} from 'react-redux'
import ModalImage from 'react-modal-image'
import defaultPicture from '../../images/ImageNameHere(1).jpg'

const Product = ({product}) => {
  const user = useSelector(state => state.user)
  const {title, image, _id, postedBy} = product

 
  return (
    <div
    style={{border:'1px solid #ccc'}}
    className="d-flex justify-content-between align-items-center p-3 mb-2"
    >
      <div>
      <div ><ModalImage className="donJon" small={image ? image.url : defaultPicture }  large={image && image.url} /></div>
      </div>
      <Link className="showProductTitle" to={`/product/${_id}`}>{`${title.substring(0, 25)}...`}</Link>  
      {user && user._id === postedBy._id ? <Link to={`/product/edit/${_id}`}>Edytuj</Link> : <Link to={`/product/${_id}`} className="btn btn-raised btn-success btn-sm">Więcej &rarr;</Link>}
    </div>
  )
}

export default Product


