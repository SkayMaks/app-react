import React, { Component } from "react";
import axios from 'axios';
import authHeader from "../../Services/auth-header";
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import Loader from "../Loader/Loader"

import AddBox from '@material-ui/icons/AddBox';
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
export default class viewLog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      log: [],
      isLoading: true,
      columns: [
        { title: 'ID пользователя', field: 'user_id' },
        { title: 'Тип операции', field: 'operation_type' },
        { title: 'Дата', field: 'date'},
        {title: 'Имя таблицы',field: 'table_name'},
        { title: 'Комментарий', field: 'arguments'},
        
      ],
     
    };
  }

  async componentDidMount() {
    axios.get(`http://82.179.9.51:8080/admin/log`, { headers: authHeader() })
            .then(response => {
        this.setState({
          isLoading: false,
          log: response.data
        });
        // console.log('response',this.state.patients)
      }
    );

  }

  render() {
    const tableIcons = {
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
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
      <div className=" col-xs-12">
         { this.state.isLoading 
        ? <Loader />
        : <MaterialTable
          title="Лог"
          columns={this.state.columns}
          data={this.state.log}
          icons={tableIcons}
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
          actionsColumnIndex: -1
        }}
        />
         
         
      }
      </div>
    );
  }
}