import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
    selector: 'app-employee-list',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
    employees: Employee[] = [];
    displayedColumns: string[] = ['id', 'firstName', 'lastName', 'department', 'hireDate', 'actions'];

    constructor(
        private employeeService: EmployeeService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.loadEmployees();
    }

    loadEmployees(): void {
        this.employeeService.getEmployees().subscribe(employees => {
            this.employees = employees;
        });
    }

    openAddDialog(): void {
        const dialogRef = this.dialog.open(EmployeeFormComponent, {
            width: '500px',
            data: { isEdit: false }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadEmployees();
                this.snackBar.open('Employee added successfully', 'Close', { duration: 3000 });
            }
        });
    }

    openEditDialog(employee: Employee): void {
        const dialogRef = this.dialog.open(EmployeeFormComponent, {
            width: '500px',
            data: { isEdit: true, employee }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadEmployees();
                this.snackBar.open('Employee updated successfully', 'Close', { duration: 3000 });
            }
        });
    }

    deleteEmployee(id: number): void {
        if (confirm('Are you sure you want to delete this employee?')) {
            this.employeeService.deleteEmployee(id).subscribe(() => {
                this.loadEmployees();
                this.snackBar.open('Employee deleted successfully', 'Close', { duration: 3000 });
            }, error => {
                this.snackBar.open('Error deleting employee', 'Close', { duration: 3000 });
            });
        }
    }
} 