import { Component } from "react";
import DataService from "../DataService";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { withRouter } from "react-router";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const valUsername = (value) => {
  if (value.length < 6 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 6 and 20 characters.
      </div>
    );
  }
};

const valPassword = (value) => {
  if (value.length < 2 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      errormessage: "",
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      DataService.login(this.state.username, this.state.password).then(res => {
        this.setState({message : res.data})
        this.props.history.push("/main");
        window.location.reload();
      }).catch(error => {
        this.setState({errormessage : error.response.message
        })
      });
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <Form
            onSubmit={this.handleSubmit}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  validations={[required, valUsername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required, valPassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Login</button>
              </div>
            </div>

            {this.state.errormessage && (
                <div className="form-group">
                  <div className={"alert alert-error"} role="alert">
                    {this.state.errormessage}
                  </div>
                </div>
            )}

            {this.state.message &&
              <div className="form-group">
                <div className={"alert alert-info"} role="alert">
                  {this.state.message}
                </div>
              </div>
            }
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
