import React, { Component } from "react";
import axios from "axios";
import authHeader from "../../Services/auth-header";
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
export default class SendIndicators extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_role: null,
            user_pass: null,
            user_id: this.props.match.params.id,
            roleFlag: false,
            passFlag: false,
           
        };
    }

    handleInputChangeRole = e => {
        this.setState({
            [e.target.name]: e.target.value,
            roleFlag: false
        })
    }

    handleInputChangePass = e => {
        this.setState({
            [e.target.name]: e.target.value,
            passFlag: false
        })
    }

    sendRole = (e) => {
       e.preventDefault()
       axios.post(`http://82.179.9.51:8080/admin/edit-role`, {user_id:this.state.user_id,role_id:this.state.user_role}, { headers: authHeader() })
            .then(res => {
                this.setState({roleFlag: true})
            })
    }

    sendPass = (e) => {
        e.preventDefault()
        axios.post(`http://82.179.9.51:8080/admin/changepswd`, {user_id:this.state.user_id,password:this.state.user_pass}, { headers: authHeader() })
            .then(res => {
                this.setState({passFlag: true})
            })
    }


    render() {
        return (
            <div className="container reg">
                <a class="btn btn-secondary" href={"/listUser"}><ArrowBackSharpIcon/>Назад</a>
                <div className="card-form ">
                    <h3>Роль</h3>
                    <form onSubmit={this.sendRole}>
                        
                    <input type="number" min="1" max="3" className="form-control-marg" name="user_role" placeholder="Роль" onChange={this.handleInputChangeRole}
                        required
                    />
                    <button className="btn btn-primary padd" type="submit">Изменить</button>
                        {this.state.roleFlag && <div className="alert alert-success" role="alert">
                        Роль изменина
                        </div>}
                    </form>
                </div>
                <div className="card-form">
                    <h3>Пароль</h3>
                    <form onSubmit={this.sendPass}>
                        <input type="text" className="form-control-marg" name="user_pass" placeholder="Пароль" onChange={this.handleInputChangePass}
                               required
                        />
                        <button className="btn btn-primary padd" type="submit">изменить</button>
                        {this.state.passFlag && <div className="alert alert-success" role="alert">
                            Пароль изменен
                        </div>}
                    </form>
                </div>
               
            </div>
        );
    }
}