using EmployeeManagement.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeManagement.Application.Interfaces
{
    public interface IEmployeeService
    {
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
        Task<Employee> GetEmployeeByIdAsync(int id);
        Task<Employee> CreateEmployeeAsync(Employee employee);
        Task UpdateEmployeeAsync(Employee employee);
        Task DeleteEmployeeAsync(int id);
        Task<bool> EmployeeExistsAsync(int id);
    }
} 