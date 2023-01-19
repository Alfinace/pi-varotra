import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpService) { }

  public getArticles(page: number, size: number) {
    return this.http.get('articles?page=' + page + '&size=' + size);
  }

  public getArticlesCurrentUser(page: number, size: number) {
    return this.http.get('articles/current-user?page=' + page + '&size=' + size);
  }


  public getArticle(id: number) {
    return this.http.get(`articles/${id}`);
  }

  public createArticle(article: any) {
    return this.http.post('articles', article);
  }

  public updateArticle(id: number, article: any) {
    return this.http.put(`articles/${id}`, article);
  }

  public deleteArticle(id: number) {
    return this.http.delete(`articles/${id}`);
  }

  public getAndFitlerArticles(filter: any) {
    return this.http.post('articles/filter', filter);
  }
}