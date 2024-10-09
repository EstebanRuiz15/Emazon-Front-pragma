import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { CreateCategoryModule } from './create-category.module';
import { CreateCategoryComponent } from './create-category.component';
import { ServiceCategoryComponent } from 'src/app/services/service-category/service-category.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { InputComponent } from '../../atoms/input/input.component';
import { InputMoleculeComponent } from '../../molecules/input-molecule/input-molecule.component';
import { CATEGORY_ADD_SUCESS, TIME_OUT, SERVICE_UNAVAILABLE, NAME, DESCRIPTION, ZERO, TIME_OUT_NUM } from 'src/app/shared/Constants';

describe('CreateCategoryComponent', () => {
  let component: CreateCategoryComponent;
  let fixture: ComponentFixture<CreateCategoryComponent>;
  let mockServiceCategory: jest.Mocked<ServiceCategoryComponent>;

  beforeEach(async () => {
    mockServiceCategory = {
      createCategory: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      declarations: [
        CreateCategoryComponent,
        ButtonComponent,
        InputComponent,
        InputMoleculeComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ServiceCategoryComponent, useValue: mockServiceCategory }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls', () => {
    expect(component.nameControl).toBeDefined();
    expect(component.descriptionControl).toBeDefined();
    expect(component.articleForm.get('name')).toBeDefined();
    expect(component.articleForm.get('description')).toBeDefined();
  });

  describe('onCreateCategory', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should successfully create a category', () => {
      const testName = 'Test Category';
      const testDescription = 'Test Description';
      
      component.nameControl.setValue(testName);
      component.descriptionControl.setValue(testDescription);
      
      mockServiceCategory.createCategory.mockReturnValue(of({ success: true }));
      
      component.onCreateCategory();
      
      expect(mockServiceCategory.createCategory).toHaveBeenCalledWith(testName, testDescription);
      expect(component.successMessage).toBe(CATEGORY_ADD_SUCESS);
      expect(component.errorMessageNombre).toBeNull();
      expect(component.errorMessageDescripcion).toBeNull();
      
      jest.advanceTimersByTime(TIME_OUT_NUM);
      
      expect(component.successMessage).toBeNull();
    });

    it('should handle timeout error', () => {
      mockServiceCategory.createCategory.mockReturnValue(
        throwError(() => ({ name: TIME_OUT }))
      );
      
      component.onCreateCategory();
      
      expect(component.errorMessageDescripcion).toBe(SERVICE_UNAVAILABLE);
      
      jest.advanceTimersByTime(TIME_OUT_NUM);
      
      expect(component.errorMessageDescripcion).toBeNull();
    });

    it('should handle network error', () => {
      mockServiceCategory.createCategory.mockReturnValue(
        throwError(() => ({ status: ZERO }))
      );
      
      component.onCreateCategory();
      
      expect(component.errorMessageDescripcion).toBe(SERVICE_UNAVAILABLE);
    });

    it('should handle name-related error', () => {
      const errorMessage = 'Invalid name';
      mockServiceCategory.createCategory.mockReturnValue(
        throwError(() => ({ error: { message: `${NAME} ${errorMessage}` } }))
      );
      
      component.onCreateCategory();
      
      expect(component.errorMessageNombre).toContain(errorMessage);
    });

    it('should handle description-related error', () => {
      const errorMessage = 'Invalid description';
      mockServiceCategory.createCategory.mockReturnValue(
        throwError(() => ({ error: { message: `${DESCRIPTION} ${errorMessage}` } }))
      );
      
      component.onCreateCategory();
      
      expect(component.errorMessageDescripcion).toContain(errorMessage);
    });
  });

  describe('Form Validation', () => {
    it('should be invalid when empty', () => {
      expect(component.articleForm.valid).toBeFalsy();
    });

    it('should be valid when both fields are filled', () => {
      component.nameControl.setValue('Test Name');
      component.descriptionControl.setValue('Test Description');
      
      expect(component.articleForm.valid).toBeTruthy();
    });
  });
});

describe('CreateCategoryModule', () => {
  it('should compile', () => {
    const module = TestBed.configureTestingModule({
      imports: [CreateCategoryModule]
    });

    expect(module).toBeDefined();
  });
});