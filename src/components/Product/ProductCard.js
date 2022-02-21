import React from 'react'
import { Link} from 'react-router-dom'
import { Card } from 'antd';
import defaultPicture from '../../images/kids.png'

const { Meta } = Card


const ProductCard = ({product}) => {
  // console.log('product from product card', product)
    const {title, image, _id} = product

  return (
    
    <Card
    className="col m-3 d-flex flex-column justify-content-between product-card-hover align-items-center"
    hoverable
    // className="product-card-hover"
    cover={<img alt="example" className="mt-3" style={{ width: 250 }} src={image ? image.url : defaultPicture} />}
  >
    <Meta className="text-center mt-2" title={title} description={<Link to={`/product/${_id}`} className="btn btn-raised btn-success mt-2 mb-3">Więcej &rarr;</Link>} />
  </Card>
  )
}

export default ProductCard
