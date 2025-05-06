import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list.component';

describe('EmployeeListComponent', () => {
    let component: EmployeeListComponent;
    let fixture: ComponentFixture<EmployeeListComponent>;
    let employeeService: jasmine.SpyObj<EmployeeService>;
    let dialog: jasmine.SpyObj<MatDialog>;

    const mockEmployee: Employee = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        hireDate: new Date(),
        departmentId: 1,
        phone: '1234567890',
        address: '123 Main St'
    };

    beforeEach(async () => {
        const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getEmployees', 'deleteEmployee']);
        const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

        await TestBed.configureTestingModule({
            imports: [
                MatTableModule,
                MatButtonModule,
                MatIconModule,
                MatDialogModule,
                MatSnackBarModule
            ],
            declarations: [EmployeeListComponent],
            providers: [
                { provide: EmployeeService, useValue: employeeServiceSpy },
                { provide: MatDialog, useValue: dialogSpy }
            ]
        }).compileComponents();

        employeeService = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
        dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeListComponent);
        component = fixture.componentInstance;
        employeeService.getEmployees.and.returnValue(of([mockEmployee]));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load employees on init', () => {
        expect(employeeService.getEmployees).toHaveBeenCalled();
        expect(component.employees).toEqual([mockEmployee]);
    });

    it('should open dialog for adding employee', () => {
        component.openAddDialog();
        expect(dialog.open).toHaveBeenCalledWith(EmployeeFormComponent, {
            width: '500px',
            data: { employee: null }
        });
    });

    it('should open dialog for editing employee', () => {
        component.openEditDialog(mockEmployee);
        expect(dialog.open).toHaveBeenCalledWith(EmployeeFormComponent, {
            width: '500px',
            data: { employee: mockEmployee }
        });
    });

    it('should delete employee', () => {
        employeeService.deleteEmployee.and.returnValue(of(undefined));
        component.deleteEmployee(1);
        expect(employeeService.deleteEmployee).toHaveBeenCalledWith(1);
        expect(employeeService.getEmployees).toHaveBeenCalled();
    });
}); 