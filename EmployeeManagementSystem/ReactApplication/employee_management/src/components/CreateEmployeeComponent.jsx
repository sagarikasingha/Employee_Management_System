import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            email: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.savaEmployee = this.savaEmployee.bind(this);
    }

    componentDidMount() {
        if (this.state.id ==="new") { //for add new employee
            return;
        } else { // for update existing employee
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                this.setState({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    email: employee.email
                });
            });
        }

    }

    changeFirstNameHandler = (event) => {
        this.setState({ firstName: event.target.value });
    }
    changeLastNameHandler = (event) => {
        this.setState({ lastName: event.target.value });
    }
    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
    }
    savaEmployee = (e) => {
        e.preventDefault();
        let employee = { firstName: this.state.firstName,
             lastName: this.state.lastName,
             email: this.state.email };
             console.log('employee=>' + JSON.stringify(employee));
        if (this.state.id ==="new") { //for add new employee
            EmployeeService.createEmployee(employee).then(res => {
                this.props.history.push('/employees');
            })
        } else {  // for update existing employee
            EmployeeService.updateEmployee(this.state.id,employee ).then(res => {
                this.props.history.push('/employees')
            })
        }
    }
    cancel() {
        this.props.history.push('/employees');
    }

    getTitle(){
        if (this.state.id ==="new") { 
            return  <h1 className='text-center mt-2'>Add Employee</h1>
        }else{
            return  <h1 className='text-center mt-2'>Update Employee</h1>
        }
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row mt-5'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            {this.getTitle()}
                            <hr/>
                            <div className='card-body'>
                                <form>
                                    <div className="form-group mt-2">
                                        <label for="name"> First Name: </label>
                                        <input placeholder='First Name' name='firstName' className='form-control ' value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label for="name"> Last Name: </label>
                                        <input placeholder='Last Name' name='lastName' className='form-control' value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label for="name"> Email: </label>
                                        <input type='email' placeholder='Email' name='email' className='form-control' value={this.state.email} onChange={this.changeEmailHandler} />
                                    </div>
                                    <button className='btn btn-success mt-3 mb-3 col-3' onClick={this.savaEmployee}>Save</button>
                                    <button className='btn btn-danger mt-3 mb-3 col-3' onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div></div>
            </div>
        );
    }
}

export default CreateEmployeeComponent;