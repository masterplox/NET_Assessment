import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Department } from '../../models/department.model';
import { Employee } from '../../models/employee.model';
import { DepartmentService } from '../../services/department.service';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeFormComponent } from './employee-form.component';

describe('EmployeeFormComponent', () => {
    let component: EmployeeFormComponent;
    let fixture: ComponentFixture<EmployeeFormComponent>;
    let employeeService: jasmine.SpyObj<EmployeeService>;
    let departmentService: jasmine.SpyObj<DepartmentService>;
    let dialogRef: jasmine.SpyObj<MatDialogRef<EmployeeFormComponent>>;

    const mockEmployee: Employee = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        hireDate: new Date(),
        departmentId: 1,
        phone: '1234567890',
        address: '123 Main St'
    };

    const mockDepartment: Department = {
        id: 1,
        name: 'Engineering',
        description: 'Software Development'
    };

    beforeEach(async () => {
        const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['createEmployee', 'updateEmployee']);
        const departmentServiceSpy = jasmine.createSpyObj('DepartmentService', ['getDepartments']);
        const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

        await TestBed.configureTestingModule({
            imports: [
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule,
                MatDatepickerModule,
                MatNativeDateModule,
                ReactiveFormsModule,
                BrowserAnimationsModule
            ],
            declarations: [EmployeeFormComponent],
            providers: [
                FormBuilder,
                { provide: EmployeeService, useValue: employeeServiceSpy },
                { provide: DepartmentService, useValue: departmentServiceSpy },
                { provide: MatDialogRef, useValue: dialogRefSpy },
                { provide: MAT_DIALOG_DATA, useValue: { employee: null } }
            ]
        }).compileComponents();

        employeeService = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
        departmentService = TestBed.inject(DepartmentService) as jasmine.SpyObj<DepartmentService>;
        dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<EmployeeFormComponent>>;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeFormComponent);
        component = fixture.componentInstance;
        departmentService.getDepartments.and.returnValue(of([mockDepartment]));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load departments on init', () => {
        expect(departmentService.getDepartments).toHaveBeenCalled();
        expect(component.departments).toEqual([mockDepartment]);
    });

    it('should create employee', () => {
        employeeService.createEmployee.and.returnValue(of(mockEmployee));
        component.employeeForm.setValue({
            firstName: 'John',
            lastName: 'Doe',
            hireDate: new Date(),
            departmentId: 1,
            phone: '1234567890',
            address: '123 Main St'
        });
        component.onSubmit();
        expect(employeeService.createEmployee).toHaveBeenCalled();
        expect(dialogRef.close).toHaveBeenCalled();
    });

    it('should update employee', () => {
        component.data = { employee: mockEmployee };
        employeeService.updateEmployee.and.returnValue(of(mockEmployee));
        component.employeeForm.setValue({
            firstName: 'John',
            lastName: 'Doe',
            hireDate: new Date(),
            departmentId: 1,
            phone: '1234567890',
            address: '123 Main St'
        });
        component.onSubmit();
        expect(employeeService.updateEmployee).toHaveBeenCalled();
        expect(dialogRef.close).toHaveBeenCalled();
    });
}); 