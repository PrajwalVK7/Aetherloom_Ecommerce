import React, { useEffect } from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import { baseURL } from '../services/baseURL';
import { editProduct } from '../services/allAPI';
function EditProduct({ product, allCategory,setEditStatus }) {
    const [show, setShow] = useState(false);
    // console.log(allCategory)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [thumbnailPreview, setThumbnailPreview] = useState("")
    const [imagesPreview, setImagesPreview] = useState([])

    const [productData, setProductData] = useState({
        id: product._id,
        name: product.name,
        category: product.category,
        thumbnail: "",
        description: product.description,
        price: product.price,
        images: [],
        gst: product.gst
    })
    useEffect(() => {
        if (productData.thumbnail) {
            setThumbnailPreview(URL.createObjectURL(productData.thumbnail))
        }
    }, [productData.thumbnail]);

    useEffect(() => {
        // console.log("productData.images:", productData.images);

        const imagesArray = Array.from(productData.images);

        if (Array.isArray(imagesArray) && imagesArray.length > 0) {
            const previews = imagesArray.map((item) => URL.createObjectURL(item));
            // console.log("Previews", previews);
            setImagesPreview(previews);
        }
    }, [productData.images]);








    // console.log("fghj", product.images)
    const handleUpdate = async (e) => {
        e.preventDefault()
        const { id, name, category, description, price, gst, thumbnail, images } = productData;
        const token = sessionStorage.getItem("token")

        if (!name || !category || !description || !price || !gst) {
            alert("Please Fill Add Details")
        }
        else {
            try {
                const reqBody = new FormData();
                reqBody.append("name", name);
                reqBody.append("category", category);
                reqBody.append("thumbnail", thumbnail);
                reqBody.append("description", description)
                reqBody.append("price", price);
                reqBody.append("gst", gst)
                if (images && images.length > 0) {
                    for (let i = 0; i < images.length; i++) {
                        reqBody.append("images", images[i]);
                    }
                }

                if (thumbnailPreview || imagesPreview) {
                    const reqHeader = {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                    const response = await editProduct(id, reqBody, reqHeader)
                    // console.log(response)
                    if (response.status === 200) {
                        handleClose()
                        setEditStatus(true)
                    }
                    else {
                        console.log(response.response.data)
                    }
                } else {
                    const reqHeader = {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                    const response = await editProduct(id, reqBody, reqHeader)
                    // console.log(response)
                    if (response.status === 200) {
                        handleClose()
                        setEditStatus(true)

                    }
                    else {
                        console.log(response.response.data)
                    }
                }

            } catch (err) {

            }
        }

    }

    // console.log(productData)
    const handleReset = (e) => {
        e.preventDefault()
        setProductData({
            id: product._id,
            name: product.name,
            category: product.category,
            thumbnail: "",
            description: product.description,
            price: product.price,
            images: [],
            gst: product.gst
        })
        setImagesPreview([]);
        setThumbnailPreview('')

    }
    return (
        <>
            <button className='btn ' style={{ backgroundColor: 'skyblue' }} onClick={handleShow}> <i class="fa-solid fa-pencil"></i></button>
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
                                    <img src={thumbnailPreview ? thumbnailPreview : `${baseURL}uploads/${product.thumbnail}`} width={"200px"} height={"200px"} alt="" />
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
                            {
                                imagesPreview.length > 0 ? (
                                    imagesPreview.map((item, index) => (
                                        <div key={index}>
                                            <img className='mt-2 ms-3' src={item} width={"200px"} height={"200px"} alt="" />
                                        </div>))
                                ) : (
                                    product.images?.length > 0 ? (
                                        product.images.map((item, index) => (
                                            <div key={index}>
                                                <img className='mt-2 ms-3' src={`${baseURL}uploads/${item}`} width={"200px"} height={"200px"} alt="" />
                                            </div>
                                        ))
                                    ) : (
                                        <p>No data</p>
                                    )
                                )
                            }

                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleUpdate} >
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditProduct