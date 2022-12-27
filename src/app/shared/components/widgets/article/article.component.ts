import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ArticleDetailComponent } from '../../modals/article-detail/article-detail.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  public show() {
    this.modalController.create({
      component: ArticleDetailComponent
    }).then((modal) => {
      modal.present();
    });
  }
}
