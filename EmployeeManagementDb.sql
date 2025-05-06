-- Create the database
CREATE DATABASE EmployeeManagementDb;
GO

USE EmployeeManagementDb;
GO

-- Create Departments table
CREATE TABLE Departments (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(50) NOT NULL,
    Description NVARCHAR(200) NULL
);
GO

-- Create Employees table
CREATE TABLE Employees (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    FirstName NVARCHAR(50) NOT NULL,
    LastName NVARCHAR(50) NOT NULL,
    HireDate DATE NOT NULL,
    DepartmentId INT NOT NULL,
    Phone NVARCHAR(20) NULL,
    Address NVARCHAR(200) NULL,
    CONSTRAINT FK_Employees_Departments FOREIGN KEY (DepartmentId) REFERENCES Departments(Id) ON DELETE CASCADE
);
GO

-- Optional: Insert sample data
INSERT INTO Departments (Name, Description) VALUES ('HR', 'Human Resources');
INSERT INTO Departments (Name, Description) VALUES ('IT', 'Information Technology');
GO

INSERT INTO Employees (FirstName, LastName, HireDate, DepartmentId, Phone, Address)
VALUES ('John', 'Doe', '2023-01-15', 1, '1234567890', '123 Main St');
GO 