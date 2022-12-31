import { ModalController } from '@ionic/angular';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  @ViewChild('btnAddCart') btnAddCart: ElementRef;
  constructor(
    private modalController: ModalController) { }

  slideOpts = {
    slidesPerView: 1,
  };
  ngOnInit() { }

  public close() {
    this.modalController.dismiss();
  }

  public logScrollStart() {
    // this.btnAddCart.nativeElement.setAttribute('class', 'fixed-row btn-row mt');
    // this.btnAddCart.nativeElement.style.opacity = '1';
  }
  public logScrolling(event: any) {
    if (event.detail.scrollTop > 100) {
      this.btnAddCart.nativeElement.setAttribute('class', 'fixed-row btn-row mt');
    } else {
      this.btnAddCart.nativeElement.setAttribute('class', 'btn-row mt');
    }
    this.btnAddCart.nativeElement.style.opacity = (event.detail.scrollTop / 500).toString();

    // }
    // this.btnAddCart.nativeElement.setAttribute('class', 'fixed-row btn-row mt');
  }

  public logScrollEnd() {
    // this.btnAddCart.nativeElement.setAttribute('class', 'btn-row mt');
    // this.btnAddCart.nativeElement.style.opacity = '1';
  }
}
