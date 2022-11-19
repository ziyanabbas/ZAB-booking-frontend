import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import React, {useContext} from 'react'



    
const Header = () => {
  
  return (
    
    <Navbar className='navbar1'>
      <Container>
        <Navbar.Brand  className='navbarBody' href="#home">ZAB Booking</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className='navbarBody'>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;