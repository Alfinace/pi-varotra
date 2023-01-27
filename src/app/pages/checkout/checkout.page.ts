import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides, ModalController } from '@ionic/angular';
import { Cart } from 'src/app/models/cart.model';
import { ArticleService } from 'src/app/services/article.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit, AfterViewInit, OnDestroy {
  public paymentForm: FormGroup
  public paniers: any[] = []
  public id: number;
  public stepper: number = 0;
  public loading: boolean = true;
  items: any[];
  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService) { }
  @ViewChild('slider') slider: IonSlides;
  public slideOpts = {
    initialSlide: 0,
    speed: 400
  }
  async ngOnInit() {

    this.paymentForm = this.fb.group({
      panier: ['', Validators.required],
      address: [''],
      fullname: [''],
      city: [''],
      contact: [''],
    })
    this.route.params.subscribe(params => {
      this.paniers = []
      if (parseInt(params['id']) > 0) {
        this.id = parseInt(params['id']) - 1;
        var carts = this.cartService.getAllCartData()
        this.mappingData(carts)
      } else {
        this.router.navigate(['client/space-client'])
      }
      this.items = [
        { label: 'Mon commande' },
        { label: 'Information de livraison' },
        { label: 'Paiment' }
      ];
      console.log(this.paymentForm.value);

    });
  }

  ngOnDestroy(): void {
    // this.route.params.e
  }

  ngAfterViewInit(): void {
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
    var panierObject = {}
    var promiseArray: any[] = []
    if (carts.length == 0) {
      this.router.navigate(['client/space-client']);
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
    let data = await Promise.all(promiseArray) as Cart[]
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
    console.log(this.paniers);
    this.paymentForm.patchValue({
      panier: [...this.paniers]
    })
    console.log(this.paymentForm.value);

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

}
