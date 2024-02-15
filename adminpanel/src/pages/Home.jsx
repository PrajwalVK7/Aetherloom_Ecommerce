import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import AddCategory from '../components/AddCategory'
import AddProduct from '../components/AddProduct'
import Table from 'react-bootstrap/Table';
import { deleteById, deleteProductById, getAllCategories, getAllProducts, getProductsByCategory } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate()

    const [allCategory, setAllCategory] = useState()
    const [categoryStatus, setCategoryStatus] = useState(false)
    const [allProducts, setAllProducts] = useState()
    const [productStatus, setProductStatus] = useState(false)
    const [token, setToken] = useState('')

    useEffect(() => {
        if (sessionStorage.token) {
            setToken(sessionStorage.getItem("token"))
        }
        else {
            navigate('/')
        }
    }, [])
    console.log("token in home", token)
    const getAllcategoriesFromDb = async () => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        console.log("Req Body", reqHeader)
        const response = await getAllCategories(reqHeader);
        // console.log(response)
        if (response.status === 200) {
            setAllCategory(response.data)
        }

    }
    useEffect(() => {

        getAllcategoriesFromDb()
        setCategoryStatus(false)

    }, [categoryStatus,token])

    const getAllProductsFromDb = async () => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        try {
            const response = await getAllProducts(reqHeader);
            if (response.status === 200) {
                setAllProducts(response.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (sessionStorage.token) {
            getAllProductsFromDb()
            setProductStatus(false)
        }
        else {
            navigate('/')
        }
    }, [productStatus,token])
    const handleDeleteCategory = async (_id) => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        console.log("id is : ", _id)
        const response = await deleteById(_id,reqHeader)
        if (response.status === 200) {
            setCategoryStatus(true)

            alert("Category Deleted Successfully");
        }
        else {
            alert(response.response.data)
        }
    }


    const handleDeleteProduct = async (_id) => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const response = await deleteProductById(_id,reqHeader)
        if (response.status === 200) {
            setProductStatus(true)
            alert("Success")
        }
        else {
            alert(response.response.data)
        }
    }

    const getProductsByCategoryFromDb = async (category) => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const response = await getProductsByCategory(category,reqHeader)
        if (response.status === 200) {
            setAllProducts(response.data)
        }

    }
    return (
        <>
            <Row>
                <Col lg={6}>
                    <AddCategory setCategoryStatus={setCategoryStatus} />
                </Col>
                <Col lg={6}>
                    <AddProduct setProductStatus={setProductStatus} allCategory={allCategory} />
                </Col>
            </Row>
            <div className='mt-2 container-fluid'>
                <div className='mb-3 '>
                    <h4 className='text-center'>Categories</h4>

                    < div className='d-flex justify-content-evenly p-3' style={{ overflowX: 'scroll', scrollbarColor: 'yellow' }}>
                        {allCategory?.length > 0 ?
                            allCategory.map((item) => (
                                <div className=' ms-2'>
                                    <button className='btn w-100 ms-2 me-3' onClick={() => getProductsByCategoryFromDb(item.title)}>{item.title}</button>
                                    <div className='d-flex mt-2  text-center'>
                                        <button className='btn ' style={{ backgroundColor: 'skyblue' }}> <i class="fa-solid fa-pencil"></i></button>
                                        <button onClick={() => handleDeleteCategory(item._id)} className='btn ' style={{ backgroundColor: 'orangered' }}><i class="fa-solid fa-trash "></i></button>
                                    </div>


                                </div>

                            )) :
                            <p>No categories added</p>
                        }
                    </div>

                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>id</th>
                            <th>Title</th>
                            <th>Thumpnail</th>
                            <th>Description</th>
                            <th>price</th>
                            <th>GST</th>
                            <th></th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {allProducts?.length > 0 ?
                            allProducts.map((item, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item._id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.thumbnail}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>{item.gst}</td>
                                    <td><button className='btn ' style={{ backgroundColor: 'skyblue' }}> <i class="fa-solid fa-pencil"></i></button>
                                    </td>
                                    <td> <button className='btn ' style={{ backgroundColor: 'orangered' }}
                                        onClick={() => handleDeleteProduct(item._id)}><i class="fa-solid fa-trash "></i></button>
                                    </td>
                                </tr>
                            )) : <p>No products, please add products</p>
                        }
                    </tbody>
                </Table>

            </div >
        </>
    )
}


export default Home