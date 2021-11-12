import {Component} from "react";
import DataService from "../DataService";
import {Table} from "react-bootstrap";
import {Redirect} from "react-router";
import * as React from "react";

class UserList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            redirect: null,
            message: "",
        };
    }

    componentDidMount() {
        const user = DataService.getCurrentUser();

        if (user) {
            DataService.userList().then((res) => {
                this.setState({ users: res.data });
            });
        } else {
            this.setState({ redirect: "/main" });
        }
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }

        return(
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {this.state.users.map(user => (
                    <tr>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        )
    }
}

export default UserList;