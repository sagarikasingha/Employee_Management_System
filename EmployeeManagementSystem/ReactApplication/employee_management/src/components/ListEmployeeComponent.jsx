import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';


class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
      loading: true
    }
    this.addEmployee=this.addEmployee.bind(this);
    this.editEmployee=this.editEmployee.bind(this);
    this.deleteEmployee=this.deleteEmployee.bind(this);
  }

  componentDidMount() {
    EmployeeService.getEmployees().then((res) => {
      this.setState({ employees: res.data, loading: false });
    });
  }

  addEmployee(){
    this.props.history.push('/add-employee/new');
  }

  editEmployee(id){
    this.props.history.push(`/add-employee/${id}`)
  }

  deleteEmployee(id){
    EmployeeService.deleteEmployee(id).then(res=>{
      this.setState({employee: this.state.employees.filter(employee=>employee.id !==id)})
    });
  }
  render() {
    return (
      <div className='container'>
        <hr/>
        <h2 className='text-center'>Employees List</h2>
        <hr/>
        <div className='row'>
            <button className='btn btn-primary col-2' onClick={this.addEmployee}>Add Employee</button>
        </div>
        <div className='row'>
          <table className="table table-striped">
            <thead>
              <tr>
                <th >First Name</th>
                <th >Last Name</th>
                <th >Email</th> 
                <th >Actions</th>   
              </tr>
            </thead>
            <tbody key="employees">
              {this.state.loading ? (
                <tr>
                  <td colSpan={4}>Loading...</td>
                </tr>
              ) : (
                this.state.employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>
                      <button onClick={()=>this.editEmployee(employee.id)} className='btn btn-info m-2 col-3'>Update</button>
                      <button onClick={()=>this.deleteEmployee(employee.id)} className='btn btn-danger m-2 col-3'>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListEmployeeComponent;