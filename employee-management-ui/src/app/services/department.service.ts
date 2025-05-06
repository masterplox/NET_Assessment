import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Department } from '../models/department.model';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {
    private apiUrl = `${environment.apiUrl}/departments`;

    constructor(private http: HttpClient) { }

    getDepartments(): Observable<Department[]> {
        return this.http.get<Department[]>(this.apiUrl);
    }

    getDepartment(id: number): Observable<Department> {
        return this.http.get<Department>(`${this.apiUrl}/${id}`);
    }

    createDepartment(department: Department): Observable<Department> {
        return this.http.post<Department>(this.apiUrl, department);
    }

    updateDepartment(department: Department): Observable<Department> {
        return this.http.put<Department>(`${this.apiUrl}/${department.id}`, department);
    }

    deleteDepartment(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
} 