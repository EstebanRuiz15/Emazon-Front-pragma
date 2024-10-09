import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputMoleculeComponent } from './input-molecule.component';

describe('InputMoleculeComponent', () => {
  let component: InputMoleculeComponent;
  let fixture: ComponentFixture<InputMoleculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputMoleculeComponent],
      imports: [ReactiveFormsModule], 
    }).compileComponents();

    fixture = TestBed.createComponent(InputMoleculeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log name and description controls on init', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    component.nameControl = new FormControl('');
    component.descriptionControl = new FormControl('');

    component.ngOnInit();

    expect(consoleLogSpy).toHaveBeenCalledWith('Name Control:', component.nameControl);
    expect(consoleLogSpy).toHaveBeenCalledWith('Description Control:', component.descriptionControl);
  });

  it('should set default input values', () => {
    expect(component.title).toBe('');
    expect(component.nameLabel).toBe('Name');
    expect(component.descLabel).toBe('Description');
    expect(component.required).toBe(false);
  });

  it('should accept inputs', () => {
    component.title = 'Test Title';
    component.nameLabel = 'Test Name';
    component.descLabel = 'Test Description';
    component.required = true;

    expect(component.title).toBe('Test Title');
    expect(component.nameLabel).toBe('Test Name');
    expect(component.descLabel).toBe('Test Description');
    expect(component.required).toBe(true);
  });
});