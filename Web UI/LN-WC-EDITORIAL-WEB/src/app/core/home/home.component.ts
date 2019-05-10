import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {

  constructor(private globalHelperSrv: GlobalHelperService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.add({severity: 'success', summary: 'Success Message',
    detail: 'Welcome, ' + this.globalHelperSrv.getCurrentUser()});
  }

}
