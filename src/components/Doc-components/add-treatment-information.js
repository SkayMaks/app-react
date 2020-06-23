import React, { Component } from "react";
import axios from "axios";
import authHeader from "../../Services/auth-header";
import {Link} from "react-router-dom";

export default class AddTInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            end_date: "",
            patient_id:this.props.match.params.id,
            content:"",
            edFlag: false,
            contentFlag: false

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
            content: e.target.value,
            contentFlag: false
        })
    }


    sendADD = (e) => {
       e.preventDefault()
       axios.post(`http://82.179.9.51:8080/doctor/add-treatment-information`, {end_date: this.state.end_date,patient_id: this.state.patient_id,content: this.state.content}, { headers: authHeader() })
            .then(res => {
                this.setState({pulseFlag: true, edFlag:true})
            })
    }

   

    render() {
        return (
            <div className="conteiner reg">
                <Link to={`/list/${this.state.patient_id}`} className="btn btn-secondary btn-sm pdLink padd" role="button">Назад к данным пациента</Link>
                <div className=" card-conteiner">
                    <h3>Добавление схемы лечения</h3>
                    <form onSubmit={this.sendADD}>
                    <div className="form-group ">
                        <label htmlFor="end_date">Дата завершения схемы лечения:</label>
                    <input type="date" className="form-control-marg" name="end_date"  onChange={this.handleInputChangeED}
                        required
                    />
                    </div>
                    <div className="form-group ">
                    <label htmlFor="content">Схема лечения:</label>
                    <textarea className="form-control-marg" rows="10" cols="45" name="content" placeholder="Введите схему лечения" onChange={this.handleInputChangeContent}
                        required
                    />
                    </div>
                    <button className="btn btn-primary btn-block" type="submit">Добавить</button>
                        {this.state.edFlag && <div className="alert alert-success" role="alert">
                            Схема лечения добавлена
                        </div>}
                    </form>
                </div>
                
            </div>
        );
    }
}