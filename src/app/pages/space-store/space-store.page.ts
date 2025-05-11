import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { take, takeUntil } from 'rxjs/operators';

import { AddArticleComponent } from '../../shared/components/modals/add-article/add-article.component';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { PaymentService } from 'src/app/services/payment.service';
import { SessionService } from 'src/app/services/session.service';
import { Subject } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-space-store',
  templateUrl: './space-store.page.html',
  styleUrls: ['./space-store.page.scss'],
})
export class SpaceStorePage implements OnInit, OnDestroy {
  rows = 8;
  page = 0;
  products: Article[] = [];
  showMap = false;
  totalRecords: number;
  orders: any[] = [];
  currentIndex: number;
  private destroy$: any = new Subject<void>();
  currentUser: any = null;

  constructor(
    private modalController: ModalController,
    private toastService: ToastService,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private articleService: ArticleService,
    private payementService: PaymentService,
    private sessionService: SessionService,
  ) { }

  ionViewWillEnter() {
    this.currentUser = null;
    this.sessionService.getInfoUser().pipe(takeUntil(this.destroy$)).subscribe(user => {
      this.currentUser = user;
    })
  }

  ionViewDidLeave() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.articleService.getArticlesCurrentUser().pipe(take(1)).subscribe(res => {
      this.products = res.rows;
      this.totalRecords = res.count;
    })
    this.articleService.getCmd(0, 8).pipe(take(1)).subscribe(res => {
      this.orders = res.rows;
    })
  }

  public loadMore(event: any) {
    this.page++;
    this.articleService.getArticlesCurrentUser(this.page, this.rows).pipe(take(1)).subscribe(res => {
      this.products = [...this.products, ...res.rows];
      this.totalRecords = res.count;
      if (event) {
        event.target.complete();
      }

    })
  }

  get isStoreActive() {
    if (this.currentUser && this.currentUser.store) {
      return this.currentUser.store.state === 'active';
    }
    return false;
  }

  toggleMapView() {
    this.showMap = !this.showMap;
  }

  public async addProduit() {
    const modal = await this.modalController.create({
      component: AddArticleComponent,
    });

    await modal.present();

    const data = await modal.onDidDismiss();
    if (!data.data) return;
    this.products.unshift(data.data as Article);
  }


  public async updateProduit(article: Article) {
    const modal = await this.modalController.create({
      component: AddArticleComponent,
      componentProps: { article }
    });

    await modal.present();

    let data = (await modal.onDidDismiss());
    let ar = data.data as Article;
    if (!ar) return;
    if (data.role === 'update') {
      this.products = this.products.map((produit: Article) => {
        if (produit.id === ar.id) {
          return ar;
        }
        return produit;
      })
    } else {
      this.products.push(ar);
    }
  }

  async deleteProduit(produit: Article) {
    const alert = await this.alertController.create({
      header: 'Confirmation!',
      message: 'Voulez-vous vous suppimer le produit ' + produit.designation + '?',
      buttons: [
        {
          text: 'NON',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        }, {
          text: 'OUI',
          handler: () => {
            this.articleService.deleteArticle(produit.id).toPromise().then(res => {
              this.products = this.products.filter(p => p.id !== produit.id)
              this.toastService.show('dark', 'La suppression du produit ' + produit.designation + ' a été effectué')
            })
          }
        }
      ]
    });

    await alert.present();
  }

  async displayActions(item: any, index: number) {
    this.currentIndex = index;
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Modifier',
          icon: 'pencil',
          cssClass: 'text-sm',
          handler: () => {
            this.updateProduit(item);
          }
        },
        {
          text: 'Supprimer',
          role: 'destructive',
          icon: 'trash',
          cssClass: 'text-sm',
          handler: () => {
            this.deleteProduit(item);
          }
        }]
    });

    await actionSheet.present();
  }

  async pay(event: any) {
    event.preventDefault();
    const alert = await this.alertController.create({
      header: 'Confirmation!',
      message: 'Voulez-vous vraiment payer le frais?',
      buttons: [
        {
          text: 'OUI',
          handler: () => {
            this.payementService.createPaymentStore(
              {
                amount: 5,
                memo: 'STORE_FEE',
                metadata: { storeId: this.currentUser.store.id },
              }
            )
          }
        },
        {
          text: 'NON',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            alert.dismiss();
          }
        }]
    })
    await alert.present();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
