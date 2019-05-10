import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { Watch } from 'src/app/shared/models/news/watch.model';
import { Subscription } from 'rxjs';
import { LanguageType } from 'src/app/shared/models/admin/types/language-type.model';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { MessageService } from 'primeng/api';
import { LanguageTypeService } from 'src/app/shared/services/admin/types/language-type.service';
import { environment } from 'src/environments/environment';
import { WatchService } from 'src/app/shared/services/news/watch.service';

@Component({
  selector: 'app-watch-edit-dialog',
  templateUrl: './watch-edit-dialog.component.html',
  styleUrls: ['./watch-edit-dialog.component.css']
})
export class WatchEditDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() selectedWatch: Watch;

  // Modal Dialog
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  isSubmitted = false;

  watchEditSubscription: Subscription;
  languageTypeAllSubscription: Subscription;

  languageTypes: LanguageType[];

  watchForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.watchForm.controls; }

  constructor(private globalHelperSrv: GlobalHelperService,
              private watchSrv: WatchService,
              private messageService: MessageService,
              private languageTypeSrv: LanguageTypeService) { }

  ngOnInit() {
    this.getLanguageTypes();
  }

  ngOnChanges(): void {
    if (this.selectedWatch) {
      this.generateForm();
      this.watchForm.setValue({
          caption: this.selectedWatch.caption,
          description: this.selectedWatch.description,
          comments: this.selectedWatch.comments,
          language: this.selectedWatch.language,
          inArtikleTitle: this.selectedWatch.inArtikleTitle,
          inArtikleDescription: this.selectedWatch.inArtikleDescription,
      });
    }
  }

  generateForm() {
    this.watchForm = new FormGroup ({
      'caption' : new FormControl('', Validators.required),
      'description' : new FormControl('', Validators.required),
      'comments' : new FormControl('', Validators.required),
      'language' : new FormControl('', Validators.required),
      'inArtikleTitle' : new FormControl(false, Validators.required),
      'inArtikleDescription' : new FormControl(false, Validators.required),
    });
  }

  getLanguageTypes() {
    this.languageTypeSrv.apiUrl = environment.languageType.root;
    this.languageTypeAllSubscription = this.languageTypeSrv.getAll().subscribe((items: Array<LanguageType>) => {
        this.languageTypes = (items || []).sort((a: LanguageType, b: LanguageType) => a.languageTypeName < b.languageTypeName ? -1 : 1);
    });
  }

  onSave(formDirective: FormGroupDirective) {
    this.isSubmitted = true;

    if (formDirective.valid) {
      const watch = new Watch();
      watch.pkWatchID = this.selectedWatch.pkWatchID;
      watch.caption = <string>this.watchForm.get('caption').value;
      watch.description = <string>this.watchForm.get('description').value;
      watch.comments = <string>this.watchForm.get('comments').value;
      watch.fkLanguageID = <number>this.watchForm.get('language').value.languageTypeID;
      watch.inArtikleTitle = <boolean>this.watchForm.get('inArtikleTitle').value;
      watch.inArtikleDescription = <boolean>this.watchForm.get('inArtikleDescription').value;
      watch.lastFilterDate = new Date().toUTCString();

      this.watchSrv.apiUrl = environment.news_management.watch_management.root;
      this.watchEditSubscription = this.watchSrv.put(watch).subscribe(result => {

      // Post Message
      this.messageService.add({severity: 'success', summary: 'Success Message',
      detail: 'Watch successfully updated.' });

      formDirective.reset();
      this.onClose();
    }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.watchForm.reset();
    this.displayChange.emit(false);
    this.selectedWatch = null;
    this.isSubmitted = false;
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }


  ngOnDestroy(): void {
    if (this.watchEditSubscription) { this.watchEditSubscription.unsubscribe(); }
    if (this.languageTypeAllSubscription) { this.languageTypeAllSubscription.unsubscribe(); }
  }


}
