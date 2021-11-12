import {Component} from "react";
import {Button, Form} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import DataService from "../DataService";

class AddCalendarForm extends Component{
    constructor(props) {
        super(props);

        this.state = {
            calName: '',
            errormessage: "",
            message: '',
            show: true
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    showModal() {
        this.setState({
          show : true,
        })
    }

    handleClose() {
        this.props.notModel();
    }

    onChangeName(e) {
        this.setState({
            calName: e.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();

        const username = DataService.getCurrentUsername()
        DataService.addCalendar(this.state.calName,username)
            .then( response => {
                    this.setState({
                        message: response.data
                    });
                this.handleClose();
                window.location.reload(false);
                }).catch(error => {
            this.setState({errormessage : error.response.data
            })
        })

    }

    render() {
        return (
            <>
                <Modal show={this.state.show} onHide={this.props.notModel}>
                    <Modal.Header closeButton>
                        <Modal.Title>Enter your new calendar's name</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="CalendarName">
                                <Form.Label>Calendar Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter new calendar name" onChange={this.onChangeName}/>
                            </Form.Group>

                            {this.state.errormessage && (
                                <div className="form-group">
                                    <div className={"alert alert-info"} role="alert">
                                        {this.state.errormessage}
                                    </div>
                                </div>
                            )}

                            {this.state.message && (
                                <div className="form-group">
                                    <div className={"alert alert-info"} role="alert">
                                        {this.state.message}
                                    </div>
                                </div>
                            )}

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
    }


export default AddCalendarForm;