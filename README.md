# Employee Management Solution

## Overview
This repository contains a full-stack Employee Management solution designed as part of a Senior Full Stack .NET/Azure/Angular Developer Assessment. The project demonstrates enterprise-grade architecture, modern development practices, and readiness for cloud deployment on Azure.

## Solution Structure
- **EmployeeManagement.API**: ASP.NET Core Web API implementing RESTful endpoints for employee and department management.
- **EmployeeManagement.Application**: Application layer containing business logic, CQRS handlers, and MediatR integration.
- **EmployeeManagement.Domain**: Domain layer with core entities, value objects, and domain logic.
- **EmployeeManagement.Infrastructure**: Data access layer using Entity Framework Core, repository and unit of work patterns, and database migrations.
- **EmployeeManagement.Tests**: Unit and integration tests using xUnit/NUnit.
- **employee-management-ui**: Angular SPA frontend for managing employees and departments, styled with Angular Material, and following best practices for state management and API communication.
- **src/app**: Additional source code for the Angular application.

## Architecture
- **Clean Architecture**: The solution is structured for separation of concerns, maintainability, and testability, with clear boundaries between API, application, domain, and infrastructure layers.
- **CQRS & MediatR**: Command Query Responsibility Segregation is implemented using MediatR for handling commands and queries, supporting scalable and maintainable business logic.
- **Repository & Unit of Work Patterns**: Abstracts data access and transaction management, enabling easier testing and future data source changes.
- **Entity Framework Core**: Code-first approach for database schema, migrations, and data access.
- **DTOs & AutoMapper**: Data Transfer Objects and AutoMapper are used for mapping between domain models and API contracts.
- **Dependency Injection**: .NET Core DI container is used throughout for loose coupling and testability.
- **Swagger/OpenAPI**: API documentation is provided for easy testing and integration.
- **Angular Frontend**: Implements a responsive UI with Angular Material, reactive forms, routing, reusable components, and RxJS for async operations.
- **Authentication Ready**: The backend is designed for easy integration with API key/JWT authentication and Azure Active Directory.

## Key Features
- Employee CRUD operations with department relationships
- Department listing
- Optimistic UI updates and error handling in the frontend
- Comprehensive unit and integration tests
- Docker-ready for containerized deployment
- Azure deployment readiness (App Service, SQL, authentication)

## Getting Started
1. **Clone the repository**
2. **Database Setup**
   - Run the script provided in `EmployeeManagementDb.sql` to create the required SQL Server database and tables. This will set up the `EmployeeManagementDb` database with the necessary tables and sample data.
3. **Backend**
   - Navigate to the solution folder
   - Run `dotnet ef database update` to apply migrations
   - Run `dotnet run` to start the API
4. **Frontend**
   - Navigate to `employee-management-ui`
   - Run `npm install` to install dependencies
   - Run `ng serve` to start the Angular app

## API Endpoints

### Employees
- `GET /api/employees` - Get all employees (with department info)
- `GET /api/employees/{id}` - Get employee by ID (with department info)
- `POST /api/employees` - Create a new employee
- `PUT /api/employees/{id}` - Update an existing employee
- `DELETE /api/employees/{id}` - Delete an employee

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/{id}` - Get department by ID
- `POST /api/departments` - Create a new department
- `PUT /api/departments/{id}` - Update an existing department
- `DELETE /api/departments/{id}` - Delete a department

## Technologies Used
- .NET Core, ASP.NET Core, C#, Entity Framework Core
- MediatR, AutoMapper, xUnit/NUnit
- Angular, TypeScript, Angular Material, RxJS
- SQL Server/Azure SQL

## Contributing
This project is intended as a technical assessment and a demonstration of best practices for enterprise .NET and Angular development.

---

For more details, see the code and comments throughout the solution. 