import * as React from "react";
import DataService from "../DataService";
import Card from "react-bootstrap/Card";
import { Component } from "react";
import { Redirect } from "react-router";
import { Button, Col, Container, Row } from "react-bootstrap";
import AddNotationForm from "./AddNotationForm";
import UpdateCalendarName from "./UpdateCalendarName";


class CalendarList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      calendars: [],
      redirect: null,
      isAddNotation: false,
      isUpdateName: false,
      message: "",
    };

    this.handleAddNotation = this.handleAddNotation.bind(this);
    this.closeAddNotation = this.closeAddNotation.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.closeUpdate = this.closeUpdate.bind(this);
  }

  componentDidMount() {
    const user = DataService.getCurrentUser();

    if (user) {
      DataService.getCalendarList().then((res) => {
        this.setState({ calendars: res.data });
      });
    } else {
      this.setState({ redirect: "/main" });
    }
  }

  handleAddNotation() {
    this.setState({
      isAddNotation: true
    });
  }

  closeAddNotation() {
    this.setState({
      isAddNotation: false
    });
  }

  handleUpdate() {
    this.setState({
      isUpdateName: true
    });
  }

  closeUpdate() {
    this.setState({
      isUpdateName: false
    });
  }

  handleDeleteCalendar(calId) {
    DataService.deleteCalendar(calId).then((res) => {
      this.setState({ message: res.data });
    });

    window.location.reload(false);
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <Container>
        <h2>Calendars</h2>
        <Row>
          {this.state.calendars.map((calendar) => (
            <Col md={"auto"}>
              {this.state.isAddNotation && (
                  <AddNotationForm
                      notNotationModal={this.closeAddNotation}
                      calId={calendar.calendarId}
                  />
              )}

              {this.state.isUpdateName && (
                  <UpdateCalendarName
                      notUpdateModal={this.closeUpdate}
                      calId={calendar.calendarId}
                  />
              )}
              <Card
                bg="dark"
                text="white"
                style={{ width: "18rem" }}
                className="mb-2"
              >
                <Card.Body>
                  <Card.Title>
                    <h4>Title:</h4> {calendar.calendarName}
                  </Card.Title>
                  <Card.Text>
                    <h4>ID: </h4>
                    {calendar.calendarId}
                  </Card.Text>
                  <Card.Text>
                    <h4>Unique code: </h4>
                    {calendar.uniqueCode}
                  </Card.Text>
                  <Card.Text>
                    <h4>Notations:</h4>
                    {calendar.notations.map((note) => (
                      <div>
                        <li>{note.description}</li>
                        <li>{note.date}</li>
                      </div>
                    ))}
                  </Card.Text>
                  <Button
                    variant="light"
                    onClick={this.handleAddNotation}
                  >
                    {this.state.isAddNotation}
                    Add Notation
                  </Button>
                  <br/>
                  <br/>
                  <Button
                      variant="light"
                      onClick={this.handleUpdate}
                  >
                    Update Calendar Name
                  </Button>
                  <br/>
                  <br/>
                  <Button
                    variant="light"
                    onClick={()=> {this.handleDeleteCalendar(calendar.calendarId)}}
                  >
                    Delete Calendar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

export default CalendarList;
