import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceBrandComponent } from 'src/app/services/service-brand/service-brand.component';
import { BRAND_ADD_SUCESS, DESC_REQUIERES, ERROR, MIN_3_CHARAC, MIN_5_CHARAC, NAME_REQUIERES, SERVICE_UNAVAILABLE, SUCCESS, TIME_OUT, TIME_OUT_NUM, VALID_PATTERN } from 'src/app/shared/Constants';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-create-brand',
  template: `
  <div class="container">
    <app-input-molecule
      [title]="'Create new brand'"
      [namePlace]="'Enter name'"
      [namePlace2]="'Enter description'"
      [nameLabel]="'Brand Name'"
      [descLabel]="'Brand Description'"
      [nameControl]="nameControl"
      [descriptionControl]="descriptionControl"
      [getNameErrorMessage]="getNameErrorMessage"
      [getDescriptionErrorMessage]="getDescriptionErrorMessage"
      [textButon]="' Create '"
      (formSubmit)="onCreateBrands()">
    </app-input-molecule>
  </div>
`,
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent implements OnInit {

  nameControl: FormControl;
  descriptionControl: FormControl;

  constructor(
    private apiService: ServiceBrandComponent,
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

  onCreateBrands() {
    const name = this.nameControl.value;
    const description = this.descriptionControl.value;
    this.apiService.createBrand(name!, description!).subscribe({
      next: (response) => {
        this.toastService.showToast(BRAND_ADD_SUCESS,SUCCESS);
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