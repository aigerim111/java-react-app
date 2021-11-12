import {Component} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import DataService from "../DataService";
import moment from "moment";

class AddNotationForm extends Component{

    constructor(props) {
        super(props);

        this.state = {
            description: '',
            date: '',
            show: true,
            calendars: [],
            message: '',
            errormessage: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.notNotationModal();
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDate(e) {
        this.setState({
            date: moment(e.target.value).format('DD-MM-YYYY')
        });
    }

    handleSubmit(event){
        event.preventDefault();

        const calId = this.props.calId;
        const notation = {description: this.state.description, date: this.state.date}
        console.log(this.state.date);
        DataService.addNotation(calId, notation)
            .then( response => {
                    this.setState({
                        message: response.data

                    });
                this.handleClose();
                window.location.reload(false);
                })
            .catch(error => {
                this.setState({errormessage : error.response.data
                })
            })
    }


    render() {
        return (
            <>
                <Modal show={true} onHide={this.props.notNotationModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Notation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group className="mb-3" controlId="Description">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control type="textarea" placeholder="Enter description" onChange={this.onChangeDescription}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Date">
                                <Form.Label>Date:</Form.Label>
                                <Form.Control type="date" placeholder="Choose date" onChange={this.onChangeDate}/>
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

export default AddNotationForm;