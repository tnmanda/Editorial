import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InvestigationEmail } from '../../../../shared/models/investigation-email.model';
import { FormGroupDirective, FormGroup, FormControl, Validators } from '@angular/forms';
import { HumanReviewFormsControl } from '../../../../../../human-review-sdk/human-review-forms-control.class';
import { HumanReviewFormsService } from '../../../../../../human-review-sdk/human-review-forms.service';
import { InvestigationService } from '../../../../shared/services/investigation.service';
import { wco_environment } from '../../../../shared/models/wco-environment';
import { TokenService } from '../../../../shared/services/token.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hr-send-email-dialog',
  templateUrl: './send-email-dialog.component.html',
  styleUrls: ['./send-email-dialog.component.css']
})
export class SendEmailDialogComponent extends HumanReviewFormsControl implements OnInit {

  investigationEmailSubscription: Subscription;

  constructor(public humanReviewFormsSvc: HumanReviewFormsService,
              private investigationSrv: InvestigationService,
              private tokenService: TokenService,
              public dialogRef: MatDialogRef<SendEmailDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public investigationEmail: InvestigationEmail) {
    super(new FormGroup({
      'recipientEmail' : new FormControl('', Validators.required),
      'subject' : new FormControl('', Validators.required),
      'message' : new FormControl('', Validators.required)
    }), humanReviewFormsSvc);
  }

  ngOnInit() {
    this.generateFormData();
  }

  generateFormData() {
    if (this.investigationEmail) {

      this.humanReviewForm.setValue({
          recipientEmail: 'elmer.sanpedro@spi-global.com',
          subject: '',
          message: '',
      });
    }
  }

  onSubmit(formDirective: FormGroupDirective) {
    console.log(formDirective);
    if (formDirective.valid) {
      const invEmail = new InvestigationEmail();
      invEmail.appUserID = this.investigationEmail.appUserID;
      invEmail.indexFromWorkTable = this.investigationEmail.indexFromWorkTable;
      invEmail.recipientEmail = <string>this.humanReviewForm.get('recipientEmail').value;
      invEmail.subject = <string>this.humanReviewForm.get('subject').value;
      invEmail.message = <string>this.humanReviewForm.get('message').value;

      console.log(invEmail);

      this.investigationSrv.apiUrl = wco_environment.investigation.email;
      this.investigationSrv.apiToken = this.tokenService.getTokenFromAuthModel(wco_environment.api_token);
      this.investigationEmailSubscription = this.investigationSrv.postEmail(invEmail).subscribe(result => {
        console.log(result);
        this.dialogRef.close();
      });
    }
  }

}
