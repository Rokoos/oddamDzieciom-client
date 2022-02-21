import React, {Fragment} from 'react';
import styled from 'styled-components';
import Burger from './Burger';
import View from '../View'
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
  return ( 
    <Fragment>
      <Nav>
        <Burger />
      </Nav>
      <View/>
      </Fragment>  
  )
}

export default Navbar