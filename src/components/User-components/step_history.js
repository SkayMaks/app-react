import React, { Component } from "react";
import UserService from "../../Services/user.service";
import {Line} from 'react-chartjs-2';
import MaterialTable from 'material-table';
import Loader from "../Loader/Loader"
import { forwardRef } from 'react';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
      isLoading: true,
      columns: [
        { title: 'Дата', field: 'date'},
        { title: 'Шаги', field: 'step_value' }
        
      ]
    };
  }
  componentDidMount() {
    UserService.getStepHistory().then(
      response => {
        this.setState({
          isLoading: false,
          content: response.data
        });
      }
    );
  }
  
  render() {
    const date=this.state.content.map((item)=>item.date);
    const step=this.state.content.map((item)=>item.step_value);
    const data = {
        labels: date,
        datasets: [
          {
            label: 'Статистика шагов за весь период лечения',
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
            data: step
          }
        ]
      };
      const tableIcons = {
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
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
    
      <div className="conteiner-fluid">
         { this.state.isLoading 
        ? <Loader />
        : <div className="row jumbotron"> <MaterialTable className="col-12"
           columns={this.state.columns}
          data={this.state.content}
          icons={tableIcons}
          localization={{
            header: {
              actions: ''
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
          toolbar:false
        }}
        /><div className="col-xs-12 col-sm-7 ">
          <Line className="" data={data} /> 
        
        </div>
        </div>}
      
    </div>
    );
  }
}