import React, { Fragment, useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { currentUser } from './functions/auth'
import { loggedIn} from './actions'
import AdminRoute from './components/Routes/AdminRoute'
import AdminProducts from './pages/admin/AdminProducts'
import AdminUsers from './pages/admin/AdminUsers'

import Navbar from './components/Nav/Nav'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'



import UserRoute from'./components/Routes/UserRoute'

import Profile from './pages/user/Profile'

import Products from './components/Product/Products'
import SingleProduct from "./components/Product/SingleProduct"
import ProductCreate from './components/Product/ProductCreate'
import UpdateProduct from './components/Product/UpdateProduct'


const App = () => {

  const dispatch = useDispatch()




  // const checkLogin =  () => {
  //   console.log('isfdsfdsfdsf', isAuthenticated())
  //   if(isAuthenticated()) {
  //     const token = JSON.parse(localStorage.getItem('userTkn'))
  //     const userEmail = JSON.parse(localStorage.getItem('userEmail'))
  //     // console.log(token, userEmail)
  //     currentUser(userEmail ,token)
  //   .then(res => {
  //     console.log('data App.js', res.data)
  //     dispatch(loggedIn(
  //       res.data.email || '',
  //       token,
  //       res.data.role, 
  //       res.data._id
  //     ))
  //   })
  //   .catch(err => console.log(err))
  //   }
  // }
 
  useEffect(() => {
      const token = JSON.parse(localStorage.getItem('userTkn'))
      // console.log(token, userEmail)
      if(token){
        currentUser(token)
        .then(res => {
      // console.log('data App.js', res.data)
      // console.log('cookie', res)
      dispatch(loggedIn(
        res.data.name,
        res.data.email || '',
        token,
        res.data.role, 
        res.data._id,
        res.data.location
      ))
    })
    .catch(err => {
      console.log('taki se błand')
      console.log(err)})
      }
  
  }, [dispatch])
  return (
    <Fragment >
      <Navbar/>
      <ToastContainer/>
        <Switch>
          
          <Route exact path="/" component={Products} />
          <UserRoute exact path="/product/create" component={ProductCreate} />
          <UserRoute exact path="/product/edit/:id" component={UpdateProduct} />
          <Route exact path="/product/:id" component={SingleProduct}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          
          <Route exact path="/user/:userId" component={Profile} />
          <AdminRoute exact path="/admin-products" component={AdminProducts} />
          <AdminRoute exact path="/admin-users" component={AdminUsers} />
        </Switch>
    </Fragment>
  )
}

export default App

/*
 marcin.widomski83@gmail.com
 m.widomski@tlen.pl
 123456
  */

