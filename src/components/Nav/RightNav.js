import React, { Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom'
import { userLogout} from '../../actions'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components';
import { getToken, logout} from '../../utils'

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: orange;
  width: 100%;
    li {
      padding: 1rem 2rem;
      align-items: center;

      a{
        color: #555;
      }
    }
  
  @media (max-width: 768px) {
    padding-top: 3rem;
    padding-bottom: 1.5rem;
    background-color: orange;
    position: fixed;
    flex-direction: column;
    align-items: start;
    z-index: 100;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    
    transition: transform 0.3s ease-in-out;

    
  }
`;

const RightNav = ({ open, toggle, history }) => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.user);

    const toggleNavBar = () => {
        toggle(open)
    }

    const handleSignout = () => {
      logout()
      toggle(open)
      dispatch(userLogout())
    }

    const isActive = (history, path) => {
      if(history.location.pathname === path) {
        return 'nav_active'
      }
      return ''
    }

    const renderOptions = () => {
      if(!getToken()){
        return (
        <div
        className="nav_link">
          <li
          onClick={toggleNavBar}
          className={isActive(history, "/login")}
          >
            <Link to="/login">Zaloguj</Link>
          </li>
          <li 
          onClick={toggleNavBar}
          className={isActive(history, "/signup")}
          >
            <Link
            to="/signup">Rejestracja</Link>
          </li>
        </div>
        )

      }

      return (
        <div className="nav_link">
          <li 
          onClick={handleSignout}
          >
            <Link
            to="/">Wyloguj</Link>
          </li>
        </div>
      )
    }


    const adminOrUser = user => {
      if(user && user.token && user.role === 'giver'){
        return (
          <Fragment>
            <li 
          className={isActive(history, "/product/create")}
          onClick={toggleNavBar}
          >
            <Link
            to="/product/create">Dodaj produkt</Link>
          </li>
          <li 
        className={isActive(history, `/user/${user._id}`)}
        onClick={toggleNavBar}
        >
          <Link
          to={`/user/${user._id}`}>Mój Profil</Link>
        </li>
          </Fragment>
        )
      }else if (user && user.token && user.role === 'admin'){
        return (
          <li 
        className={isActive(history, '/admin-users')}
        onClick={toggleNavBar}
        >
          <Link
          to='/admin-users'>Użytkownicy</Link>
        </li>
        )
      } 
    }
  return (
    <Ul open={open}>
       <div className="nav_link">

          <li 
        className={isActive(history, user && user.role === 'admin'? '/admin-products' : '/')}
        onClick={toggleNavBar}
        >
          <Link
          to={user && user.role === 'admin'? '/admin-products' : '/'}>Produkty</Link>
        </li>
       
       {adminOrUser(user)}
       </div>
       {renderOptions()}
        
    </Ul>
  )
}

export default withRouter(RightNav)