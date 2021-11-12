import { Component } from "react";
import { Button, Card, Form } from "react-bootstrap";
import * as React from "react";
import DataService from "../DataService";

class findCalendarForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uniqueCode: "",
      data: "",
      message: "",
    };

    this.onChangeUniqueCode = this.onChangeUniqueCode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeUniqueCode(e) {
    this.setState({
      uniqueCode: e.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.uniqueCode) {
      DataService.findCalendar(this.state.uniqueCode).then(
        (res) => {
          this.setState({
            data: res.data,
          });
        }, err => {
          this.setState({message: 'Something wrong happened! Enter right unique code!'})
          }
      );
    }
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="UniqueCode">
            <Form.Label>Calendar uniqueCode</Form.Label>
            <br />
            <Form.Control
              type="text"
              placeholder="Enter unique code"
              onChange={this.onChangeUniqueCode}
            />
          </Form.Group>

          {this.state.message && (
            <div className="form-group">
              <div className={"alert alert-info"} role="alert">
                {this.state.message}
              </div>
            </div>
          )}
          <Button variant="primary" type="submit">
            Find
          </Button>
        </Form>

          <br/>
        {this.state.data && (
          <Card
            bg="dark"
            text="white"
            style={{ width: "18rem" }}
            className="mb-2"
          >
            <Card.Header>Calendar</Card.Header>
            <Card.Body>
              <Card.Text>
                <h4>Owner:</h4>
                {this.state.data.username}
              </Card.Text>
              <Card.Text>
                <h4>Calendar name:</h4>
                {this.state.data.calendar.calendarName}</Card.Text>
              <Card.Text>
                <h4>Notations:</h4>
                {this.state.data.calendar.notations.map((note) => (
                  <div>
                    <li>{note.description}</li>
                    <li>{note.date}</li>
                  </div>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}

export default findCalendarForm;
