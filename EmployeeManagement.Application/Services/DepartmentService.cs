using EmployeeManagement.Application.Interfaces;
using EmployeeManagement.Domain.Entities;
using EmployeeManagement.Domain.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeManagement.Application.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository _departmentRepository;

        public DepartmentService(IDepartmentRepository departmentRepository)
        {
            _departmentRepository = departmentRepository;
        }

        public async Task<IEnumerable<Department>> GetAllDepartmentsAsync()
        {
            return await _departmentRepository.GetAllAsync();
        }

        public async Task<Department> GetDepartmentByIdAsync(int id)
        {
            return await _departmentRepository.GetByIdAsync(id);
        }

        public async Task<Department> CreateDepartmentAsync(Department department)
        {
            return await _departmentRepository.AddAsync(department);
        }

        public async Task UpdateDepartmentAsync(Department department)
        {
            await _departmentRepository.UpdateAsync(department);
        }

        public async Task DeleteDepartmentAsync(int id)
        {
            await _departmentRepository.DeleteAsync(id);
        }

        public async Task<bool> DepartmentExistsAsync(int id)
        {
            return await _departmentRepository.ExistsAsync(id);
        }
    }
} 