import React from 'react'
import { Table } from 'react-bootstrap'
function Orders() {
    return (
        <>
            <h1 className='text-center'>Orders</h1>
            <div className='container mt-4'>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order_id</th>
                            <th>Product</th>
                            <th>username</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </div>

        </>
    )
}

export default Orders