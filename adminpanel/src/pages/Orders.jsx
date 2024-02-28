import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { getAllOrders } from '../services/allAPI';
function Orders() {
    const [orders, setOrders] = useState([])
    const getOrdersFromDb = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
            const result = await getAllOrders(reqHeader);
            // console.log(result)
            if (result.status === 200) {
                setOrders(result.data)
            }
            else {
                console.log(result.response.data)
            }
        }
        else {
            alert("Please Login")
        }
    }
    useEffect(() => {
        getOrdersFromDb()
    }, [])
    return (
        <>

            <div style={{ marginTop: '200px' }}>
                <h1 className='text-center'>Orders</h1>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='shadow border rounded p-4' style={{backgroundColor:'thistle',width:'20rem'}}>
                    <p className='text-center text-black fw-5' style={{fontSize:'20px',fontWeight:'900'}}>Total Orders : <span>{orders?.length}</span></p>
                    </div>
                </div>
                <div className='container mt-4'>
                    <Table>
                        <thead className='table-active '>
                            <tr>
                                <th>#</th>
                                <th>Order_id</th>
                                <th>Product ID</th>
                                <th>user ID</th>

                            </tr>
                        </thead>
                        <tbody>
                            {orders?.length > 0 ?
                                orders.map((item, index) => (
                                    <tr className='bg-info'>
                                        <td>{index + 1}</td>
                                        <td>{item._id}</td>
                                        <td>{item.productID}</td>
                                        <td>{item.userID}</td>
                                    </tr>
                                )) : <div><p className='text-center'>No Orders Yet</p></div>

                            }
                        </tbody>
                    </Table>
                </div>
            </div>

        </>
    )
}

export default Orders