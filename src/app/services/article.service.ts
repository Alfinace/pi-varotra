import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpService) { }

  public rateArticle(data: any) {
    return this.http.post(`rates`, data);
  }

  public getArticles(page: number, size: number, categoryId?: number) {
    return this.http.get('articles?page=' + page + '&size=' + size + '&categoryId=' + categoryId);
  }

  public getArticlesCurrentUser(page: number, size: number) {
    return this.http.get('articles/current-user?page=' + page + '&size=' + size);
  }

  public getRateArticle(id: number) {
    return this.http.get(`rates/${id}/article`);
  }

  public getArticle(id: number) {
    return this.http.get(`articles/${id}`);
  }

  // public getArticleByCategory(categorieId: number) {
  //   return this.http.get(`articles/category/${categorieId}`);
  // }


  public getArticleBySlug(slug: string) {
    return this.http.get(`articles/slug/${slug}`);
  }

  public createArticle(article: any) {
    return this.http.post('articles', article);
  }

  public updateArticle(id: number, article: any) {
    return this.http.put(`articles/update/${id}`, article);
  }

  public deleteArticle(id: number) {
    return this.http.delete(`articles/delete/${id}`);
  }

  public getAndFitlerArticles(filter: any, page: number, size: number) {
    return this.http.post('articles/filter?page=' + page + '&size=' + size, filter);
  }
}
