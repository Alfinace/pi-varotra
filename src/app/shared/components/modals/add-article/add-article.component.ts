import { ToastService } from 'src/app/services/toast.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Category } from 'src/app/models/categorie-model';
import { UploadService } from 'src/app/services/upload.service';
import { ArticleService } from 'src/app/services/article.service';
import { resolve } from 'dns';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {
  @Input() article: Article;
  public addProduitForm: FormGroup;
  public categories: Category[];
  public images: any[] = [];
  public imagesPreview: string[];
  constructor(
    private modelController: ModalController,
    private categorieService: CategorieService,
    private articleService: ArticleService,
    private uploadService: UploadService,
    private toastService: ToastService,
    private actionSheetController: ActionSheetController,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.addProduitForm = this.fb.group({
      designation: ['', [Validators.required]],
      categoryId: [, [Validators.required]],
      stock: ['', [Validators.required, Validators.min(1)]],
      unitPrice: ['', [Validators.required]],
      images: ['', [Validators.required]],
      detail: ['', [Validators.required]],
    })
    this.categorieService.getCategories().toPromise().then((categories: any) => {
      this.categories = categories.rows as Category[];
      if (this.article) {
        this.addProduitForm.patchValue({
          designation: this.article.designation,
          categoryId: this.article.categoryId,
          stock: this.article.stock,
          unitPrice: this.article.unitPrice,
          detail: this.article.detail,
        })
      }
      for (let i = 0; i < this.article.images.length; i++) {
        this.images.push({
          preview: this.article.images[i].image,
        })

      }

    })
  }

  public async onSubmit() {
    if (await this.uploadImage() && this.addProduitForm.valid) {
      this.articleService.createArticle(this.addProduitForm.value).toPromise().then(res => {
        this.toastService.show('dark', 'Nouveau article a été ajouté')
        this.close()
      }).catch(err => {
        console.log(err);

      })
    }
  }

  async uploadImage() {
    let formData = new FormData();
    for (let i = 0; i < this.images.length; i++) {
      const element = this.images[i];
      formData.append('files', element.source)
    }
    return new Promise((resolve, reject) => {
      this.uploadService.upload(formData).then((res: any) => {
        this.addProduitForm.patchValue({
          images: res.images
        })
        resolve(true)
      })
    })
  }

  public close() {
    this.modelController.dismiss()
  }

  public getImage(event: any) {
    this.images.push(event)
  }

  public active1() {}

  async active(item: any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: 'Supprimer',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });

    await actionSheet.present();
  }
}
