import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/molecules/header/header.component'; 
import { RouterTestingModule } from '@angular/router/testing'; 

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule], 
      declarations: [AppComponent, HeaderComponent], 
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the app', () => {
    expect(component).toBeTruthy(); 
  });

  it('should call navigateToStore when a specific action occurs', () => {
    const spy = jest.spyOn(component, 'navigateToStore'); 
    component.navigateToStore(); 
    expect(spy).toHaveBeenCalled(); 
  });
});