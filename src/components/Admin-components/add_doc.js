import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../Services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
         Это поле обязательно к заполнению!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Это не правильный адрес электронной почты.
      </div>
    );
  }
};

/*const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};*/

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePatronymic = this.onChangePatronymic.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeSurnamee = this.onChangeSurnamee.bind(this);
    this.onChangelogin = this.onChangelogin.bind(this);

    this.state = {
      login:"",
      name: "",
      surname:"",
      patronymic:"",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  
  onChangelogin(e) {
    this.setState({
      login: e.target.value
    });
  }

  
  onChangeSurnamee(e) {
    this.setState({
      surname: e.target.value
    });
  }

  
  onChangePatronymic(e) {
    this.setState({
      patronymic: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.registerDoc(
        this.state.login,
        this.state.password,
        this.state.email,
        this.state.name,
        this.state.surname,
        this.state.patronymic
        
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
       <div className="container reg col-md-12">
        <div className="container-fulid  card">
          <h1>Регистрация врача</h1>
          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="surname">Фамилия</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="surname"
                    value={this.state.surname}
                    onChange={this.onChangeSurnamee}
                    validations={[required]}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="name">Имя</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeUsername}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="patronymic">Отчество</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="patronymic"
                    value={this.state.patronymic}
                    onChange={this.onChangePatronymic}
                    validations={[required]}
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
                    validations={[required, email]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="login">Логин</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="login"
                    value={this.state.login}
                    onChange={this.onChangelogin}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Пароль</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary ">Зарегестрировать</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}