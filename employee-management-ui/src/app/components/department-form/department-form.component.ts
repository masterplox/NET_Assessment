import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department.service';

@Component({
    selector: 'app-department-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule
    ],
    templateUrl: './department-form.component.html',
    styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
    departmentForm: FormGroup;
    isEditMode: boolean;

    constructor(
        private fb: FormBuilder,
        private departmentService: DepartmentService,
        private dialogRef: MatDialogRef<DepartmentFormComponent>,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: { department: Department | null }
    ) {
        this.isEditMode = !!data.department;
        this.departmentForm = this.fb.group({
            name: ['', [Validators.required, Validators.maxLength(50)]],
            description: ['', [Validators.maxLength(200)]]
        });
    }

    ngOnInit(): void {
        if (this.isEditMode && this.data.department) {
            this.departmentForm.patchValue(this.data.department);
        }
    }

    onSubmit(): void {
        if (this.departmentForm.valid) {
            const department: Department = {
                ...this.departmentForm.value,
                id: this.isEditMode ? this.data.department?.id : undefined
            };

            console.log('Department data being sent to backend:', department);

            if (this.isEditMode) {
                this.departmentService.updateDepartment(department).subscribe({
                    next: (response) => {
                        this.snackBar.open('Department updated successfully', 'Close', { duration: 3000 });
                        this.dialogRef.close(true);
                    },
                    error: (error) => {
                        this.snackBar.open('Error updating department', 'Close', { duration: 3000 });
                        console.error('Error updating department:', error);
                    }
                });
            } else {
                this.departmentService.createDepartment(department).subscribe({
                    next: (response) => {
                        this.snackBar.open('Department created successfully', 'Close', { duration: 3000 });
                        this.dialogRef.close(true);
                    },
                    error: (error) => {
                        this.snackBar.open('Error creating department', 'Close', { duration: 3000 });
                        console.error('Error creating department:', error);
                    }
                });
            }
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
} 