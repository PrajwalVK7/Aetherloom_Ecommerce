import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { getAllUsersDetails } from '../services/allAPI'

function Users() {
    const [allUserData, setAllUserData] = useState()

    const getAllUserDataFromDb = async () => {
        try {
            const response = await getAllUsersDetails();
            if (response.status === 200) {
                setAllUserData(response.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getAllUserDataFromDb()
    }, [])

    return (
        <>
        
            <div style={{marginTop:'180px'}}>
            <h1 className='text-center'>All users</h1>
            <div className='d-flex justify-content-center align-items-center'>
                    <div className='shadow border rounded p-4' style={{backgroundColor:'thistle',width:'20rem'}}>
                    <p className='text-center text-black fw-5' style={{fontSize:'20px',fontWeight:'900'}}>Total Users : <span>{allUserData?.length}</span></p>
                    </div>
                </div>
            <div className='container mt-4'>
                <Table>
                    <thead className='table-active shadow rounded'>
                        <tr>
                            <th className='text-center text-black'>#</th>
                            <th  className='text-center text-black'>user_id</th>
                            <th  className='text-center text-black'>Name</th>
                            <th  className='text-center text-black'>Email</th>

                        </tr>
                    </thead>
                    <tbody>
                        {allUserData?.length > 0 ?
                            allUserData.map((item,index) => (
                                <tr className='shadow border-primary'>
                                    <td  className='text-center text-black'>{index+1}</td>
                                    <td  className='text-center text-black'>{item._id}</td>
                                    <td  className='text-center text-black'>{item.username}</td>
                                    <td  className='text-center text-black'>{item.email}</td>
                                </tr>
                            )) : <p className='text-center'>No users</p>

                        }
                    </tbody>
                </Table>
            </div>
            </div>

        </>)
}

export default Users