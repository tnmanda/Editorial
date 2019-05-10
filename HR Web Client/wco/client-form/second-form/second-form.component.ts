import { Component, OnInit } from '@angular/core';
import { HumanReviewFormsControl } from '../../../../human-review-sdk/human-review-forms-control.class';
import { HumanReviewFormsService } from '../../../../human-review-sdk/human-review-forms.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'hr-second-form',
  templateUrl: './second-form.component.html',
  styleUrls: ['./second-form.component.css']
})
export class SecondFormComponent extends HumanReviewFormsControl implements OnInit {

  constructor(public humanReviewFormsSvc: HumanReviewFormsService) {
    super(new FormGroup({
      'FirstName' : new FormControl('', Validators.required),
      'LastName' : new FormControl('', Validators.required),
      'Address' : new FormControl('', Validators.required),
      'City' : new FormControl('', Validators.required),
      'State' : new FormControl('', Validators.required),
      'ZipCode' : new FormControl('', Validators.required),
      'Notes' : new FormControl('')
    }), humanReviewFormsSvc);
  }

  ngOnInit() {
  }

}
