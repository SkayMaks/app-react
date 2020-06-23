import React, { Component } from "react";
import UserService from "../../Services/user.service";
import {Link, Redirect} from "react-router-dom";
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import Edit from '@material-ui/icons/Edit';
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
import Loader from "../Loader/Loader"
import Modal from "./modal"
export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShowing: false,
      isLoading: true,
      columns: [
        { title: 'ID', field: 'id' },
        { title: 'Логин', field: 'login' },
        { title: 'Роль', field: 'role_id' },
        { title: 'Email', field: 'email'},
        {title: 'Дата регистрации',field: 'date_reg'},
        
      ],
      users: []
    };
  }
  openModalHandler = () => {
    this.setState({
        isShowing: true
    });
}

closeModalHandler = () => {
    this.setState({
        isShowing: false
    });
}
  async componentDidMount() {
    await UserService.getUserList().then(
      response => {
        this.setState({
          isLoading: false,
          users: response.data
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
      <div className=" col-xs-12 ">
        
                
            
       { this.state.isLoading 
        ? <Loader />
        : <div><MaterialTable
          title="Пользователи"
          columns={this.state.columns}
          data={this.state.users}
          icons={tableIcons}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Редактировать',
              onClick: (event,rowData) => {
                this.props.history.push(`/editUser/${rowData.id}`);
              }
            }
          ]}
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


  <Modal
            className="modal"
            show={this.state.isShowing}
            close={this.closeModalHandler}>
                Maybe aircrafts fly very high because they don't want to be seen in plane sight?
        </Modal>
        </div>
      }
      </div>
    );
  }
}