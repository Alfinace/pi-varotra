import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSlides, ModalController } from '@ionic/angular';
import { Subject, take, takeUntil } from 'rxjs';

import { ArticleService } from 'src/app/services/article.service';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { Order } from 'src/app/models/order.model';
import { PaymentService } from 'src/app/services/payment.service';
import { SessionService } from 'src/app/services/session.service';
import { ToastService } from 'src/app/services/toast.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit, AfterViewInit, OnDestroy {
  public paymentForm: FormGroup
  public statusPayment = 0;
  public totalAmount: number = 0;
  public paniers: any[] = []
  public id: number;
  public stepper: number = 0;
  public loading: boolean = true;
  items: any[];
  user: User;
  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private cartService: CartService,
    private paimentService: PaymentService,
    private sessionService: SessionService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService) {

  }

  @ViewChild('slider') slider: IonSlides;
  public slideOpts = {};

  get f() {
    return this.paymentForm.value
  }
  private unsubscribe$ = new Subject<void>();
  ionViewWillEnter() {
    this.loading = true;
    this.paimentService.statePayement$.pipe(takeUntil(this.unsubscribe$)).subscribe(state => {
      if (!state && this.loading) return;
      if (state.status == 'success') {
        this.statusPayment = 1;
        this.toastService.show('success', 'Paiement effectué avec succès')

      } else if (state.status == 'cancelled') {
        this.toastService.show('danger', 'Paiement annulé')
      } else {
        this.toastService.show('danger', 'Erreur lors du paiement')
      }
      this.statusPayment = 0;
    })
  }

  ionViewWillleave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async ngOnInit() {
    this.slideOpts = {
      initialSlide: 0,
      speed: 400
    }
    this.paymentForm = this.fb.group({
      panier: ['', Validators.required],
      address: [''],
      fullname: [''],
      city: [''],
      contact: [''],
    })
    this.sessionService.getInfoUser().pipe(take(1)).subscribe(user => {
      if (user) {
        this.user = user
        this.paymentForm.patchValue({
          fullname: user.username,
        })
      }
    })
    this.route.params.subscribe(params => {
      this.paniers = []
      if (parseInt(params['id']) > 0) {
        this.id = parseInt(params['id']) - 1;
        var carts = this.cartService.getAllCartData()
        this.mappingData(carts)
      } else {
        this.router.navigate(['/'])
      }
      this.items = [
        { label: 'Ma commande' },
        { label: 'Information de livraison' },
        { label: 'Paiement' }
      ];

    });
  }

  ngOnDestroy(): void {
    // this.route.params.e
  }

  ngAfterViewInit(): void {
    this.slider.lockSwipes(true);
    this.slider.ionSlideDidChange.subscribe(async () => {
      this.stepper = await this.slider.getActiveIndex();
    });

  }

  close() {
    this.modalController.dismiss()
  }

  public updateQuantity(cart: any, quantity: number, fIndex: number, SIndex: number) {
    if (quantity > 0 && quantity <= cart.stock) {
      this.cartService.updateQuantity(cart.articleId, quantity)
      this.paniers[fIndex][SIndex].quantity = quantity
    }
  }

  async mappingData(carts: Cart[],) {
    this.totalAmount = 0
    var panierObject = {}
    var promiseArray: any[] = []
    if (carts.length == 0) {
      this.router.navigate(['space-client']);
      return
    }
    for (let i = 0; i < carts.length; i++) {
      let cart = carts[i];
      let promise = new Promise((resolve, reject) => {
        this.articleService.getArticle(cart.articleId).toPromise().then(c => {
          if (!c.archived) {
            cart = { ...cart, ...c }
            resolve(cart)
          } else {
            this.cartService.removeCart(cart.articleId)
            resolve(null)
          }
        }).catch(err => {
          this.cartService.removeCart(cart.articleId)
          resolve(null)
        })
      })
      promiseArray.push(promise)
    }
    let data = await Promise.all(promiseArray) as any[]
    data = data.filter(d => d != null)
    for (let i = 0; i < data.length; i++) {
      const p = data[i];
      let key = p.storeId?.toString()
      if (!panierObject.hasOwnProperty(`${key}`)) {
        panierObject = {
          ...panierObject,
          [key as any]: data.filter(d => d.storeId == key)
        }
      }
    }
    let pToArray = Object.entries(panierObject);
    this.paniers.push(pToArray[this.id][1]);
    this.paniers = this.paniers[0]
    for (let i = 0; i < this.paniers.length; i++) {
      const p = this.paniers[i];
      this.totalAmount += p.quantity * p.unitPrice
    }
    this.paymentForm.patchValue({
      panier: [...this.paniers]
    })

    this.loading = false;
  }


  public totalCmd(cart: any[]): number {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      const c = cart[i];
      total += c.quantity * c.unitPrice
    }
    return total
  }


  public removeCart(articleId: number, fIndex: number, SIndex: number) {
    this.cartService.removeCart(articleId)
    this.paniers[fIndex].splice(SIndex, 1);
    this.paniers = this.paniers.filter(p => p.length > 0)
  }

  async next() {
    this.slider.lockSwipes(false);
    this.slider.slideNext();
    this.stepper = await this.slider.getActiveIndex();
    this.slider.lockSwipes(true);
  }

  async prev() {
    if (await this.slider.getActiveIndex() == 0) {
      this.close();
    }
    this.slider.lockSwipes(false);
    this.slider.slidePrev();
    this.stepper = await this.slider.getActiveIndex();
    this.slider.lockSwipes(true);
  }

  async onStartProcessPayment() {
    try {
      const { panier } = this.paymentForm.value
      let data = { ...this.paymentForm.value }

      delete data.panier;
      let order: Order = {
        totalAmount: this.totalAmount,
        articles: panier.map((p: any) => {
          return {
            id: p.articleId,
            quantity: p.quantity,
            unitPrice: p.unitPrice,
            storeId: p.storeId,
            designation: p.designation
          }
        }),
        deliverieInfo: JSON.stringify(data)
      }
      this.statusPayment = 1
      const newOrder = await this.paimentService.addOrder(order).toPromise();

      this.statusPayment = 2
      let orderId: number = newOrder.order.dataValues.id;
      var itemIds: number[] = []
      var memo = ''
      for (let i = 0; i < newOrder.order.articles.length; i++) {
        const item = newOrder.order.articles[i];
        itemIds.push(item.id);
        memo += ` ${item.designation},`
      }
      memo += `#${orderId}`

      this.loading = false;
      await this.paimentService.createPayment({
        amount: newOrder.order.dataValues.totalAmount,
        memo,
        metadata: { orderId, itemIds }
      })
    } catch (error: any) {
      this.loading = false;
      this.statusPayment = 0
      this.toastService.show('danger', error.error.message)
    }

  }
}
