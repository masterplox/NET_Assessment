import { Routes } from '@angular/router';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/departments', pathMatch: 'full' },
    { path: 'employees', component: EmployeeListComponent },
    { path: 'departments', component: DepartmentListComponent },
    { path: '**', redirectTo: '/employees' }
];
