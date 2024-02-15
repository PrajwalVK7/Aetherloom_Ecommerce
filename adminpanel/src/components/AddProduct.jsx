import React, { useEffect } from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import { addProduct } from '../services/allAPI';
import thumbnailDefault from '../assets/pexels-valeria-boltneva-1123262.jpg'


function AddProduct({ allCategory, setProductStatus }) {
    const [show, setShow] = useState(false);
    console.log(allCategory)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [thumbnailPreview, setThumbnailPreview] = useState("")
    const [token,setToken] = useState('');
    useEffect(()=>{
        if(sessionStorage.token){
            setToken(sessionStorage.getItem("token"))
        }
    },[])

    const [productData, setProductData] = useState({
        name: "",
        category: "",
        thumbnail: "",
        description: "",
        price: "",
        images: "",
        gst:""
    })
    useEffect(() => {
        if (productData.thumbnail) {
            setThumbnailPreview(URL.createObjectURL(productData.thumbnail))
        }
    }, [productData.thumbnail])
    console.log(productData)
    const handleUpload = async (e) => {
        e.preventDefault();
        const { name, category, thumbnail, description, price, images,gst } = productData
        if (!name || !description || !price || !thumbnail ) {
            alert("Please add all details")
        }
        else {
            try {
                const reqBody = new FormData();
                reqBody.append("name", name);
                reqBody.append("category", category);
                reqBody.append("thumbnail", thumbnail);
                reqBody.append("description", description)
                reqBody.append("price", price);
                reqBody.append("gst",gst)
                if (images && images.length > 0) {
                    for (let i = 0; i < images.length; i++) {
                        reqBody.append("images", images[i]);
                    }
                }               
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization":`Bearer ${token}`
                }


                const response = await addProduct(reqBody, reqHeader);


                if (response.status === 200) {
                    setProductStatus(true)
                    alert("Product uploaded successfully")
                    handleClose()

                }
                else {
                    alert(response.response.data)
                }
            } catch (err) {
                console.log(`Product is not added due to ${err}`)
            }
        }

    }
    const handleClear = (e) => {
        e.preventDefault();
        setProductData({
            name: "",
            category: "",
            thumbnail: "",
            description: "",
            price: "",
            images: "",
            gst:""
        })
        setThumbnailPreview("")

    }
    return (
        <div className='container d-flex justify-content-center'>
            <button className='btn text-black' style={{ backgroundColor: 'orange' }} onClick={handleShow}>Add Product <i class="fa-solid fa-upload ms-2"></i></button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-black'>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label className='text-black'>Title</Form.Label>
                                <Form.Control value={productData.name} onChange={(e) => setProductData({ ...productData, name: e.target.value })} type="text" placeholder="Enter Product Name" />
                            </Form.Group>

                            <InputGroup className="mb-3">
                                <DropdownButton
                                    variant="outline-secondary"
                                    title="Select Category"
                                    id="input-group-dropdown-1"
                                >
                                    {allCategory?.length > 0 ?
                                        allCategory.map((item) => (
                                            <Dropdown.Item value={productData.category} onClick={() => setProductData({ ...productData, category: item?.title })}>{item?.title}</Dropdown.Item>
                                        )) : <p>No categories listed</p>
                                    }
                                </DropdownButton>
                                <Form.Control aria-label="Text input with dropdown button" />
                            </InputGroup>
                            <Form.Group className="mb-3" >
                                <Form.Label>Thumpnail</Form.Label>
                                <Form.Control id='thumbnail' type="file" placeholder="Upload the thumpnail "
                                    onChange={(e) => setProductData({ ...productData, thumbnail: e.target.files[0] })} />
                                <div className='d-flex justify-content-center p-2'>
                                    <img src={thumbnailPreview ? thumbnailPreview : thumbnailDefault} width={"200px"} height={"200px"} alt="" />
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <textarea value={productData.description} onChange={(e) => setProductData({ ...productData, description: e.target.value })} className='form-control' cols={30} rows={4} placeholder="Enter Product Description" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Price</Form.Label>
                                <Form.Control value={productData.price} onChange={(e) => setProductData({ ...productData, price: e.target.value })} type="number" placeholder="Enter Product Price" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>GST</Form.Label>
                                <Form.Control value={productData.gst} onChange={(e) => setProductData({ ...productData, gst: e.target.value })} type="number" placeholder="Enter Product Price" />
                            </Form.Group>
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                <Form.Label>Product Images</Form.Label>
                                <Form.Control type="file" id='images' name='images' multiple placeholder='Multiple Images' 
                                onChange={(e) => setProductData({ ...productData, images: e.target.files })} />
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClear}>
                        Clear
                    </Button>
                    <Button variant="primary" onClick={handleUpload}>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default AddProduct