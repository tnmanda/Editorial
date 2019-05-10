import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EditorialFormsService {

  public bwqEntityForm: FormGroup;

  constructor() { }

  registerForm(bwqEntityForm) {
    this.bwqEntityForm = bwqEntityForm;
  }
}
