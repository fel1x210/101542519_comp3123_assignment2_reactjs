import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import employeeService from '../services/employeeService';
import '../styles/Employee.css';

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const response = await employeeService.getEmployeeById(id);
      setFormData({
        first_name: response.first_name,
        last_name: response.last_name,
        email: response.email,
        position: response.position,
        salary: response.salary,
        date_of_joining: response.date_of_joining ? response.date_of_joining.split('T')[0] : '',
        department: response.department
      });
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch employee details');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await employeeService.updateEmployee(id, {
        ...formData,
        salary: parseFloat(formData.salary)
      });
      navigate('/employees');
    } catch (err) {
      setError(err.message || 'Failed to update employee');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="employee-container">
        <div className="loading">Loading employee details...</div>
      </div>
    );
  }

  return (
    <div className="employee-container">
      <div className="form-card">
        <h1>Edit Employee</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first_name">First Name *</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name *</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="position">Position *</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="department">Department *</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="salary">Salary *</label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date_of_joining">Date of Joining *</label>
              <input
                type="date"
                id="date_of_joining"
                name="date_of_joining"
                value={formData.date_of_joining}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Updating...' : 'Update Employee'}
            </button>
            <button type="button" onClick={() => navigate('/employees')} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee;
