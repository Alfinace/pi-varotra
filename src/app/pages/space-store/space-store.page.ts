import { AddArticleComponent } from '../../shared/components/modals/add-article/add-article.component';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ActionSheetController } from '@ionic/angular';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article.model';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-space-store',
  templateUrl: './space-store.page.html',
  styleUrls: ['./space-store.page.scss'],
})
export class SpaceStorePage implements OnInit {
  rows = 8;
  page = 0;
  products: Article[] = [];
  totalRecords: number;
  orders: any[] = [];
  currentIndex: number;

  constructor(
    private modalController: ModalController,
    private toastService: ToastService,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private articleService: ArticleService) { }

  ngOnInit() {
    this.articleService.getArticlesCurrentUser(0, 8).toPromise().then(res => {
      this.products = res.rows;
      this.totalRecords = res.count;
    })
    this.articleService.getCmd(0, 8).toPromise().then(res => {
      this.orders = res.rows;
    })
  }

  public loadMore(event: any) {
    this.page++;
    this.articleService.getArticlesCurrentUser(this.page, this.rows).toPromise().then(res => {
      this.products = [...this.products,...res.rows];
      this.totalRecords = res.count;
      if (event) {
        event.target.complete();
      }

    })
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
        // {
        //   text: 'Detail',
        //   icon: 'eye',
        //   cssClass: 'text-sm',
        //   handler: () => {
        //     this.(item);
        //   }
        // },
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
}
