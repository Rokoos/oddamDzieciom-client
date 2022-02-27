import React, {Fragment} from 'react';
import {Link } from 'react-router-dom'
import styled from 'styled-components';
import Burger from './Burger';
import View from '../View'
import {colors} from '../../utils'
const Nav = styled.nav`
  width: 100%;
  height: 55px;
  position:fixed;
  top: 0px;
  left: 0;
  z-index: 1000;
  background-color: #fff;
  padding: 0 20px;
`

const Navbar = () => {

  const text = 'oddamDzieciom'
const characters = text.split('');
  return ( 
    <Fragment>
      <Nav className="leniczka">
      <Link to="/" className="oddamDzieciom">
        {
          characters.map((char, index) => {
            return (
              <span 
              key={index}
              style={{color:colors[index], fontSize:'18px'}}
              >
              {char}
              </span>
            )
          })
        }
        </Link>
        <Burger />
      </Nav>
      <View />
      </Fragment>  
  )
}

export default Navbar