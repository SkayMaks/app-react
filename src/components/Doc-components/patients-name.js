import React, { Component } from "react";
import UserService from "../../Services/doc.service";
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import authHeader from "../../Services/auth-header";
import axios from "axios";
import Loader from "../Loader/Loader"


export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      patients: [],
      allPatients:[],
      showAttPat:true,
      showAllPat:false,
      columns: [
        { title: 'Фамилия', field: 'surname' },
        { title: 'Имя', field: 'name' },
        { title: 'Отчество', field: 'patronymic' },
        { title: 'Номер полиса', field: 'policy_number'},
        
      ],
    };
  }

  async componentDidMount() {
    await UserService.getAttachedUserList().then(
      response => {
        this.setState({
          isLoading: false,
         
          patients: response.data
        });
        // console.log('response',this.state.patients)
      }
    );
    await UserService.getAllUserList().then(
      response => {
        this.setState({
          isLoading: false,  
          allPatients: response.data
        });
        // console.log('response',this.state.patients)
      }
    );
  }
  
  showAllPat = () =>{
    if(this.state.showAllPat) this.setState({showAllPat: false})
    else this.setState({showAllPat: true})
    this.state.showAttPat=false;

  }
  showAttPat = () =>{
    if(this.state.showAttPat) this.setState({showAttPat: false})
    else this.setState({showAttPat: true})
    this.state.showAllPat=false;
    
  }
  funAttachmen(id){
    axios.post(`http://82.179.9.51:8080/doctor/attachment/`, {patient_id: id},{headers: authHeader()})
    
  }
 
  render() {
    const tableIcons = {
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
      ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
      ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
      
    };
    return (
      <div className=" col-xs-12">
        <div className="d-flex align-items-center btn-group btn-group-lg  padd" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-secondary" onClick={this.showAttPat} >Список личных пациентов</button>
          <button type="button" className="btn btn-secondary" onClick={this.showAllPat}>Список всех пациентов</button>
          
        </div>
        { this.state.isLoading 
        ? <Loader />
        :<div>{this.state.showAttPat&&<div className="table-bordered table-hover text-center table-sm table-responsive ">
        <MaterialTable
          title="Список личных пациентов"
          columns={this.state.columns}
          data={this.state.patients}
          icons={tableIcons}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Подробно',
              onClick: (event,rowData) => {
                this.props.history.push(`/list/${rowData.id}`);
              }
            }
          ]}
          components={{
            Action: props => (
              <button
                onClick={(event) => props.action.onClick(event, props.data)}
                className="btn btn-primary btn-sm pdLink"
                
              >
                Подробно
              </button>
            ),
          }}
          localization={{
            header: {
              actions: ''
          },
            toolbar: {
              searchPlaceholder: 'Поиск'
            },
            pagination:{
              labelDisplayedRows: '{from}-{to} из {count}',
              labelRowsSelect:'строк',
              firstTooltip:'В начало',
              lastTooltip:'В конец',
              previousTooltip:'Предыдушая страница',
              nextTooltip:'Следующая страница'
            }
            
        }}
        options={{
          actionsColumnIndex: -1,
         rowStyle: rowData => ({
          backgroundColor:  rowData.flag ? '#f8d7da' : '#FFF',
         
        }),
        pageSize:10
        }}
        />
       </div>}
       {this.state.showAllPat&&<div className="table-bordered table-hover text-center table-sm table-responsive ">
       <MaterialTable
          title="Список всех пациентов"
          columns={this.state.columns}
          data={this.state.allPatients}
          icons={tableIcons}
          actions={[
            {
             
            }
          ]}
          components={{
            Action: props => (
              <button
                className="btn btn-primary btn-sm pdLink"
                disabled
              >
                Стать врачем
              </button>
            ),
          }}
          localization={{
            header: {
              actions: ''
          },
            toolbar: {
              searchPlaceholder: 'Поиск'
            },
            pagination:{
              labelDisplayedRows: '{from}-{to} из {count}',
              labelRowsSelect:'строк',
              firstTooltip:'В начало',
              lastTooltip:'В конец',
              previousTooltip:'Предыдушая страница',
              nextTooltip:'Следующая страница'
            }
            
        }}
        options={{
          actionsColumnIndex: -1,
          pageSize:10
        }}
        />
       </div> }
       </div>
        
      }
         
      </div>
    );
  }
}