import React from 'react'
import { Col, Row } from 'react-bootstrap'

function Dashboard() {
    return (
        <div>
            <div style={{ marginTop: '180px' }}>

                <div className='container'>
                    <Row>
                            <Col lg={4}>
                                <div className='d-flex mb-4 text-center flex-column align-items-center justify-content-center'>
                                        <div className=' mb-4 container shadow d-flex align-items-center justify-content-center rounded ' style={{height:'12rem',backgroundColor:'violet'}}>
                                        <p><span>5</span> Categories</p>
                                        </div>
                                        <div className='container shadow d-flex align-items-center justify-content-center rounded' style={{height:'22rem',backgroundColor:'yellowgreen'}}>
                                        <p><span>5</span>Products</p>
                                        </div>
                                </div>
                            </Col>
                            <Col lg={8}>
                            <Row>
                                <Col lg={12}>
                                <div className=' mb-4  container shadow d-flex align-items-center justify-content-center rounded' style={{height:'15rem',backgroundColor:'teal'}}>
                                        <p><span>5+</span> Orders</p>
                                        </div>
                                </Col>
                                <Col lg={12}>
                                <div className='container shadow d-flex align-items-center justify-content-center rounded' style={{height:'15rem',backgroundColor:'steelblue'}}>
                                        <p><span>5+</span> Users</p>
                                        </div>
                                </Col>

                            </Row>
                            </Col>
                    </Row>
                </div>

            </div>
        </div>
    )
}

export default Dashboard