using EmployeeManagement.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeManagement.Domain.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetAllAsync();
        Task<Employee> GetByIdAsync(int id);
        Task<Employee> AddAsync(Employee employee);
        Task UpdateAsync(Employee employee);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
} 