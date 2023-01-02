import { ModalController } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit {
  @ViewChild('btnAddCart') btnAddCart: ElementRef;
  public carts: Cart[] = [];
  private unsubscribe$: Subject<any> = new Subject<any>()
  constructor(
    private router: Router,
    private cartService: CartService,
    private modalController: ModalController) {
    this.cartService.cartStateObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((carts: Cart[]) => {
      this.carts = carts
    })
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    this.cartService.getAllCart()
  }

  slideOpts = {
    slidesPerView: 1,
  };

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
