import React, { Component } from "react";
import UserService from "../Services/user.service";
import axios from "axios";
import authHeader from "../Services/auth-header";
import moment from "moment";
export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      pressureFlag: false
    };
  }
  handleInputChangePressure = e => {
    this.setState({
        [e.target.name]: e.target.value,
        pressureFlag: false
    })
}
sendPressure = (e) => {
  e.preventDefault()
  axios.post(`http://82.179.9.51:8080/send_pressure`, [{systolic_pressure: this.state.systolic_pressure, diastolic_pressure: this.state.diastolic_pressure, date: moment().format("YYYY-MM-DD H:mm")}], { headers: authHeader() })
      .then(res => {
          this.setState({pressureFlag: true})
      })
}
  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      }
    );
   
  }
 
  render() {
    return (
      
        <div className="row justify-content-around conteiner-fluid">
        
        <div className="jumbotron row justify-content-around"> 
          <div className="col-xs-12">
          
              <p><strong>ID:</strong> {this.state.content.id}</p>
            <p><strong>Минимальное значение пульса:</strong> {this.state.content.min_pulse}</p>
            <p><strong>Максимальное значение пульса:</strong> {this.state.content.max_pulse}</p>
            <p><strong>Рост:</strong> {this.state.content.height}</p>
            <p><strong>Вес:</strong> {this.state.content.weight}</p>
            <p><strong>Минимально значение верхнего давления:</strong> {this.state.content.min_systolic_pressure}</p>
            <p><strong>Максимальное значение верхнего давления:</strong> {this.state.content.max_systolic_pressure}</p>
            <p><strong>Минимальное значение нижнего давления:</strong> {this.state.content.min_diastolic_pressure}</p>
            <p><strong>Максимальное значение нижнего давления:</strong> {this.state.content.max_diastolic_pressure}</p>
           
          </div>
        </div>
       
          <div className="jumbotron">
                
                <div className="card-form reg col-xs-12 padd3">
                    <h5>Давление давления</h5>
                    <form onSubmit={this.sendPressure}>
                        <input type="text" className="form-control-marg padd" name="systolic_pressure" placeholder="Систолическое давление" onChange={this.handleInputChangePressure}
                               required
                        />
                        <input type="text" className="form-control-marg padd" name="diastolic_pressure" placeholder="Диастолическое давление" onChange={this.handleInputChangePressure}
                               required
                        />
                        <button className="btn btn-primary padd" type="submit">Добавить</button>
                        {this.state.pressureFlag && <div className="alert alert-success" role="alert">
                            Давление добавлено
                        </div>}
                    </form>
                </div>
            </div>
        </div>
       
      
    );
  }
}