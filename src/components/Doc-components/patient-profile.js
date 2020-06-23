import React, { Component } from "react";
import axios from "axios";
import authHeader from "../../Services/auth-header";
import {Link} from "react-router-dom";
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';

export default class PatientProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            currentValues: "",
            criticalValues: "",
            pulseHistory: [],
            stepHistory: [],
            pressureHistory: [],
            ITinformation:[],
            recomm:[],
            RecSuccess:[],
            showRec:false,
            showITinformation: false,
            showPulse: false,
            showPulse: false,
            showStep: false,
            showPressure: false,
            showInfo:true,
            showRecSuc:false
        };
    }

    async componentDidMount() {

        await axios.post(`http://82.179.9.51:8080/doctor/info/`, {id: this.state.id},{headers: authHeader()}).then(res => {
            this.setState({criticalValues: res.data})
            // console.log(res)
        }).catch(err => {
            console.log(err)
        })
        
        await axios.post(`http://82.179.9.51:8080/doctor/info-treatment-information/`,{id:this.state.id}, { headers: authHeader() })
        .then(res => {
            this.setState({ITinformation: res.data})
            // console.log(res)
        }).catch(err => {
            console.log(err)
        })

        await axios.post(`http://82.179.9.51:8080/doctor/info-recommendation/`,{id:this.state.id}, { headers: authHeader() })
        .then(res => {
            this.setState({recomm: res.data})
            // console.log(res)
        }).catch(err => {
            console.log(err)
        })
                
        await axios.post(`http://82.179.9.51:8080/doctor/indicators/`, {id: this.state.id},{headers: authHeader()}).then(res => {
            this.setState({currentValues: res.data})
            // console.log(res)
        }).catch(err => {
            console.log(err)
        })

        await axios.post(`http://82.179.9.51:8080/doctor/pulse_history/`, {id: this.state.id},{headers: authHeader()}).then(res => {
            // console.log(res)
            this.setState({pulseHistory: res.data})
            // console.log(this.state.pulseHistory)
        }).catch(err => {
            console.log(err)
        })

        await axios.post(`http://82.179.9.51:8080/doctor/step_history/`, {id: this.state.id},{headers: authHeader()}).then(res => {
            this.setState({stepHistory: res.data})
            // console.log(this.state.pulseHistory)
        }).catch(err => {
            console.log(err)
        })

        await axios.post(`http://82.179.9.51:8080/doctor/pressure_history/`, {id: this.state.id}, {headers: authHeader()}).then(res => {
            this.setState({pressureHistory: res.data})
            // console.log(this.state.pulseHistory)
        }).catch(err => {
            console.log(err)
        })
        await axios.post(`http://82.179.9.51:8080/doctor/check-recommendation/`, {patient_id: this.state.id}, {headers: authHeader()}).then(res => {
            this.setState({RecSuccess: res.data})
            // console.log(this.state.pulseHistory)
        }).catch(err => {
            console.log(err)
        })
    }
    showRecSuc = () =>{
        if(this.state.showRecSuc) this.setState({showRecSuc: false})
        else this.setState({showRecSuc: true})
        this.state.showITinformation=false;
        this.state.showPulse=false;
        this.state.showPressure=false;
        this.state.showStep=false;
        this.state.showRec=false;
        this.state.showInfo=false;
    }
    showInfo = () => {
        if(this.state.showInfo) this.setState({showInfo: false})
        else this.setState({showInfo: true})
        this.state.showITinformation=false;
        this.state.showPulse=false;
        this.state.showPressure=false;
        this.state.showStep=false;
        this.state.showRec=false;
        this.state.showRecSuc=false;
    }

    showRec = () => {
        if(this.state.showRec) this.setState({showRec: false})
        else this.setState({showRec: true})
        this.state.showITinformation=false;
        this.state.showPulse=false;
        this.state.showPressure=false;
        this.state.showStep=false;
        this.state.showInfo=false;
        this.state.showRecSuc=false;
    }
    
    showITinformationTable = () => {
        if(this.state.showITinformation) this.setState({showITinformation: false})
        else this.setState({showITinformation: true})
        this.state.showRec=false;
        this.state.showPulse=false;
        this.state.showPressure=false;
        this.state.showStep=false;
        this.state.showInfo=false;
        this.state.showRecSuc=false;
    }
    showPulseTable = () => {
        if(this.state.showPulse) this.setState({showPulse: false})
        else this.setState({showPulse: true})
        this.state.showRec=false;
        this.state.showITinformation=false;
        this.state.showPressure=false;
        this.state.showStep=false;
        this.state.showInfo=false;
        this.state.showRecSuc=false;
    }

    showStepTable = () => {
        if(this.state.showStep) this.setState({showStep: false})
        else this.setState({showStep: true})
        this.state.showRec=false;
        this.state.showITinformation=false;
        this.state.showPressure=false;
        this.state.showPulse=false;
        this.state.showRecSuc=false;
        this.state.showInfo=false;
    }

    showPressureTable = () => {
        if(this.state.showPressure) this.setState({showPressure: false})
        else this.setState({showPressure: true})
        this.state.showRec=false;
        this.state.showITinformation=false;
        this.state.showStep=false;
        this.state.showPulse=false;
        this.state.showInfo=false;
        this.state.showRecSuc=false;
    }
    
    render() {
        return (
            
            <div className="container-fluid  d-flex justify-content-between">
                
                <div class="btn-group-vertical ">
                     
                    <a class="btn btn-secondary" href={"/attachedList"}><ArrowBackSharpIcon/></a>
                    <a class="btn btn-secondary" href="#"onClick={this.showInfo}>Текущие показатели</a>
                    <a class="btn btn-secondary" href="#"onClick={this.showPulseTable}>История пульса</a>
                    <a class="btn btn-secondary" href="#"onClick={this.showRec}>Рекомендации</a>
                    <a class="btn btn-secondary" href="#"onClick={this.showRecSuc}>Выполенные рекомендации</a>
                    <a class="btn btn-secondary" href="#"onClick={this.showStepTable}>История шагов</a>
                    <a class="btn btn-secondary" href="#"onClick={this.showPressureTable}>История давления</a>
                    <a class="btn btn-secondary" href="#"onClick={this.showITinformationTable}>Информация о схеме лечения</a>
                       
                </div> 
                
                <div className="col-md-9,5 scrolling container-fluid col-xs-12">
               {this.state.showInfo &&<div className=" container-fluid padd ">
                    <div className=" row justify-content-around "> 
                            
                                <div className="col-xs-12 jumbotron ">
                                    <p><strong>Пульс: </strong> {this.state.currentValues.pulse_value}</p>
                                    <p><strong>Минимальное значение пульса: </strong> {this.state.criticalValues.min_pulse}</p>
                                    <p><strong>Максимальное значение пульса: </strong> {this.state.criticalValues.max_pulse}</p>
                                    <p><strong>Рост: </strong> {this.state.criticalValues.height}</p>
                                    <p><strong>Вес: </strong>{this.state.criticalValues.weight}</p>
                                    <p><strong>Количество шагов: </strong> {this.state.currentValues.step_value}</p>
                                    
                                </div>
                             <div className="col-xs-12 jumbotron">
                                    <p><strong>Систолическое давление: </strong>{this.state.currentValues.systolic_pressure}</p>
                                    <p><strong>Минимальное систолическое давление: </strong> {this.state.criticalValues.min_systolic_pressure}</p>
                                    <p><strong>Максимальное систолическое давление: </strong> {this.state.criticalValues.max_systolic_pressure}</p>
                                    <p><strong>Диастолическое давление: </strong>{this.state.currentValues.diastolic_pressure}</p>
                                    <p><strong>Минимальное диастолическое давление: </strong> {this.state.criticalValues.min_diastolic_pressure}</p>
                                    <p><strong>Минимальное диастолическое давление: </strong> {this.state.criticalValues.max_diastolic_pressure}</p>
                                </div>
                            
                            
                               </div>
                            </div> 
                             
                }
                {this.state.showPulse &&<div className="table  container-fluid col-xs-12">
                               
                    
                    <table className="table" >
                        <thead >
                        <tr >
                            <th>Дата</th>
                            <th>Значение пульса</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.showPulse && this.state.pulseHistory.map((item, index) =>(
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.pulse_value}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
    
                </div>}

                {this.state.showStep &&<div className="table  container-fluid col-xs-12">
                   
                     <table className="table ">
                        <thead>
                        <tr >
                            <th>Дата</th>
                            <th>Значение шагов</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.showStep && this.state.stepHistory.map((item, index) =>(
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.step_value}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    
                </div>}
                 {this.state.showRecSuc && <div className="table  container-fluid col-xs-12">
                   
                   <table className="table ">
                        <thead>
                        <tr >
                            <th>Дата выполнения</th>
                            <th>Рекомендация</th>
                            <th>Комментарии</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.showRecSuc && this.state.RecSuccess.map((item, index) =>(
                            <tr key={index}>
                                <td>{item.date_execution}</td>
                                <td>{item.content}</td>
                                <td>{item.comment}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                   
                </div> }
                {this.state.showPressure &&<div className="table  container-fluid col-xs-12">
                    
                     <table className="table">
                        <thead>
                        <tr >
                            <th>Дата</th>
                            <th>Систолическое давление</th>
                            <th>Диастолическое давление</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.showPressure && this.state.pressureHistory.map((item, index) =>(
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.systolic_pressure}</td>
                                <td>{item.diastolic_pressure}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>}
                   {this.state.showITinformation && <div className="table  container-fluid col-xs-12">
                                      <table className="table" >
                                <thead >
                                <tr >
                                    <th>ID:</th>
                                    <th>Дата назначения:</th>
                                    <th>Дата начала лечения: </th>
                                    <th>Дата окончания лечения:</th>
                                    <th>Схема лечения:</th>
                                    <th><Link to={`/add/${this.state.id}`} className="btn btn-primary btn-block">Добавить </Link></th>
                                </tr>
                                </thead>
                                {this.state.showITinformation && this.state.ITinformation.map((i,index)=>
                            <tbody >
                                <tr key={index}>
                                    <td>{i.id}</td>
                                    <td>{i.date_appointment}</td>
                                    <td>{i.start_date}</td>
                                    <td>{i.end_date}</td>
                                    <td>{i.content}</td>
                                </tr>
                            </tbody>
                                )
                                }
                            </table>
                        
                </div>}
                {this.state.showRec &&<div className="table  container-fluid col-xs-12">
                                       
                                         <table className="table" >
                                <thead >
                                <tr >
                                    <th>ID:</th>
                                    <th>Дата назначения:</th>
                                    <th>Дата начала лечения: </th>
                                    <th>Дата окончания лечения:</th>
                                    <th>Период напоминания:</th>
                                    <th>Рекомендация:</th>
                                    <th><Link to={`/addRec/${this.state.id}`} className="btn btn-primary btn-block">Добавить</Link></th>
                                </tr>
                                </thead>
                                {this.state.showRec && this.state.recomm.map((i,index)=>
                            <tbody >
                                <tr key={index}>
                                    <td>{i.id}</td>
                                    <td>{i.date_appointment}</td>
                                    <td>{i.start_date}</td>
                                    <td>{i.end_date}</td>
                                    <td>{i.time_reminder}</td>
                                    <td>{i.content}</td>
                                </tr>
                            </tbody>
                                )
                                }
                                
                            </table>
                </div>}
                </div>
            </div>
        );
    }
}