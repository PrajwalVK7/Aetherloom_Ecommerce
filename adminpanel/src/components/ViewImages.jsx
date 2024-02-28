import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { baseURL } from '../services/baseURL';
function ViewImages({ images, name }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [productImages, setProductImages] = useState([])
    useEffect(() => {
        if (images) {
            setProductImages(images)
        }
    }, [images])
    // console.log("images",productImages)
    // console.log("imagesFGH",name)

    return (
        <>
            <button className='btn text-black' onClick={handleShow}>View Product Images <i class="fa-solid fa-eye ms-2"></i></button>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Total : {productImages.length}</h3>
                {productImages?.length > 0 ?
                    productImages.map((item) => (
                        <div>
                            <img src={`${baseURL}uploads/${item}`} height={'200px'} alt="" />
                        </div>
                    )) : <p>No Images</p>

                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal >
    </>
  )
}

export default ViewImages