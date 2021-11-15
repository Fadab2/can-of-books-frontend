import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form'

export default class BookFromModal extends Component {
handleSubmit = (e) => {
    e.preventDefault()
    this.props.setStateOfFrom(e.target.formName.value, e.target.formDesc.value, e.target.formStat.value)
    this.props.closeModal()
}

    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a Book</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="name" placeholder="Enter Book Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDesc">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="name" placeholder="Enter Description" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formStat">
                                <Form.Check type="checkbox" label="Read" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form></Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}



