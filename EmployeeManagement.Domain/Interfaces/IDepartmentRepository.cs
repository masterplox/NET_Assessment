using EmployeeManagement.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeManagement.Domain.Interfaces
{
    public interface IDepartmentRepository
    {
        Task<IEnumerable<Department>> GetAllAsync();
        Task<Department> GetByIdAsync(int id);
        Task<Department> AddAsync(Department department);
        Task UpdateAsync(Department department);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);
    }
} 