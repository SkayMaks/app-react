import React, { Component } from "react";
import axios from 'axios';
import authHeader from "../Services/auth-header";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
        doctor: "",
        isExpired: false
    };
  }

  async componentDidMount() {
      await axios.get('http://82.179.9.51:8080/doctor/name', {headers: authHeader()})
        .then(res => {
          this.setState({doctor: res.data})
        })
      

  }
  

  render() {
    return (
        <div>
        { 
            
            <div className="conteiner-fluid">
               <div className="row jumbotron">
               <div className="col-xs-12">
                        <p><strong>Фамилия:</strong> {this.state.doctor.surname}</p>
                        <p><strong>Имя:</strong> {this.state.doctor.name}</p>
                        <p><strong>Отчество:</strong> {this.state.doctor.patronymic}</p>
                        <p><strong>Email:</strong> {this.state.doctor.email}</p>
                    </div>
                    </div>
                </div>
        }
        </div>
    );
  }
}
