import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer } from 'react-toastify';
import { baseURL } from '../services/baseURL';
import { editCategory } from '../services/allAPI';
import { editCategoryResponseContext } from '../context/ContextShare';
function EditCategory({ product }) {

    const {editCategoryResponse,setEditResponse} = useContext(editCategoryResponseContext)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [thumbnailPreview, setThumbnailPreview] = useState("")

    const [category, setCategory] = useState({
        id: product._id,
        title: product.title,
        thumbnail: ""
    })
    useEffect(() => {
        if (category.thumbnail) {
            setThumbnailPreview(URL.createObjectURL(category.thumbnail))
        }
    }, [category.thumbnail])

    const handleUpdate = async () => {


        const { id, title, thumbnail } = category;
        if (!title) {
            alert("Please fill the form completely");
        }
        else {
            try {
                const reqBody = new FormData();
                reqBody.append("title", title);
                reqBody.append("thumbnail", thumbnail);
                const token = sessionStorage.getItem("token");
                if (thumbnailPreview) {
                    const reqHeader = {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    };
                    const response = await editCategory(id, reqBody, reqHeader)
                    // console.log(response)
                    if(response.status===200){
                        alert("Category Updated Successfully")
                        handleClose()
                        setEditResponse(response)
                    }
                    else{
                        console.log(response.response.data)
                    }

                }
                else {
                    const reqHeader = {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    };
                    const response = await editCategory(id, reqBody, reqHeader)
                    // console.log(response)
                    if(response.status===200){
                        alert("Category Updated Successfully")
                        handleClose()
                        setEditResponse(response)

                    }
                    else{
                        console.log(response.response.data)
                    }

                }


            }
            catch (err) {
                console.log(err)
            }
        }



    }

    return (
        <>
            <button onClick={handleShow} className='btn ' style={{ backgroundColor: 'skyblue' }}> <i class="fa-solid fa-pencil"></i></button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-black' style={{ color: 'black' }} >Edit Category <i class="fa-solid fa-list"></i></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>Title</Form.Label>
                                <Form.Control value={category.title} type="text" placeholder="Enter Category Name" onChange={(e) => setCategory({ ...category, title: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Thumbnail</Form.Label>
                                <Form.Control type="file" placeholder="Upload the thumpnail " onChange={(e) => setCategory({ ...category, thumbnail: e.target.files[0] })} />

                                <div className='d-flex justify-content-center p-2'>
                                    <img src={thumbnailPreview ? thumbnailPreview : `${baseURL}uploads/${product.thumbnail}`} width={"200px"} height={"200px"} alt="" />
                                </div>
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleUpdate} variant="primary" >
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditCategory
