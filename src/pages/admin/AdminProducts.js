import React, {Fragment, useState, useEffect, useCallback} from 'react'
import { Link} from 'react-router-dom'
import {getProducts, getProductsCount, } from '../../functions/product'
import Spinner from '../../components/Spinner'
import {Pagination} from 'antd'

const AdminProducts = () => {


  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [productsCount, setProductsCount] = useState(0)
  const [page, setPage] = useState(1)

  const fetchProducts = useCallback(() => {
    setLoading(true)
    getProducts('createdAt','desc', page, 10)
    .then(res => {
      setProducts(res.data)
      setLoading(false)
    })
  }, [page])

  useEffect(() =>{
    fetchProducts()
  }, [page, fetchProducts])

  useEffect(() => {
    getProductsCount().then(res => setProductsCount(res.data))
  }, [])

  return (
    <div className="container-fluid" style={{marginTop:'100px'}}>
        <div className="row"> 
            
          <div className="col-md-12">
          {
            products.length ? <h4 className="mt-3 mb-3 text-center">Produkty</h4> : <p>Brak producktów do wyświetlenia</p>
          }
          
            {
              loading ? <Spinner/> : (
                <Fragment>
                  
                  {
                    products.length  && (
                      products.map(product => (
                        <div key={product._id} className="admin admin-products"
                        >
                          <Link to={`/product/${product._id}`}>{product.title.substring(0, 15)}...</Link>
                          <span>dodał/a <Link to={`/user/${product.postedBy._id}`} >{product.postedBy.name}</Link></span>
                        </div>
                      ))
                    )
                      
                  }
                  
                </Fragment>
              )
             }
             {productsCount > 10 && (
              <div className="text-center mt-4 mb-5">
                  <Pagination
                      current={page}
                      total={(productsCount / 10) * 10}
                      onChange={value => setPage(value)}
                      />
              </div>
            )}
          </div>
        </div>
        
    </div>
  )
}

export default AdminProducts
