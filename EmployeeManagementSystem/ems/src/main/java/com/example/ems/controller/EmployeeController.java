package com.example.ems.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ems.entity.Employee;
import com.example.ems.exception.ResourceNotFoundException;
import com.example.ems.repository.EmployeeRepository;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {
	
	@Autowired
	private EmployeeRepository employeerepository;

	
	//get all employees
	@GetMapping("/employees")
	public List<Employee> getAllEmployee(){
		return employeerepository.findAll();	
	}
	
	//create employee rest api
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee employee) {
		return employeerepository.save(employee);
	}
	
	//get Employee by id rest api
	@GetMapping("employees/{id}")
	public ResponseEntity<Employee>  getEmployeeById(@PathVariable Long id) {
		Employee employee=employeerepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Employee Not Exists with Id :"+id));
		return ResponseEntity.ok(employee);
		
	}
	
	//update employee rest api
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployees(@PathVariable Long id,@RequestBody Employee employeeDetails){
		Employee employee=employeerepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Employee Not Exists with Id :"+id));
		
		employee.setFirstName(employeeDetails.getFirstName());
		employee.setLastName(employeeDetails.getLastName());
		employee.setEmail(employeeDetails.getEmail());
		
		Employee updatedEmployee=employeerepository.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}
	
	//delete employee rest api
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String,Boolean>>  deleteEmployee(@PathVariable Long id){
		Employee employee=employeerepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Employee Not Exists with Id :"+id));
		
		employeerepository.delete(employee);
		Map<String,Boolean> response=new HashMap<String, Boolean>();
		response.put("deleted",Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}







