import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { Department } from '../models/department.model';
import { DepartmentService } from './department.service';

describe('DepartmentService', () => {
    let service: DepartmentService;
    let httpMock: HttpTestingController;

    const mockDepartment: Department = {
        id: 1,
        name: 'Engineering',
        description: 'Software Development'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DepartmentService]
        });

        service = TestBed.inject(DepartmentService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get departments', () => {
        const mockDepartments: Department[] = [mockDepartment];

        service.getDepartments().subscribe(departments => {
            expect(departments).toEqual(mockDepartments);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/departments`);
        expect(req.request.method).toBe('GET');
        req.flush(mockDepartments);
    });

    it('should get department by id', () => {
        service.getDepartment(1).subscribe(department => {
            expect(department).toEqual(mockDepartment);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/departments/1`);
        expect(req.request.method).toBe('GET');
        req.flush(mockDepartment);
    });

    it('should create department', () => {
        service.createDepartment(mockDepartment).subscribe(department => {
            expect(department).toEqual(mockDepartment);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/departments`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockDepartment);
        req.flush(mockDepartment);
    });

    it('should update department', () => {
        service.updateDepartment(mockDepartment).subscribe(department => {
            expect(department).toEqual(mockDepartment);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/departments/1`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(mockDepartment);
        req.flush(mockDepartment);
    });

    it('should delete department', () => {
        service.deleteDepartment(1).subscribe();

        const req = httpMock.expectOne(`${environment.apiUrl}/departments/1`);
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });
}); 