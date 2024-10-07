import { Component, OnInit } from '@angular/core';
import { ServiceCategoryComponent } from 'src/app/services/service-category/service-category.component';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  name: string = ''; 
  description: string = '';
  respuestaApi: any = null;
  errorMessageNombre: string | null = null;
  errorMessageDescripcion: string | null = null;
  successMessage: string | null = null;

  constructor(private apiService: ServiceCategoryComponent) { }

  ngOnInit(): void {
  }

  onNameChange(newName: string) {
    this.name = newName;
  }

  onDescriptionChange(newDescription: string) {
    this.description = newDescription;
  }

  clearFields() {
    this.name = '';
    this.description = '';
  }

  onCreateCategory() {
    
    this.apiService.createCategory(this.name, this.description).subscribe({
      next: (response) => {
        this.respuestaApi = response; 
        this.successMessage = 'Category created successfully';
        this.errorMessageNombre = null; 
        this.errorMessageDescripcion = null;
        this.clearFields();
        this.setMessageTimeout();
      },
      error: (error) => {
        console.error(error.error.message || 'unknown error');
        if (error.error.message) {
          const messages = error.error.message;
          if (messages.toLowerCase().includes('name')) {
            this.errorMessageNombre = messages.trim(); 
          } else if (messages.toLowerCase().includes('description')) { 
            this.errorMessageDescripcion = messages.trim();
          }
          this.setMessageTimeout();
        }
      }
    });
  }
  setMessageTimeout() {
    setTimeout(() => {
      this.successMessage = null;
      this.errorMessageNombre = null;
      this.errorMessageDescripcion = null;
    }, 5000);  
  }
}
