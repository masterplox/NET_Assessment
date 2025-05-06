import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
    let service: EmployeeService;
    let httpMock: HttpTestingController;

    const mockEmployee: Employee = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        hireDate: new Date(),
        departmentId: 1,
        phone: '1234567890',
        address: '123 Main St'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [EmployeeService]
        });

        service = TestBed.inject(EmployeeService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get employees', () => {
        const mockEmployees: Employee[] = [mockEmployee];

        service.getEmployees().subscribe(employees => {
            expect(employees).toEqual(mockEmployees);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/employees`);
        expect(req.request.method).toBe('GET');
        req.flush(mockEmployees);
    });

    it('should get employee by id', () => {
        service.getEmployee(1).subscribe(employee => {
            expect(employee).toEqual(mockEmployee);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/employees/1`);
        expect(req.request.method).toBe('GET');
        req.flush(mockEmployee);
    });

    it('should create employee', () => {
        service.createEmployee(mockEmployee).subscribe(employee => {
            expect(employee).toEqual(mockEmployee);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/employees`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockEmployee);
        req.flush(mockEmployee);
    });

    it('should update employee', () => {
        service.updateEmployee(mockEmployee).subscribe(employee => {
            expect(employee).toEqual(mockEmployee);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/employees/1`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(mockEmployee);
        req.flush(mockEmployee);
    });

    it('should delete employee', () => {
        service.deleteEmployee(1).subscribe();

        const req = httpMock.expectOne(`${environment.apiUrl}/employees/1`);
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
}); 