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
            <h1 className='text-center'>All users</h1>
            <div className='container mt-4'>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>user_id</th>
                            <th>Name</th>
                            <th>Email</th>

                        </tr>
                    </thead>
                    <tbody>
                        {allUserData?.length > 0 ?
                            allUserData.map((item,index) => (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{item._id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                </tr>
                            )) : <p>No users</p>

                        }
                    </tbody>
                </Table>
            </div>

        </>)
}

export default Users