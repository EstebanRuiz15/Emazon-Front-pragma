import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default buttonText', () => {
    expect(component.buttonText).toBe('Click Me');
  });

  it('should emit buttonClick event when clicked', () => {
    jest.spyOn(component.buttonClick, 'emit');

    component.handleClick();

    expect(component.buttonClick.emit).toHaveBeenCalled();
  });

  it('should not emit buttonClick event when disabled', () => {
    component.disabled = true;
    jest.spyOn(component.buttonClick, 'emit');

    component.handleClick();

    expect(component.buttonClick.emit).not.toHaveBeenCalled();
  });

  it('should change hover state on mouse over', () => {
    component.onMouseOver();
    expect(component.hover).toBe(true);
  });

  it('should change hover state on mouse leave', () => {
    component.hover = true; 
    component.onMouseLeave();
    expect(component.hover).toBe(false);
  });

  it('should return correct button style', () => {
    const style = component.buttonStyle;
    expect(style['background-color']).toBe(component.buttonColor);
    expect(style['cursor']).toBe('pointer');
    expect(style['opacity']).toBe('1');
    
    component.disabled = true;
    const disabledStyle = component.buttonStyle;
    expect(disabledStyle['background-color']).toBe('#cccccc');
    expect(disabledStyle['cursor']).toBe('not-allowed');
    expect(disabledStyle['opacity']).toBe('0.7');
  });

  it('should return hover color when hovered', () => {
    component.hoverColor = '#AE60EB';
    component.hover = true; 
    const style = component.buttonStyle;
    expect(style['background-color']).toBe(component.hoverColor);
  });
});