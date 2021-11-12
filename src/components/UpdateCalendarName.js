import {Component} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import DataService from "../DataService";

class UpdateCalendarName extends Component{

    constructor(props) {
        super(props);

        this.state = {
            newName: '',
            show: true,
            message: '',
            errormessage: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.notUpdateModal();
    }

    onChangeName(e) {
        this.setState({
            newName: e.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();

        const calId = this.props.calId;
        const newName = this.state.newName
        DataService.updateCalendar(calId, newName)
            .then( response => {
                    this.setState({
                        message: response.data
                    });
                this.handleClose();
                window.location.reload(false);
                }).catch(error => {
            this.setState({errormessage : error.response.data
            })
        });
    }


    render() {
        return (
            <>
                <Modal show={true} onHide={this.props.notUpdateModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Notation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="Description">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control type="textarea" placeholder="Enter description" onChange={this.onChangeName}/>
                            </Form.Group>

                            {this.state.errormessage && (
                                <div className="form-group">
                                    <div className={"alert alert-error"} role="alert">
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

                            <Button variant="dark" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default UpdateCalendarName;