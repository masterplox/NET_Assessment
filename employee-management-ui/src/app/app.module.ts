import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

// Components
import { AppComponent } from './app.component';
import { DepartmentFormComponent } from './components/department-form/department-form.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

@NgModule({
    declarations: [
        AppComponent,
        EmployeeListComponent,
        EmployeeFormComponent,
        DepartmentListComponent,
        DepartmentFormComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatTooltipModule
    ],
    providers: [
        provideNativeDateAdapter(),
        {
            provide: MAT_DATE_FORMATS,
            useValue: MAT_NATIVE_DATE_FORMATS
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { } 