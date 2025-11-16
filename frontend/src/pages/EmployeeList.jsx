import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import employeeService from '../services/employeeService';
import authService from '../services/authService';
import '../styles/Employee.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useState({
    department: '',
    position: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Real-time search effect
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.department, searchParams.position]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeeService.getAllEmployees();
      setEmployees(response.data || []);
      setFilteredEmployees(response.data || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchParams.department && !searchParams.position) {
      setFilteredEmployees(employees);
      return;
    }

    try {
      const response = await employeeService.searchEmployees(searchParams);
      setFilteredEmployees(response.data || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Search failed');
    }
  };

  const handleClearSearch = () => {
    setSearchParams({ department: '', position: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      await employeeService.deleteEmployee(id);
      fetchEmployees();
    } catch (err) {
      setError(err.message || 'Failed to delete employee');
    }
  };

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <div className="employee-container">
      <div className="employee-header">
        <h1>Employee Management</h1>
        <div className="header-actions">
          <Link to="/employees/add" className="btn-add">Add Employee</Link>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </div>

      <div className="search-section">
        <div className="search-inputs">
          <input
            type="text"
            placeholder="Search by department"
            value={searchParams.department}
            onChange={(e) => setSearchParams({ ...searchParams, department: e.target.value })}
          />
          <input
            type="text"
            placeholder="Search by position"
            value={searchParams.position}
            onChange={(e) => setSearchParams({ ...searchParams, position: e.target.value })}
          />
          <button onClick={handleClearSearch} className="btn-clear">Clear</button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading employees...</div>
      ) : (
        <div className="table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Date of Joining</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-data">No employees found</td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.first_name} {employee.last_name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.position}</td>
                    <td>{employee.department}</td>
                    <td>${employee.salary}</td>
                    <td>{new Date(employee.date_of_joining).toLocaleDateString()}</td>
                    <td className="actions">
                      <Link to={`/employees/view/${employee._id}`} className="btn-view">View</Link>
                      <Link to={`/employees/edit/${employee._id}`} className="btn-edit">Edit</Link>
                      <button onClick={() => handleDelete(employee._id)} className="btn-delete">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
