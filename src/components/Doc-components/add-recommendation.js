import React, { Component } from "react";
import axios from "axios";
import authHeader from "../../Services/auth-header";
import {Link} from "react-router-dom";

export default class AddRec extends Component {
    constructor(props) {
        super(props);

        this.state = {
            end_date: "",
            patient_id:this.props.match.params.id,
            time_reminder:"",
            content:"",
            edFlag: false,

        };
    }

    handleInputChangeED = e => {
        this.setState({
            end_date: e.target.value,
            edFlag: false
        })
    }

    handleInputChangeContent = e => {
        this.setState({
            content: e.target.value
        })
    }
    handleInputChangeTime = e => {
        this.setState({
            time_reminder: e.target.value
        })
    }


    sendADD = (e) => {
       e.preventDefault()
       axios.post(`http://82.179.9.51:8080/doctor/add-recommendation`, {
           patient_id: this.state.patient_id, end_date: this.state.end_date,
           time_reminder:this.state.time_reminder ,content: this.state.content}, { headers: authHeader() })
            .then(res => {
                this.setState({ edFlag:true})
            })
    }

   

    render() {
        return (
            <div className="conteiner reg">
                <Link to={`/list/${this.state.patient_id}`} className="btn btn-secondary btn-sm pdLink padd" role="button">Назад к данным пациента</Link>
                <div className=" card-conteiner">
                    <h3>Добавление рекомендации</h3>
                    <form onSubmit={this.sendADD}>
                    <div className="form-group ">
                        <label htmlFor="end_date">Дата завершения рекомендации:</label>
                    <input type="date" className="form-control-marg" name="end_date"  onChange={this.handleInputChangeED}
                        required
                    />
                    </div>
                    <div className="form-group ">
                        <label htmlFor="time">Период напоминания:</label>
                    <input type="time" className="form-control-marg" name="time"  onChange={this.handleInputChangeTime}
                        required
                    />
                    </div>
                    <div className="form-group ">
                    <label htmlFor="content">Рекомендация:</label>
                    <textarea className="form-control-marg" rows="10" cols="45" name="content" placeholder="Введите рекомендацию" onChange={this.handleInputChangeContent}
                        required
                    />
                    </div>
                    <button className="btn btn-primary btn-block" type="submit">Добавить</button>
                        {this.state.edFlag && <div className="alert alert-success" role="alert">
                            Рекомендация добавлена!
                        </div>}
                    </form>
                </div>
                
            </div>
        );
    }
}