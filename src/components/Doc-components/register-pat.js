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
/*
const vusername = value => {
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
};
*/
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSaveInfo = this.onSaveInfo.bind(this);
    this.onChangeLogin = this.onChangeLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeMinDP = this.onChangeMinDP.bind(this);
    this.onChangeMaxDP = this.onChangeMaxDP.bind(this);
    this.onChangeMinP = this.onChangeMinP.bind(this);
    this.onChangeMaxP = this.onChangeMaxP.bind(this);
    this.onChangePolicy = this.onChangePolicy.bind(this);
    this.onChangeWieght = this.onChangeWieght.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
    this.onChangeMinSP = this.onChangeMinSP.bind(this);
    this.onChangeMaxSP = this.onChangeMaxSP.bind(this);
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeSuN = this.onChangeSuN.bind(this);
    this.onChangePatronymic = this.onChangePatronymic.bind(this);
    
    this.state = {
          login: "",
          password: "",
          email: "",
          policy_number: "",
          min_pulse: "",
          max_pulse: "",
          height: "",
          weight: "",
          min_systolic_pressure: "",
          max_systolic_pressure: "",
          min_diastolic_pressure: "",
          max_diastolic_pressure: "",
          name: "",
          surname: "",
          patronymic: "",
          user_id: "",
      successful: false,
      successful1: false,
      message: "",
      successful11: false,
      message3: "",
      message1: "",
      showInfo: false,
      showRec: false
    };
  }

  showInfo = () => {
    if(this.state.showInfo) this.setState({showInfo: false})
    else this.setState({showInfo: true})
    this.state.showRec=false;
}

showRec = () => {
    if(this.state.showRec) this.setState({showRec: false})
    else this.setState({showRec: true})
    this.state.showInfo=false;
}
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangeLogin(e) {
    this.setState({
      login: e.target.value
    });
  }

  onChangePolicy(e) {
    this.setState({
      policy_number: e.target.value
    });
  }
  onChangeMinP(e) {
    this.setState({
      min_pulse: e.target.value
    });
  }
  onChangeMaxP(e) {
    this.setState({
      max_pulse: e.target.value
    });
  }
  onChangeHeight(e) {
    this.setState({
      height: e.target.value
    });
  }
  onChangeWieght(e) {
    this.setState({
      weight: e.target.value
    });
  }
  onChangeMinSP(e) {
    this.setState({
      min_systolic_pressure: e.target.value
    });
  }
  onChangeMaxSP(e) {
    this.setState({
      max_systolic_pressure: e.target.value
    });
  }
  onChangeMinDP(e) {
    this.setState({
      min_diastolic_pressure: e.target.value
    });
  }
  onChangeMaxDP(e) {
    this.setState({
      max_diastolic_pressure: e.target.value
    });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeSuN(e) {
    this.setState({
      surname: e.target.value
    });
  }
  onChangePatronymic(e) {
    this.setState({
    patronymic: e.target.value
    });
  }
  onSave(e){
    e.preventDefault();
    this.setState({
      message1: "",
      successful1: false
    });
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.reg_fio( 
      this.state.name,
      this.state.surname,
      this.state.patronymic,
      this.state.user_id)
      .then(
        response => {
          this.setState({
            message1: response.data.message,
            successful1: true
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
            successful1: false,
            message1: resMessage
          });
        }
      );
    }
  }
  onSaveInfo(e){
    e.preventDefault();
    this.setState({
      message3: "",
      successful11: false
    });
    if (this.checkBtn.context._errors.length === 0) {
    AuthService.reg_info(
      this.state.policy_number,
      this.state.min_pulse,
      this.state.max_pulse,
      this.state.height,
      this.state.weight,
      this.state.min_systolic_pressure,
      this.state.max_systolic_pressure,
      this.state.min_diastolic_pressure,
      this.state.max_diastolic_pressure,
      this.state.user_id
      )
      .then(
        response => {
          this.setState({
            message3: response.data.message,
            successful11: true
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
            successful11: false,
            message3: resMessage
          });
        }
      );
    }
  }
  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      user_id:""
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
       AuthService.register(
        this.state.login,
        this.state.password,
        this.state.email     
      )
     .then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true,
            user_id: response.data.id
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
      <div className="container reg">
        <div className="container-fulid">
          <h1>Регистрация пациента</h1>
          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group ">
                  <label htmlFor="login">Логин</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="login"
                    value={this.state.login}
                    onChange={this.onChangeLogin}
                   // validations={[required, vusername]}
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
                  <label htmlFor="password">Пароль</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                   // validations={[required, vpassword]}
                  />
                 </div>
               
                
                
                <div className="form-group">
                  <button className="btn btn-primary btn-block button" >Зарегистрировать</button>
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
          
          {this.state.message && (<Form
            onSubmit={this.onSave}
            ref1={c => {
              this.form = c;
            }}> 
            <h1>Введите ФИО пациента!</h1>
            <div className="form-group">
                    <label htmlFor="surname">Фамилия</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="text"
                      placeholder="Иванов"
                      value={this.state.surname}
                      onChange={this.onChangeSuN}
                      //validations={[required, vpassword]}
                    />
                  </div>
            
            <div className="form-group">
                    <label htmlFor="name">Имя</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Иван"
                      value={this.state.name}
                      onChange={this.onChangeName}
                      //validations={[required, vpassword]}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="patronymic">Отчество</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="patronymic"
                      placeholder="Иванович"
                      value={this.state.patronymic}
                      onChange={this.onChangePatronymic}
                      //validations={[required, vpassword]}
                    />
                  </div>
                
                 
                {this.state.message1 && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful1
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message1}
                  </div>
                  </div>
                )}
                <CheckButton
              style={{ display: "none" }}
              ref1={c => {
                this.checkBtn = c;
                
              }}
            /><Form
            onSubmit={this.onSaveInfo}
            ref={c => {
              this.form = c;
            }}> <h1>Введите данные пациента!</h1>
                  <div className="form-group">
                    <label htmlFor="policy_number">Номер полиса</label>
                    <Input
                      type="number"
                      className="form-control"
                      name="policy_number"
                      value={this.state.policy_number}
                      onChange={this.onChangePolicy}
                      //validations={[required, vpassword]}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="min_pulse">Минимальное значение пульса</label>
                    <Input
                      type="number"
                      className="form-control"
                      name="min_pulse"
                      value={this.state.min_pulse}
                      onChange={this.onChangeMinP}
                      //validations={[required, vpassword]}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="max_pulse">Максимальное значение пульса</label>
                    <Input
                      type="number"
                      className="form-control"
                      name="max_pulse"
                      value={this.state.max_pulse}
                      onChange={this.onChangeMaxP}
                      //validations={[required, vpassword]}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="height">Рост</label>
                    <Input
                      type="number"
                      className="form-control"
                      name="height"
                      value={this.state.height}
                      onChange={this.onChangeHeight}
                      //validations={[required, vpassword]}
                    />
                  </div><div className="form-group">
                    <label htmlFor="weight">Вес</label>
                    <Input
                      type="number"
                      className="form-control"
                      name="weight"
                      value={this.state.weight}
                      onChange={this.onChangeWieght}
                      //validations={[required, vpassword]}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="min_systolic_pressure">Минимальное систолическое давление</label>
                    <Input
                      type="number"
                      className="form-control"
                      name="min_systolic_pressure"
                      value={this.state.min_systolic_pressure}
                      onChange={this.onChangeMinSP}
                      //validations={[required, vpassword]}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="max_systolic_pressure">Максимальное систолическое давление</label>
                    <Input
                      type="number"
                      className="form-control"
                      name="max_systolic_pressure"
                      value={this.state.max_systolic_pressure}
                      onChange={this.onChangeMaxSP}
                      //validations={[required, vpassword]}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="min_diastolic_pressure">Минимальное диастолическое давление</label>
                    <Input
                      type="number"
                      className="form-control"
                      name="min_diastolic_pressure"
                      value={this.state.min_diastolic_pressure}
                      onChange={this.onChangeMinDP}
                      //validations={[required, vpassword]}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="max_diastolic_pressure">Максимальное диастолическое давление</label>
                    <Input
                      type="number"
                      className="form-control"
                      name="max_diastolic_pressure"
                      value={this.state.max_diastolic_pressure}
                      onChange={this.onChangeMaxDP}
                      //validations={[required, vpassword]}
                    />
                  </div>
                  <div className="form-group">
                  <button className="btn btn-primary btn-block button">Сохранить</button>
                </div>
                {this.state.message3 && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful11
                      ? "alert-success container"
                      : " alert-danger container"
                  }
                  role="alert"
                >
                  {this.state.message3}
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
                  </Form>)}
                 
          
        </div> 
      </div>
    );
  }
}