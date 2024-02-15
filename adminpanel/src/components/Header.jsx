import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
function Header() {
    return (
        <div style={{backgroundColor:'black'}}>
            <div>
                <h1 className='text-center'>Aetherloom Inventory</h1>
            </div>
            <div className='container d-flex justify-content-center align-items-center p-3 g-5' style={{ fontSize: '20px' }}>
                <Nav.Link href="#action1" className='me-4'><Link to={'/dashboard'} style={{ textDecoration: 'none' }}>
                    Home</Link>
                </Nav.Link>
                <Nav.Link className='me-4'><Link to={'/users'} style={{ textDecoration: 'none' }}>Users</Link></Nav.Link>
                <Nav.Link className='me-4'><Link to={'/orders'} style={{ textDecoration: 'none' }}>Orders</Link></Nav.Link>
            </div>

        </div>
    )
}

export default Header