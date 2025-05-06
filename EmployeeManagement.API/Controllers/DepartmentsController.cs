using EmployeeManagement.Application.Interfaces;
using EmployeeManagement.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentsController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
        {
            var departments = await _departmentService.GetAllDepartmentsAsync();
            return Ok(departments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> GetDepartment(int id)
        {
            var department = await _departmentService.GetDepartmentByIdAsync(id);
            if (department == null)
            {
                return NotFound();
            }
            return Ok(department);
        }

        [HttpPost]
        public async Task<ActionResult<Department>> CreateDepartment(Department department)
        {
            var createdDepartment = await _departmentService.CreateDepartmentAsync(department);
            return CreatedAtAction(nameof(GetDepartment), new { id = createdDepartment.Id }, createdDepartment);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDepartment(int id, Department department)
        {
            if (id != department.Id)
            {
                return BadRequest();
            }

            if (!await _departmentService.DepartmentExistsAsync(id))
            {
                return NotFound();
            }

            await _departmentService.UpdateDepartmentAsync(department);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            if (!await _departmentService.DepartmentExistsAsync(id))
            {
                return NotFound();
            }

            await _departmentService.DeleteDepartmentAsync(id);
            return NoContent();
        }
    }
} 