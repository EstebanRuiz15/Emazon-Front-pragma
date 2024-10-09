import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default label', () => {
    expect(component.label).toBe('');
  });

  it('should set the value correctly', () => {
    const testValue = 'Test value';
    component.value = testValue;
    expect(component.value).toBe(testValue);
  });

  it('should call onChange and onTouched when the value is set', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange');
    const onTouchedSpy = jest.spyOn(component, 'onTouched');
    
    component.value = 'New value';
    
    expect(onChangeSpy).toHaveBeenCalledWith('New value');
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should write the value', () => {
    const testValue = 'Test write value';
    component.writeValue(testValue);
    expect(component.value).toBe(testValue);
  });

  it('should register onChange callback', () => {
    const callback = jest.fn();
    component.registerOnChange(callback);
    component.value = 'New value';
    
    expect(callback).toHaveBeenCalledWith('New value');
  });

  it('should register onTouched callback', () => {
    const callback = jest.fn();
    component.registerOnTouched(callback);
    component.onTouched();
    
    expect(callback).toHaveBeenCalled();
  });

  it('should update formControl value when ngOnInit is called', () => {
    const formControl = new FormControl('');
    component.formControl = formControl;
    component.ngOnInit();

    formControl.setValue('Form Control Value');
    expect(component.value).toBe('Form Control Value');
  });
});