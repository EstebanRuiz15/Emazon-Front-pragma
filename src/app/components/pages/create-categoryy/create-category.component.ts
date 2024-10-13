import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ServiceCategoryComponent } from 'src/app/services/service-category/service-category.component'; 
import { CATEGORY_ADD_SUCESS,TIME_OUT,SERVICE_UNAVAILABLE, NAME, DESCRIPTION, ZERO, TIME_OUT_NUM, NAME_REQUIERES, MIN_3_CHARAC, VALID_PATTERN, DESC_REQUIERES, MIN_5_CHARAC, SUCCESS, ERROR } from 'src/app/shared/Constants';
import { ToastService } from 'src/app/services/toast/toast.service';
@Component({
  selector: 'app-create-article',
  template: `
    <div class="container">
      <app-input-molecule
        [title]="'Create Category'"
        [namePlace]="'Enter name'"
        [namePlace2]="'Enter description'"
        [nameLabel]="'Category Name'"
        [descLabel]="'Category Description'"
        [nameControl]="nameControl"
        [descriptionControl]="descriptionControl"
        [getNameErrorMessage]="getNameErrorMessage"
        [getDescriptionErrorMessage]="getDescriptionErrorMessage"
        [textButon]="' Create '"
        (formSubmit)="onCreateCategory()">
      </app-input-molecule>
    </div>
  `,
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {

  nameControl: FormControl;
  descriptionControl: FormControl;

  constructor(
    private apiService: ServiceCategoryComponent,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {
    this.nameControl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[a-zA-Z0-9 ]*$/) 
    ]);
    
    this.descriptionControl = this.formBuilder.control('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/^[a-zA-Z0-9 ]*$/) 
    ]);
  }
  

  ngOnInit(): void {}
  getNameErrorMessage = (): string => {
    if (this.nameControl.hasError('required')) {
      return NAME_REQUIERES;
    }
    if (this.nameControl.hasError('minlength')) {
      return MIN_3_CHARAC;
    }
    if (this.nameControl.hasError('pattern')) {
      return VALID_PATTERN;
    }
    return '';
  }

  getDescriptionErrorMessage = (): string => {
    if (this.descriptionControl.hasError('required')) {
      return DESC_REQUIERES;

    }
    if (this.descriptionControl.hasError('minlength')) {
      return MIN_5_CHARAC;
    }
    if (this.descriptionControl.hasError('pattern')) {
      return VALID_PATTERN;
    }
    return '';
  }

  onCreateCategory() {
    const name = this.nameControl.value;
    const description = this.descriptionControl.value;
    this.apiService.createCategory(name!, description!).subscribe({
      next: (response) => {
        this.toastService.showToast(CATEGORY_ADD_SUCESS,SUCCESS);
        this.setMessageTimeout();
      },
      error: (error) => {
        if (error.name === TIME_OUT) {
          this.toastService.showToast(SERVICE_UNAVAILABLE,ERROR);
        } else if (error.error?.message) {
          const messages = error.error.message;
            this.toastService.showToast(messages.trim(),ERROR);
        }
        this.setMessageTimeout();
      }
    });
  }

  setMessageTimeout() {
    setTimeout(() => {
      this.nameControl.setErrors(null);
    this.descriptionControl.setErrors(null);
    }, TIME_OUT_NUM);
  }
}