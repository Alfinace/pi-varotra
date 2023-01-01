import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { CartComponent } from 'src/app/shared/components/modals/cart/cart.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit, OnDestroy {
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

  public gotoLogin() {
    this.router.navigate(['/login']);
  }

  async onCart() {
    let modal = await this.modalController.create({
      component: CartComponent,
      animated: true,
    })

    await modal.present();

  }
}
