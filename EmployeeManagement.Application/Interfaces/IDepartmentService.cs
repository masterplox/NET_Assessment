using EmployeeManagement.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeManagement.Application.Interfaces
{
    public interface IDepartmentService
    {
        Task<IEnumerable<Department>> GetAllDepartmentsAsync();
        Task<Department> GetDepartmentByIdAsync(int id);
        Task<Department> CreateDepartmentAsync(Department department);
        Task UpdateDepartmentAsync(Department department);
        Task DeleteDepartmentAsync(int id);
        Task<bool> DepartmentExistsAsync(int id);
    }
} 