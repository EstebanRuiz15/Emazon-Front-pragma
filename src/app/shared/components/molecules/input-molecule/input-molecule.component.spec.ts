import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMoleculeComponent } from './input-molecule.component';

describe('InputMoleculeComponent', () => {
  let component: InputMoleculeComponent;
  let fixture: ComponentFixture<InputMoleculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputMoleculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputMoleculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
