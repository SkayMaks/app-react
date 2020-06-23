import React, { Component } from "react";
import UserService from "../../Services/user.service"
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
export default class BoardUser extends Component {
constructor(props){
 super(props);
 this.onChangeED = this.onChangeED.bind(this);
 this.onChangeSD = this.onChangeSD.bind(this);       
 this.componentDidMount = this.componentDidMount.bind(this);
 this.state = {
                content: [],
                massege:"",
                success:false,
                start_date: "",
                end_date: ""
              };
}
            onChangeSD(e) {
                this.setState({
                  start_date: e.target.value
                });
              }
              onChangeED(e) {
                this.setState({
                  end_date: e.target.value
                });
              }
            componentDidMount(e) {
              UserService.postRecommendation(this.state.start_date,this.state.end_date).then(
                response => {
                  this.setState({
                    content: response.data,
                  });
                  
                }
              );
              }
              
           
          
            render() {
             if(this.state.content.length=== 0){this.state.success=false}else{this.state.success=true}
              return (
                
               <div className="conteiner-fluid"> 
                   <div className="jumbotron">
                <h1 className="text-center">Введите период для просмотра рекомендации</h1>
                <div className="d-flex justify-content-center padd">
                    <label htmlFor="StartDate"  className=" padd"><strong>C</strong></label>
                    <input type="date" name="EndDate" value={this.state.start_date} onChange={this.onChangeSD}/>
                    <label htmlFor="EndDate" className=" padd"><strong>по</strong></label>
                    <input type="date" value={this.state.end_date} onChange={this.onChangeED} />
                    <button className="btn btn-primary btn-block button padd w-25 "  onClick={this.componentDidMount}>Показать </button>
                   </div>
               </div>
                  
          <div >
            {this.state.success?(	this.state.content.map(objectRec => (
        <div key={"objectRec" + objectRec.date} >
            <h3 className="text-center table-active">Рекомендации на {objectRec.date}</h3>
            
            <table  className="table table-bordered table-hover">
                <thead className="table-secondary">
                    <tr><td>Время:</td>
                    <td>Рекомендация:</td>
                    <td>Статус</td>
                    </tr>
                </thead>
            <tbody>
                {
                objectRec.rec.map(rec => (
                <tr key={"objectRec" + objectRec.date + "recID" + rec.id} >
                  
                <td> {rec.time}</td><td>{rec.content}</td ><td className={
                    rec.need_reminder
                      ? "alert alert-secondary"
                      : "alert alert-success"
                  }>{rec.need_reminder?<p><PriorityHighIcon/>Не Выполнена</p>:<p><CheckCircleOutlineIcon/>выполнена</p>}</td>
            
               </tr>
                
                ))
                }
            
            </tbody>
            </table>
            </div>
            ))):(<div className="alert alert-primary text-center" role="alert">
            Нет рекомендации по заданному периоду!
          </div>)}

             </div>
             
        </div>
              );
            }
          }