import React, {Fragment, useState, useEffect, useCallback} from 'react'
import { Link} from 'react-router-dom'
import { getUsers, getUsersCount} from '../../functions/user'
import Spinner from '../../components/Spinner'
import {Pagination} from 'antd'


const AdminUsers = () => {

  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])

  const [usersCount, setUsersCount] = useState(0)
  const [page, setPage] = useState(1)

  const fetchUsers = useCallback(() => {
    setLoading(true)
    getUsers('createdAt','desc', page, 10)
    .then(res => {
      setUsers(res.data)
      setLoading(false)
    })
  }, [page])

  useEffect(() =>{
    fetchUsers()
  }, [page, fetchUsers])

  useEffect(() => {
    getUsersCount().then(res => setUsersCount(res.data))
  }, [])

  return (
    <div className="container-fluid" style={{marginTop:'100px'}}>
        <div className="row"> 
          <div className="col-md-12">
            {
              loading ? <Spinner/> : (
                <Fragment>
                {
                  users.length > 1 ? <h4 className="mt-3 mb-3 text-center">Użytkownicy</h4> : 
                  <p>Brak użytkowników do wyświetlenia</p>
                }
                  
                  {
                    users.length > 1 && (
                      users.map(user => (
                        user.role === 'giver' && <div key={user._id} className='admin admin-users' >
                        <Link to={`/user/${user._id}`}>{user.name}</Link>  
                      </div>
                      ))
                    )
                     
                  }
                </Fragment>
              )
             }
             {usersCount > 10 && (
              <div className="text-center mt-4 mb-5">
                  <Pagination
                      current={page}
                      total={(usersCount / 10) * 10}
                      onChange={value => setPage(value)}
                      />
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default AdminUsers
