import { Component, OnInit, OnDestroy } from '@angular/core';
import { SingleSignOnService } from 'src/app/shared/services/admin/single-sign-on.service';
import { SingleSignOn } from 'src/app/shared/models/admin/single-sign-on.model';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-single-sign-on',
  templateUrl: './single-sign-on.component.html',
  styleUrls: ['./single-sign-on.component.css']
})
export class SingleSignOnComponent implements OnInit, OnDestroy {

  singleSignOn: SingleSignOn;
  singleSignOnAllSubscription: Subscription;

  constructor(private SingleSignOnSrv: SingleSignOnService) { }

  ngOnInit() {
    this.getSingleSignOnData();
  }

  getSingleSignOnData() {
    this.SingleSignOnSrv.apiUrl = environment.single_sign_on.root;
    this.singleSignOnAllSubscription = this.SingleSignOnSrv.getSingleSignOn().subscribe((item: SingleSignOn) => {
      this.singleSignOn = item;
      const redirectURL = this.singleSignOn.url + 'email=' + this.singleSignOn.email + '&token=' + this.singleSignOn.token;
      window.open(redirectURL, '_blank');
    });
  }

  ngOnDestroy(): void {
    if (this.singleSignOnAllSubscription) { this.singleSignOnAllSubscription.unsubscribe(); }
  }

}
