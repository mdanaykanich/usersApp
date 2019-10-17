import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = { snackbaropen: false, snackbarmsg: '' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:53762/api/users', 
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Id: this.props.userid, Name: event.target.Name.value })
        })
        .then(res => res.json())
        .then((result) => {
            this.setState({ snackbaropen: true, snackbarmsg: result })
        },
        (error) => {
            this.setState({ snackbaropen: true, snackbarmsg: 'Failed' })
        })
    }
    render() {
        return (
            <div className="container">
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackbaropen}
                    autoHideDuration={3000}
                    onClose={this.snackbarClose}
                    message={<span id="message-id">{this.state.snackbarmsg}</span>}
                    action={[
                        <IconButton key="close" aria-label="Close" color="inherit" onClick={this.snackbarClose}>
                            x
                        </IconButton>
                    ]}
                />
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit User
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="Id">
                                        <Form.Label>User Id</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="Id" 
                                        required 
                                        disabled 
                                        defaultValue={this.props.userid} 
                                        placeholder="User Id" />
                                    </Form.Group>
                                    <Form.Group controlId="Name">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="Name" 
                                        required 
                                        defaultValue={this.props.username}
                                        placeholder="Username" />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="primary" type="submit" onClick={this.props.onHide}>Update User</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}