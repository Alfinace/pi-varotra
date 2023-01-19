import { Component, OnInit } from '@angular/core';
import { New } from 'src/app/models/new.model';
import { NewService } from 'src/app/services/new.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  public news: New[] = [

  ]
  constructor(private newService: NewService) { }

  ngOnInit() {
    this.newService.getNews(0, 20).subscribe((news: any) => {
      this.news = news.rows;
    })
  }

}
