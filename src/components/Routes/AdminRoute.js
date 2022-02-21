import React, {useEffect, useState} from 'react'
import { Route} from 'react-router-dom'
import { useSelector} from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'

import { admin } from '../../functions/auth'

const AdminRoute = ({children, ...rest}) => {
  const user = useSelector(state => state.user)
  // console.log('user', user)

  const [ok, setOk] = useState(false)
  // console.log('ok', ok)

  useEffect(() => {
    if(user && user.token) {
      admin(user.token)
      .then(res=> {
        // console.log('ADMIN', res)
        setOk(true)
      })
      .catch(err => {
        console.log('ADMIN ROUTE ERROR', err)
        setOk(false)
      })
    }
  }, [user])

  return ok && user.role === 'admin' ? <Route {...rest} /> : <LoadingToRedirect/>
}
export default AdminRoute
