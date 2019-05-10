import { Injectable, OnDestroy } from '@angular/core';
import { AppErrorHandler } from '../../helpers/app-error-handler';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NewsNav, NewsData } from '../../models/news/news-nav.model';
import { map, catchError } from 'rxjs/operators';
import { News, NewsHRToken, NewsObject } from '../../models/news/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService  extends AppErrorHandler implements OnDestroy {

  public apiUrl: string;
  private error = 'api url endpoint not set!';

  ngOnDestroy(): void {
       this.apiUrl = null;
  }

  constructor(private http: HttpClient) {
    super();
  }

  getNavs(id: number): Observable<Array<NewsNav>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.get<Array<NewsNav>>(`${this.apiUrl}${id}`)
    .pipe(map((response: Array<NewsNav>) => {
      return response;
    }), catchError(this.handleError));
  }

  getNews(item: NewsData): Observable<Array<News>> {
    if (this.apiUrl === null) {
      return throwError(this.error);
    }

    return this.http.post(this.apiUrl, item)
    .pipe(map((response: Array<News>) => {
      return response;
    }), catchError(this.handleError));
  }

  getNewsObject(item: NewsHRToken) {
    return this.http.post(this.apiUrl, item)
    .pipe(map((response: NewsObject) => {
      return response;
    }), catchError(this.handleError));
  }
}
