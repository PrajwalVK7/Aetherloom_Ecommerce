import React, { useState } from 'react'
import loginBg from '../assets/pexels-andre-furtado-370717.jpg'
import Form from 'react-bootstrap/Form';
import { login } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const [adminData, setAdminData] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        const { username, password } = adminData;
        if (!username || !password) {
            alert("Please add username / password")
        } else {

            const response = await login(adminData);
            // console.log(response.data.token)
            if (response.status === 200) {
                const token = response.data.token
                sessionStorage.setItem("token", token)
                navigate('/dashboard')

            }
            else {
                console.log(response)
                alert(response.response.data.message)
            }

        }
    }
    return (
        <div style={{ height: '90vh' }}>
            <div className='d-flex justify-content-center align-items-center h-75'>
                <div className='border rounded shadow p-3 bg-primary'>
                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" onChange={(e) => setAdminData({ ...adminData, username: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setAdminData({ ...adminData, password: e.target.value })} />
                        </Form.Group>
                        <div className='d-flex justify-content-center'>
                            <button style={{ backgroundColor: 'greenyellow', color: 'black' }} className='btn ' onClick={handleLogin}>Login</button>
                        </div>
                    </Form>
                </div>

            </div>



        </div>
    )
}

export default Auth