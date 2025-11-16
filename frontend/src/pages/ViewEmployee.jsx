import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import employeeService from '../services/employeeService';
import '../styles/Employee.css';

function ViewEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const response = await employeeService.getEmployeeById(id);
      setEmployee(response);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch employee details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    try {
      await employeeService.deleteEmployee(id);
      navigate('/employees');
    } catch (err) {
      setError(err.message || 'Failed to delete employee');
    }
  };

  if (loading) {
    return (
      <div className="employee-container">
        <div className="loading">Loading employee details...</div>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="employee-container">
        <div className="error-message">{error || 'Employee not found'}</div>
        <button onClick={() => navigate('/employees')} className="btn-secondary">
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="employee-container">
      <div className="detail-card">
        <h1>Employee Details</h1>
        
        <div className="detail-grid">
          <div className="detail-item">
            <label>Employee ID:</label>
            <span>{employee.employee_id || employee._id}</span>
          </div>

          <div className="detail-item">
            <label>First Name:</label>
            <span>{employee.first_name}</span>
          </div>

          <div className="detail-item">
            <label>Last Name:</label>
            <span>{employee.last_name}</span>
          </div>

          <div className="detail-item">
            <label>Email:</label>
            <span>{employee.email}</span>
          </div>

          <div className="detail-item">
            <label>Position:</label>
            <span>{employee.position}</span>
          </div>

          <div className="detail-item">
            <label>Department:</label>
            <span>{employee.department}</span>
          </div>

          <div className="detail-item">
            <label>Salary:</label>
            <span>${employee.salary}</span>
          </div>

          <div className="detail-item">
            <label>Date of Joining:</label>
            <span>{new Date(employee.date_of_joining).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="form-actions">
          <button onClick={() => navigate(`/employees/edit/${id}`)} className="btn-primary">
            Edit Employee
          </button>
          <button onClick={handleDelete} className="btn-delete">
            Delete Employee
          </button>
          <button onClick={() => navigate('/employees')} className="btn-secondary">
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewEmployee;
