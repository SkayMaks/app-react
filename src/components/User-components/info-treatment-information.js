import React, { Component } from "react";
import UserService from "../../Services/user.service";
export default class UserInfoTI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };
  }
  componentDidMount() {
    UserService.getUserInfoTI()
    .then(
      response => {
        this.setState({
          content: response.data
        });
      }
    );
  }
 
  render() {
    return (
      
      <div className="conteiner-fluid text-center">
        
        
      <h1>Информация о схеме лечения.</h1>
       <table className="table table-bordered table-hover text-center table-sm " >
        <thead className="table-secondary">
          <tr>
            <th>Дата назначения:</th>
            <th>Дата начала лечения: </th>
            <th>Дата окончания лечения:</th>
            <th>ID доктора:</th>
            <th>Схема лечения:</th>
          </tr>
        </thead>
        {this.state.content.map((i)=>
      
     <tbody >
          <tr>
             <td>{i.date_appointment}</td>
            <td>{i.start_date}</td>
            <td>{i.end_date}</td>
            <td>{i.doctor_id}</td>
            <td>{i.content}</td>
          </tr>
     </tbody>
        )
        }
      </table>
        

      </div>
    );
  }
}