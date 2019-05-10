import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HumanReviewFormsControl } from '../../../../human-review-sdk/human-review-forms-control.class';
import { HumanReviewFormsService } from '../../../../human-review-sdk/human-review-forms.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'wco-first-form',
  templateUrl: './first-form.component.html',
  styleUrls: ['./first-form.component.css']
})
export class FirstFormComponent extends HumanReviewFormsControl implements OnInit {


  constructor(public sampleForm: FormGroup, public humanReviewFormsSvc: HumanReviewFormsService) {
    super(sampleForm = new FormGroup({
      'FirstName' : new FormControl('', Validators.required),
    }), humanReviewFormsSvc);
   }

  ngOnInit() {

  }

}
