import React, { useContext, useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import AddCategory from '../components/AddCategory'
import AddProduct from '../components/AddProduct'
import Table from 'react-bootstrap/Table';
import { deleteById, deleteProductById, getAllCategories, getAllProducts, getProductsByCategory } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import EditCategory from '../components/EditCategory';
import { editCategoryResponseContext } from '../context/ContextShare';
import { baseURL } from '../services/baseURL';
import ViewImages from '../components/ViewImages';
import EditProduct from '../components/EditProduct';

function Home() {
    const { editCategoryResponse, setEditResponse } = useContext(editCategoryResponseContext)

    const navigate = useNavigate()

    const [allCategory, setAllCategory] = useState()
    const [categoryStatus, setCategoryStatus] = useState(false)
    const [allProducts, setAllProducts] = useState()
    const [productStatus, setProductStatus] = useState(false)
    const [searchKey, setSearchKey] = useState('')
    const [editStatus, setEditStatus] = useState(false)
    const getAllcategoriesFromDb = async () => {
        const token = sessionStorage.getItem("token")

        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        // console.log("Req Body", reqHeader)
        const response = await getAllCategories(reqHeader);
        // console.log(response)
        if (response.status === 200) {
            setAllCategory(response.data)
        }

    }
    useEffect(() => {

        getAllcategoriesFromDb()
        setCategoryStatus(false)

    }, [categoryStatus, editCategoryResponse])

    const getAllProductsFromDb = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        try {
            const response = await getAllProducts(searchKey, reqHeader);
            console.log(response)
            if (response.status === 200) {
                setAllProducts(response.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getAllProductsFromDb()
        setProductStatus(false)
        setEditStatus(false)
    }, [productStatus, editStatus])
    const handleDeleteCategory = async (_id) => {
        const token = sessionStorage.getItem("token")

        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        console.log("id is : ", _id)
        const response = await deleteById(_id, reqHeader)
        if (response.status === 200) {
            setCategoryStatus(true)

            alert("Category Deleted Successfully");
        }
        else {
            alert(response.response.data)
        }
    }


    const handleDeleteProduct = async (_id) => {
        const token = sessionStorage.getItem("token")

        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const response = await deleteProductById(_id, reqHeader)
        if (response.status === 200) {
            setProductStatus(true)
            alert("Success")
        }
        else {
            alert(response.response.data)
        }
    }

    const getProductsByCategoryFromDb = async (category) => {
        const token = sessionStorage.getItem("token")

        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const response = await getProductsByCategory(category, reqHeader)
        if (response.status === 200) {
            setAllProducts(response.data)
        }

    }
    return (
        <>
           
            <Row style={{ marginTop: '150px' }}>
                <Col lg={6}>
                    <AddCategory setCategoryStatus={setCategoryStatus} />
                </Col>
                <Col lg={6}>
                <div className='d-flex justify-content-center align-items-center'>
                    <div className='shadow border rounded p-4' style={{backgroundColor:'thistle',width:'15rem'}}>
                    <p className='text-center text-black fw-5' style={{fontSize:'20px',fontWeight:'900'}}>Total Categories : <span>{allCategory?.length}</span></p>
                    </div>
                    <div className='shadow border rounded p-4 ms-3' style={{backgroundColor:'thistle',width:'15rem'}}>
                    <p className='text-center text-black fw-5' style={{fontSize:'20px',fontWeight:'900'}}>Total Products : <span>{allProducts?.length}</span></p>
                    </div>
                </div>
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
                                        <EditCategory setEditStatus={setEditStatus} product={item} />
                                        <button onClick={() => handleDeleteCategory(item._id)} className='btn ' style={{ backgroundColor: 'orangered' }}><i class="fa-solid fa-trash "></i></button>
                                    </div>


                                </div>

                            )) :
                            <p>No categories added</p>
                        }
                    </div>

                </div>
                <Table className='tebale border'>
                    <thead className='table-active rounded'>
                        <tr>
                            <th>#</th>
                            <th>id</th>
                            <th>Title</th>
                            <th>Thumpnail</th>
                            <th>Images</th>
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
                                <tr className='border shadow mt-2 mb-2'>
                                    <td>{index + 1}</td>
                                    <td>{item._id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <img src={`${baseURL}uploads/${item.thumbnail}`} height={'200px'} width={'200px'} alt={item.thumbnail} /></td>
                                    <td><ViewImages images={item.images} name={item.name} /></td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>{item.gst}</td>
                                    <td><EditProduct setEditStatus={setEditStatus} product={item} allCategory={allCategory} />
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