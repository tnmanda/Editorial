import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Watch } from 'src/app/shared/models/news/watch.model';
import { LanguageType } from 'src/app/shared/models/admin/types/language-type.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalHelperService } from 'src/app/shared/helpers/global-helper.service';
import { LanguageTypeService } from 'src/app/shared/services/admin/types/language-type.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { WatchService } from 'src/app/shared/services/news/watch.service';

@Component({
  selector: 'app-watch-add-dialog',
  templateUrl: './watch-add-dialog.component.html',
  styleUrls: ['./watch-add-dialog.component.css']
})
export class WatchAddDialogComponent implements OnInit, OnDestroy, OnChanges {

  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();

  watch: Watch;
  languageTypes: LanguageType[];

  watchAddSubscription: Subscription;
  languageTypeAllSubscription: Subscription;

  isSubmitted = false;

  watchForm: FormGroup;

  errorMessage: string;

  // convenience getter for easy access to form fields
  get f() { return this.watchForm.controls; }

  constructor(private watchSrv: WatchService,
              private languageTypeSrv: LanguageTypeService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getLanguageTypes();
  }

  ngOnChanges() {
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


  onSave(watchForm) {
    this.isSubmitted = true;

    if (watchForm.valid) {
      this.watch = watchForm.value;
      this.watch.fkLanguageID = this.watch.language.languageTypeID;
      this.watch.caption = this.watch.caption;
      this.watch.comments = this.watch.comments;
      this.watch.description = this.watch.description;
      this.watch.inArtikleTitle = this.watch.inArtikleTitle;
      this.watch.inArtikleDescription = this.watch.inArtikleDescription;
      this.watch.wholeWords = null;
      this.watch.mAtchAllKeywords = null;
      this.watch.lastFilterDate = new Date().toUTCString();
      this.watch.language = null;

      this.watchSrv.apiUrl = environment.news_management.watch_management.root;
      this.watchAddSubscription = this.watchSrv.post(this.watch).subscribe(result => {
        this.onClose();

        // Post Message
        this.messageService.add({severity: 'success', summary: 'Success Message',
        detail: 'Watch successfully created.' });

        this.watch = new Watch();
      }, error => { this.errorMessage = error; });
    }
  }

  onClose() {
    this.isSubmitted = false;
    this.watchForm.reset();
    this.displayChange.emit(false);
    this.onCloseMessage();
  }

  onCloseMessage() {
    this.errorMessage = '';
  }


  ngOnDestroy(): void {
    if (this.watchAddSubscription) { this.watchAddSubscription.unsubscribe(); }
    if (this.languageTypeAllSubscription) { this.languageTypeAllSubscription.unsubscribe(); }
  }

}
