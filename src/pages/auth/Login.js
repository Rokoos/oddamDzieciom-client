import React, {Fragment, useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import { useDispatch, useSelector} from 'react-redux' 
import { loggedIn} from '../../actions'
import { signin} from '../../functions/auth'
import Spinner from '../../components/Spinner'

const Login = ({history}) => {

  let dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const user = useSelector(state => state.user)

  useEffect(() => {
    if(user && user.token)  history.push('/')
  }, [user, history])


  const handleLogin = async e => {
    e.preventDefault()
    setLoading(true)
  
      signin({email, password})
      .then(res => {
        dispatch(loggedIn(
          res.data.name,
          res.data.email,
          res.data.token,
          res.data.role, 
          res.data._id,
          res.data.location
        ))
        toast.success( `Witaj ${res.data.name}!`)
          localStorage.setItem('userTkn', JSON.stringify(res.data.token))
      })
      .catch(error => {
        toast.error(error.response.data.error)
        setLoading(false)
      })
    
      
        
    
  }


  const loginForm = () => (
    <div className="mx-auto"
    style={{
      maxWidth:'400px'
    }}>
    <form onSubmit={handleLogin}
    
    >
      <div className="form-group">
        <input 
        type="email" 
        placeholder="Enter Your Email"
        className="form-control mb-3" 
        value={email} 
        onChange={e => setEmail(e.target.value)}
        autoFocus
      />
      </div>
      <div className="form-group">
        <input 
          type="password" 
          placeholder="Enter Password"
          className="form-control mb-3" 
          value={password} 
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div className="text-center">
        <button type="submit"
         disabled={!email || password.length < 6}  
         className="btn btn-block btn-raised btn-primary">
        zaloguj przez email / hasło
        </button>
      </div>
      </form>
    </div>
  )

  return (
    <div className="container p-5 mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-5">
          {loading ? <Spinner/> :(
            <Fragment>
            <h4
            className="text-center mb-3"
             >Logowanie</h4>
            {loginForm()}
           
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
