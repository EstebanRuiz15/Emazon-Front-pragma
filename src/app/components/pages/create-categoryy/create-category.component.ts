import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ServiceCategoryComponent } from 'src/app/services/service-category/service-category.component'; 
import { CATEGORY_ADD_SUCESS,TIME_OUT,SERVICE_UNAVAILABLE, NAME, DESCRIPTION, ZERO, TIME_OUT_NUM } from 'src/app/shared/Constants';
@Component({
  selector: 'app-create-article',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  articleForm: FormGroup;
  nameControl: FormControl;
  descriptionControl: FormControl;
  respuestaApi: any = null;
  errorMessageNombre: string | null = null;
  errorMessageDescripcion: string | null = null;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ServiceCategoryComponent
  ) {
    this.nameControl = new FormControl('', Validators.required);
    this.descriptionControl = new FormControl('', Validators.required);

    this.articleForm = this.formBuilder.group({
      name: this.nameControl,
      description: this.descriptionControl
    });
  }

  ngOnInit(): void {
    this.nameControl.valueChanges.subscribe(value => {
    });

    this.descriptionControl.valueChanges.subscribe(value => {
    });
  }

  onCreateCategory() {
    const name = this.nameControl.value;
    const description = this.descriptionControl.value;
    this.apiService.createCategory(name, description).subscribe({
      next: (response) => {
        this.respuestaApi = response;
        this.successMessage = CATEGORY_ADD_SUCESS;
          this.errorMessageNombre = null;
        this.errorMessageDescripcion = null;
        this.articleForm.reset();
        this.setMessageTimeout();
      },
      error: (error) => {
        if (error.name === TIME_OUT) {
          this.errorMessageDescripcion = SERVICE_UNAVAILABLE;
        } else if (error.status === ZERO) {
          this.errorMessageDescripcion = SERVICE_UNAVAILABLE;
        } else if (error.error?.message) {
          const messages = error.error.message;
          if (messages.toLowerCase().includes(NAME)) {
            this.errorMessageNombre = messages.trim();
          } else if (messages.toLowerCase().includes(DESCRIPTION)) {
            this.errorMessageDescripcion = messages.trim();
          }
        }
        this.setMessageTimeout();
      }
    });
  }


  setMessageTimeout() {
    setTimeout(() => {
      this.successMessage = null;
      this.errorMessageNombre = null;
      this.errorMessageDescripcion = null;
    }, TIME_OUT_NUM);
  }
}