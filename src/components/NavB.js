import {Component} from "react";
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Link } from "react-router-dom";
import DataService from "../DataService";
import EventBus from "../common/EventBus"
import AddCalendarForm from "./AddCalendarForm";
import {withRouter} from "react-router";


class NavB extends Component{
    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);

        this.state = {
            user: undefined,
            showAdmin: false,
            isModal: false,
            redirect: '',
            isFindCalendar: false,
        };

        this.handleAddCalendar = this.handleAddCalendar.bind(this);
        this.closeAddCalendar = this.closeAddCalendar.bind(this);
    }

    componentDidMount() {
        const currentUser = DataService.getCurrentUser();

        if (currentUser) {
            this.setState({
                user: currentUser,
                showAdmin: DataService.getCurrentUserRole().includes("ROLE_ADMIN")
            });
        }

        EventBus.on("logout", () => {
            this.logOut();
        });

    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        DataService.logout();
        this.setState({
            user: undefined,
            showAdmin: false
        });
    }

    handleAddCalendar(){
        this.setState({isModal: true})
    }

    closeAddCalendar(){
        this.setState({isModal: false})
    }

    render() {
        const currentUser = this.state.user;

        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    {this.state.isModal && <AddCalendarForm notModel={this.closeAddCalendar}/>}

                    <Navbar.Brand >Calendar App</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/main">Home</Nav.Link>
                        {currentUser === undefined ? (
                            <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Nav.Link>
                                            <Link className={'linkText'} to={"/register"}>Register</Link>
                                        </Nav.Link>
                                    </li>
                                    <li className="nav-item">
                                        <Nav.Link>
                                            <Link className={'linkText'} to={"/login"}>Login</Link>
                                        </Nav.Link>
                                    </li>
                                </div>
                            ) : (
                                <div>
                                    {this.state.showAdmin ? (
                                            <div className="navbar-nav ml-auto">
                                                <li className="nav-item">
                                                    <Nav.Link>
                                                        <Link className={'linkText'} to={"/admin"}>admin</Link>
                                                    </Nav.Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Nav.Link onClick={this.logOut} >
                                                        <Link className={'linkText'} to={'/main'}>Logout</Link>
                                                    </Nav.Link>
                                                </li>
                                            </div>
                                    ) : (
                                        <div className="navbar-nav ml-auto">
                                            <li className="nav-item">
                                                <Nav.Link>
                                                    <Link className={'linkText'} to={"/user"}>{currentUser.username}</Link>
                                                </Nav.Link>
                                            </li>
                                            <li className="nav-item">
                                                <Nav.Link onClick={this.logOut} >
                                                    <Link className={'linkText'} to={'/main'}>Logout</Link>
                                                </Nav.Link>
                                            </li>
                                            <li className="nav-item">
                                                <Nav.Link className={'linkText'} onClick={this.handleAddCalendar}>
                                                    Add Calendar
                                                </Nav.Link>
                                            </li>
                                            <li className="nav-item">
                                                <Nav.Link>
                                                    <Link className={'linkText'} to={'/findCalendar'}>Find Calendar</Link>
                                                </Nav.Link>
                                            </li>
                                        </div>
                                    )
                                    }
                                </div>
                            )
                        }
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}

export default withRouter(NavB);