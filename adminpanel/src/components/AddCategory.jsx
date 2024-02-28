import React, { useEffect } from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addCategory } from '../services/allAPI';
import { ToastContainer } from 'react-toastify';
import thumbnailDefault from '../assets/pexels-valeria-boltneva-1123262.jpg'

function AddCategory({ setCategoryStatus }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [thumbnailPreview, setThumbnailPreview] = useState("")
    const [token,setToken] = useState("")
    useEffect(()=>{
        if(sessionStorage.token){
            setToken(sessionStorage.getItem("token"))
        }
    },[])
    // console.log("token",token)

    const [category, setCategory] = useState({
        title: "",
        thumbnail: ""
    })
    useEffect(() => {
        if (category.thumbnail) {
            setThumbnailPreview(URL.createObjectURL(category.thumbnail))
        }
    }, [category.thumbnail])
    const handleUpload = async (e) => {
        e.preventDefault();
        const { title, thumbnail } = category;
        if (!title || !thumbnail) {
            alert("Please fill complete details")
        }
        else {
            try {
                const reqBody = new FormData();
                reqBody.append("title",title);
                reqBody.append("thumbnail",thumbnail);
                const reqHeader = {
                    "Content-Type":"multipart/form-data",
                    "Authorization": `Bearer ${token}`

                }
                // console.log("token aaa",token)

                const response = await addCategory(reqBody,reqHeader)
                // console.log(response.status)
                if (response.status === 200) {
                    alert("category added successfully")
                    setCategoryStatus(true)
                    setCategory({
                        title: "",
                        thumbnail: ""
                    })
                    handleClose()
                }
                else {

                    alert(response.response.data)
                    handleClose()
                }

            }
            catch (err) {
                console.log(err)
                setCategory({
                        title: "",
                })
                setThumbnailPreview("")
            }
        }
    }
    return (
        <div className='container d-flex justify-content-center'>
            <button className='btn text-black' style={{ backgroundColor: 'orange' }} onClick={handleShow} >Add Category <i class="fa-solid fa-list ms-2"></i></button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-black' style={{ color: 'black' }} >Add Category <i class="fa-solid fa-list"></i></Modal.Title>
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
                                    <img src={thumbnailPreview ? thumbnailPreview : thumbnailDefault} width={"200px"} height={"200px"} alt="" />
                                </div>
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpload}>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default AddCategory