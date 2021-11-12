import { Component } from "react";
import DataService from "../DataService";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const valEmail = (email) => {
  if (!isEmail(email)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
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
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      message: "",
      errormessage: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
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
      const user = {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      };

      DataService.register(user).then(res => {
        this.setState({message: res.data})
      }).catch(error => {
        this.setState({errormessage : error.response.data
        })
      })

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
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  validations={[required, valEmail]}
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
                <button className="btn btn-primary btn-block">Register</button>
              </div>
            </div>

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

export default RegisterForm;
