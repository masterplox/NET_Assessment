import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department.service';
import { DepartmentFormComponent } from '../department-form/department-form.component';

@Component({
    selector: 'app-department-list',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule, MatTooltipModule],
    templateUrl: './department-list.component.html',
    styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
    departments: Department[] = [];
    displayedColumns: string[] = ['name', 'description', 'actions'];

    constructor(
        private departmentService: DepartmentService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.loadDepartments();
    }

    loadDepartments(): void {
        this.departmentService.getDepartments().subscribe({
            next: (departments) => {
                this.departments = departments;
            },
            error: (error) => {
                this.snackBar.open('Error loading departments', 'Close', { duration: 3000 });
                console.error('Error loading departments:', error);
            }
        });
    }

    openAddDialog(): void {
        const dialogRef = this.dialog.open(DepartmentFormComponent, {
            width: '500px',
            data: { department: null }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadDepartments();
            }
        });
    }

    openEditDialog(department: Department): void {
        const dialogRef = this.dialog.open(DepartmentFormComponent, {
            width: '500px',
            data: { department }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadDepartments();
            }
        });
    }

    deleteDepartment(id: number): void {
        if (confirm('Are you sure you want to delete this department?')) {
            this.departmentService.deleteDepartment(id).subscribe({
                next: () => {
                    this.snackBar.open('Department deleted successfully', 'Close', { duration: 3000 });
                    this.loadDepartments();
                },
                error: (error) => {
                    this.snackBar.open('Error deleting department', 'Close', { duration: 3000 });
                    console.error('Error deleting department:', error);
                }
            });
        }
    }
} 