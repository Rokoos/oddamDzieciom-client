import React, {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {signup} from '../../functions/auth'
import { locations} from '../../utils'
import StatuteModal from '../../components/Product/Modals/StatuteModal'



const Signup = ({history}) => {



  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [location, setLocation] = useState('')
  const [statute, setStatute] = useState(false)


  // console.log('email', email)
  // console.log('name', name)
  // console.log('location', location)
  // console.log('check', statute)

  const [modalVisible, setModalVisible] = useState(false)
  const handleModal = () => setModalVisible(true)



  useEffect(() => {
    const userEmail = window.localStorage.getItem('emailForRegistration')
    if(userEmail){
      setEmail(JSON.parse(userEmail))
    }
  }, [])

  

  const handleSubmit = async e => {
    e.preventDefault()
    // console.log('handleSubmit')

   


    //validation
    if(!email || !password){
        toast.error('Email and password are required.')
        return
    }

    if(password.length < 6){
        toast.error('Password must be at least 6 characters long.')
        return
    }

    if(!location){
      toast.error('Wybierz swoją lokalizację.')
      return
  }

    
      signup({name, email, password, location})
      .then(() => {  
        toast.success('Rejestracja w systemie zakończona sukcesem! Możesz sie zalogować do serwisu')
        history.push("/login")
      }
      
      )
      .catch(error => toast.error(error.response.data.error))
    
    
  }

  const completeRegisterForm = () => (
    <form onSubmit={handleSubmit}
    className="mx-auto"
    style={{
      maxWidth:'400px'
    }}
    >
    <input type="text" className="form-control mb-3" 
    value={name}
    autoFocus
    placeholder='Nazwa użytkownika'
    onChange={e => setName(e.target.value)}
    />
      <input type="email" className="form-control mb-3" 
      value={email} 
      placeholder='Email'
      onChange={e => setEmail(e.target.value)}
      />
      <input type="password" className="form-control mb-3" 
      value={password}
      placeholder='Hasło - min 6 znaków'
      onChange={e => setPassword(e.target.value)}/>

      <div className="form-group">
      <label >Lokalizacja</label>
      <select 
      className="form-control"
      onChange={e => setLocation(e.target.value)}>
        <option value="">Wybierz województwo</option>
        {locations.map(b => <option key={b}>{b}</option>)}
      </select>
      </div>
      <div className="form-group text-center d-flex justify-content-center align-items-center mb-3">
          <input  type="checkbox" className="mr-2" 
          onChange={e => setStatute(e.target.checked)}
          /> 
         Zaakceptuj <span onClick={handleModal} className="text-primary px-1"
         style={{'cursor': 'pointer'}}> regulamin</span> serwisu
      </div>
      
      <div className="text-center">
        <button disabled={!statute} type="submit" className=" btn btn-raised btn-success">
        Zarejestruj
      </button>
      </div>
      
    </form>
  )

  return (
    <div className="container p-5">
      <div className="row">
        <div
        
        className="col-md-6 offset-md-3 mt-5">
          <h4 className="text-center mb-3">Rejestracja</h4>
          {completeRegisterForm()}
          <StatuteModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          /> 
        </div>
      </div>
    </div>
  )
}

export default Signup
