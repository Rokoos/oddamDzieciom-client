import React, { useEffect, useState, useCallback, Fragment}  from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getProduct, 
  removeProductByAdmin,
  removeProduct
} from '../../functions/product'
import {sendEmail } from '../../functions/user'
import Spinner from '../Spinner'
import ModalImage from 'react-modal-image'
import defaultPicture from '../../images/ImageNameHere(1).jpg'
import { removeProductPhoto} from '../../functions/cloudinary'
import {toast} from 'react-toastify'
import { renderSexName} from '../../utils'



import ConfirmModal from './Modals/ConfirmModal'
import MessageModal from './Modals/MessageModal'



const SingleProduct = ({match, history}) => {

    const [product, setProduct] = useState({})

    const { image} = product
    const [owner, setOwner] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [messageSort, setMessageSort] = useState('')
    const [messageModal, setMessageModal] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const handleModal = () => setModalVisible(true)

    const productId = match.params.id
    const user = useSelector(state => state.user)


   


  const loadSingleProduct = useCallback(() => {
      setLoading(true)
      getProduct(productId)
      .then(res => {
          setProduct(res.data)
          setOwner(res.data.postedBy)
          setLoading(false)
      })
      .catch(err => {
        toast.error('Nie znaleziono produktu.')
        history.push('/')
      })
  }, [productId, history]) 


  useEffect(() => {
    loadSingleProduct()
}, [productId, loadSingleProduct])



const handleEmail = () => {
  const messageData = {
    title: product.title,
    senderName: user.name,
    senderEmail: user.email,
    senderStatus: user.role,
    ownerEmail: owner.email,
    messageSort,
    message, 
    link: `https://oddamdzieciom.netlify.app/${match.url}`
  }

  sendEmail(user.token, messageData)
  toast.success(messageSort === 'user2admin' ? 'Wysłano powiadomienie do Administratora serwisu.'  : `Wysłano wiadomość do użytkownika ${owner.name}.`)
}

const renderModalType = () => {
  if(messageModal){
    return <MessageModal
    messageSort={messageSort}
    owner={owner}
    message={message}
    setMessage={setMessage}
    modalVisible={modalVisible}
    setModalVisible={setModalVisible}
    handleEmail={handleEmail}
    />
  }else {
    return <ConfirmModal
    title={`Czy na pewno chcesz usunąć ${product.title} ?`} 
    modalVisible={modalVisible} 
    setModalVisible={setModalVisible} 
    remove={whoInCharge}
    />
  }
}

const whoInCharge = () => {
  if(user.role === 'admin') {
    return deleteByAdmin()
  }else if(user.role === 'giver'){
    return deleteByUser()
  }
}

const deleteByAdmin = () => {
  setLoading(true)
  removeProductPhoto(image.public_id, user.token)
  removeProductByAdmin(productId, user.token)
  .then(res =>{
    setLoading(false)
    history.push(`/user/${owner._id}`)
  } )
  
}



const deleteByUser = () => {
  
  removeProductPhoto(image.public_id, user.token)
  removeProduct(productId, user.token)
  .then(res => {
    history.push(`/user/${owner._id}`)
  })
  .catch(err => console.log( err))
  
}


  


  const renderProductInfo = ({title,category, description, image, sex, size}) => (
    <Fragment>
      <div className="container mt-5 text-center">
          <div className="col-md-8  mx-auto">
            <div>
              <div ><ModalImage className="single_product-photo mb-3" small={image ? image.url : defaultPicture} large={image && image.url} /></div>
            </div>
            <h3>{title}</h3>
            {(category === 'ubrania' || category === 'buty') && 
            (
              <Fragment>
                <h6>Rozmiar: {size}</h6>
                <h6>Płeć: {renderSexName(sex)}</h6>
              </Fragment>
            )}
            <p>{description}</p>
            <div className="d-flex justify-content-center">
            <div className=''>
            {(user && user._id === owner._id) && (
              <div className="d-flex flex-column">
              <Link to={`/product/edit/${productId}`} className="btn btn-raised btn-primary">Edytuj produkt</Link>
              <div
              onClick={handleModal}
              className="btn btn-raised btn-danger mt-3">Usuń produkt</div>
              </div>
            )}

            <div className="d-flex flex-column">
            {
              (user && user._id !== owner._id) && ( 
                <div className="w-100 btn btn-raised btn-success mb-3" onClick={ () => {
                  setMessage('')
                  setMessageSort('user2user')
                  setMessageModal(true)
                  handleModal()
                } }>{user.role === 'admin' ? "Wyślij wiadomość" : 'Zapytaj o przedmiot'}</div> 
              ) }

             { (user && user._id !== owner._id && user.role !== 'admin') && (
                <div className="btn btn-raised btn-secondary" onClick={ () => {
                  setMessage('')
                  setMessageSort('user2admin')
                  setMessageModal(true)
                  handleModal()
                } }>Powiadom admina</div> 
              )
            }
            </div>
            {!user && <h5 style={{color: '#ff0000'}}>Musisz się zalogować by wysłać wiadomość.</h5>}
            {
              user && user.role === 'admin' && <div
              onClick={() => {
                setMessageSort('admin2user')
                setMessageModal(false)
                handleModal()
              }}
              className="btn btn-raised btn-danger w-100">USUN PRODUKT</div>
            }
              </div>
            </div>
          </div>
          
      </div>
      
    </Fragment>
  )

  

  return (
    loading ? <Spinner/> : (
      <div className="singleProduct-margin">
    {renderProductInfo(product)} 
    {renderModalType()}
    <div style={{height: '50px'}}></div>
  </div>
    )
     
  )
}

export default SingleProduct


