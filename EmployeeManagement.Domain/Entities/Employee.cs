using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EmployeeManagement.Domain.Entities
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        public DateTime HireDate { get; set; }

        [Required]
        public int DepartmentId { get; set; }

        [ForeignKey("DepartmentId")]
        [JsonIgnore]
        public Department Department { get; set; }

        [StringLength(20)]
        public string Phone { get; set; }

        [StringLength(200)]
        public string Address { get; set; }
    }
} 