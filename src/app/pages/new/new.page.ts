import { Component, OnInit } from '@angular/core';
import { New } from 'src/app/models/new.model';
import { NewService } from 'src/app/services/new.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage {
  public loading = true;
  public news: New[] = []
  public page: number = 0;
  public pageSize: number = 10;
  constructor(private newService: NewService) { }

  ionViewWillEnter() {
    this.newService.getNews(0, 20).subscribe((news: any) => {
      this.news = news.rows;
      this.loading = false;
    })
  }

  loadData(event: any) {
    this.page++;
    this.newService.getNews(this.page, this.pageSize).subscribe((news: any) => {
      this.news = news.rows;
      this.loading = false;
      event.target.complete();
      if (this.news.length === news.count) {
        event.target.disabled = true;
      }
    })
  }

}
