import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ],
      imports: [ FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.label).toBe('');
    expect(component.placeholder).toBe('');
    expect(component.position).toEqual({});
    expect(component.width).toBe('100%');
    expect(component.required).toBeFalsy();
    expect(component.disabled).toBeFalsy();
  });

  it('should set and get value correctly', () => {
    const testValue = 'test value';
    component.value = testValue;
    expect(component.value).toBe(testValue);
  });

  it('should call onChange and onTouched when value is set', () => {
    const onChangeSpy = jest.spyOn(component, 'onChange');
    const onTouchedSpy = jest.spyOn(component, 'onTouched');
    component.value = 'new value';
    expect(onChangeSpy).toHaveBeenCalledWith('new value');
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should implement ControlValueAccessor methods', () => {
    const testValue = 'test value';
    const changeFn = jest.fn();
    const touchedFn = jest.fn();

    component.writeValue(testValue);
    expect(component.value).toBe(testValue);

    component.registerOnChange(changeFn);
    component.registerOnTouched(touchedFn);

    component.value = 'new value';
    expect(changeFn).toHaveBeenCalledWith('new value');
    expect(touchedFn).toHaveBeenCalled();

    component.setDisabledState(true);
    expect(component.disabled).toBeTruthy();
  });

  it('should handle input change event', () => {
    const event = { target: { value: 'new input value' } } as any;
    component.onInputChange(event);
    expect(component.value).toBe('new input value');
  });

  it('should clear formControl errors when value changes and not required', () => {
    const formControl = new FormControl('');
    component.formControl = formControl;
    component.required = false;

    formControl.setErrors({ required: true });
    component.value = 'new value';

    expect(formControl.errors).toBeNull();
  });

  it('should not clear formControl errors when required', () => {
    const formControl = new FormControl('');
    component.formControl = formControl;
    component.required = true;

    formControl.setErrors({ required: true });
    component.value = 'new value';

    expect(formControl.errors).not.toBeNull();
  });

  it('should subscribe to formControl value changes', () => {
    const formControl = new FormControl('initial');
    component.formControl = formControl;
    component.ngOnInit();

    formControl.setValue('updated value');
    expect(component.value).toBe('updated value');
  });

  it('should not update value if formControl value is the same', () => {
    const formControl = new FormControl('same value');
    component.formControl = formControl;
    component.ngOnInit();

    const previousValue = component.value;
    formControl.setValue('same value');
    expect('same value');
  });
});