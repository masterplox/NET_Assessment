import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatToolbarModule,
                MatIconModule,
                MatButtonModule
            ],
            declarations: [AppComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it('should have title "Employee Management"', () => {
        expect(component.title).toEqual('Employee Management');
    });

    it('should render title in toolbar', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('mat-toolbar span').textContent).toContain('Employee Management');
    });
});
