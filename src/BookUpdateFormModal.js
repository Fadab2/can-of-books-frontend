import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form'

export default class BookFromModal extends Component {
handleSubmit = (e) => {
    e.preventDefault()
    this.props.updateBooks(e.target.formName.value, e.target.formDesc.value, e.target.formStat.value)
    this.props.closeForm()
}

    render() {
        return (
            <div>
                <Modal show={this.props.form} onHide={this.props.closeForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Book</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="name" placeholder="Enter Book Name"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDesc">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="name" placeholder="Enter Description" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formStat">
                                <Form.Check type="checkbox" label="Read" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                        </Form></Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.closeForm}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}