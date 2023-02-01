import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.page.html',
  styleUrls: ['./list-article.page.scss'],
})
export class ListArticlePage implements OnInit {
  public articles: Article[] = [];
  totalRecords: any;
  rows: number = 5;
  loading: boolean = true;
  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getArticles(0, this.rows).subscribe((data: any) => {
      this.articles = data.rows;
      this.totalRecords = data.count;
      this.loading = false;
    })
  }

  paginate(event: any) {
    this.articleService.getArticles(event.first, event.rows).subscribe((data: any) => {
      this.articles = data.rows;
      this.totalRecords = data.count;
      this.loading = false;
    }
    )
  }

}
