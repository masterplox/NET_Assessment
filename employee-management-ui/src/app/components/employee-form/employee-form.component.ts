import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Department } from '../../models/department.model';
import { Employee } from '../../models/employee.model';
import { DepartmentService } from '../../services/department.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
    selector: 'app-employee-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        MatButtonModule
    ],
    templateUrl: './employee-form.component.html',
    styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
    employeeForm: FormGroup;
    departments: Department[] = [];
    isEdit: boolean;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EmployeeFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean; employee?: Employee },
        private employeeService: EmployeeService,
        private departmentService: DepartmentService,
        private snackBar: MatSnackBar
    ) {
        this.isEdit = data.isEdit;
        this.employeeForm = this.fb.group({
            id: [null],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            hireDate: [null, Validators.required],
            departmentId: [null, Validators.required],
            phone: [''],
            address: ['']
        });

        if (this.isEdit && data.employee) {
            this.employeeForm.patchValue(data.employee);
        }
    }

    ngOnInit(): void {
        this.loadDepartments();
    }

    loadDepartments(): void {
        this.departmentService.getDepartments().subscribe(departments => {
            this.departments = departments;
        });
    }

    onSubmit(): void {
        console.log('onSubmit called');
        if (this.employeeForm.valid) {
            const formValue = this.employeeForm.value;

            // Always build the payload from scratch
            let employeeData: any = {
                firstName: formValue.firstName,
                lastName: formValue.lastName,
                hireDate: formValue.hireDate ? new Date(formValue.hireDate).toISOString() : undefined,
                departmentId: Number(formValue.departmentId),
                phone: formValue.phone || '',
                address: formValue.address || ''
            };

            // Only add id for update
            if (this.isEdit && formValue.id != null) {
                employeeData = { ...employeeData, id: formValue.id };
            }

            console.log('Final employee payload being sent to backend:', employeeData);

            if (this.isEdit) {
                this.employeeService.updateEmployee(employeeData).subscribe({
                    next: (response) => {
                        this.snackBar.open('Employee updated successfully', 'Close', { duration: 3000 });
                        this.dialogRef.close(true);
                    },
                    error: (error) => {
                        this.snackBar.open('Error updating employee', 'Close', { duration: 3000 });
                        console.error('Error updating employee:', error);
                    }
                });
            } else {
                this.employeeService.createEmployee(employeeData).subscribe({
                    next: (response) => {
                        this.snackBar.open('Employee created successfully', 'Close', { duration: 3000 });
                        this.dialogRef.close(true);
                    },
                    error: (error) => {
                        this.snackBar.open('Error creating employee', 'Close', { duration: 3000 });
                        console.error('Error creating employee:', error);
                    }
                });
            }
        } else {
            console.log('Form is invalid:', this.employeeForm.errors, this.employeeForm.value);
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
} 