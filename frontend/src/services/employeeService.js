import api from './api';

// Employee Services
export const employeeService = {
  // Get all employees
  getAllEmployees: async () => {
    try {
      const response = await api.get('/emp/employees');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch employees' };
    }
  },

  // Get employee by ID
  getEmployeeById: async (id) => {
    try {
      const response = await api.get(`/emp/employees/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch employee' };
    }
  },

  // Create new employee
  createEmployee: async (employeeData) => {
    try {
      const response = await api.post('/emp/employees', employeeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create employee' };
    }
  },

  // Update employee
  updateEmployee: async (id, employeeData) => {
    try {
      const response = await api.put(`/emp/employees/${id}`, employeeData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update employee' };
    }
  },

  // Delete employee
  deleteEmployee: async (id) => {
    try {
      const response = await api.delete(`/emp/employees`, {
        params: { eid: id }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete employee' };
    }
  },

  // Search employees (you'll need to add this endpoint to backend)
  searchEmployees: async (searchParams) => {
    try {
      const response = await api.get('/emp/employees/search', {
        params: searchParams
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to search employees' };
    }
  },
};

export default employeeService;
