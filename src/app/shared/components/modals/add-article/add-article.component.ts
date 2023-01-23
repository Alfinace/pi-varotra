import { ToastService } from 'src/app/services/toast.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('imageComponentUpdate') imageComponentUpdate: any;
  public addProduitForm: FormGroup;
  public categories: Category[];
  public submitted: boolean = false;
  public images: any[] = [];
  public imagesPreview: string[];
  currentImageIndex: number;
  imageIdDeleted: number[] = [];;
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
      images: [''],
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
          id: this.article.images[i].id,
        })

      }

    })
  }

  public async onSubmit() {
    this.submitted = true;
    if (this.article) { // update
      this.addProduitForm.controls['images'].setValidators(null);
      if (this.addProduitForm.valid && await this.uploadImage()) {
        this.articleService.updateArticle(this.article.id, { ...this.addProduitForm.value, imageIdDeleted: this.imageIdDeleted }).toPromise().then(async res => {
          let newData = await this.articleService.getArticle(this.article.id).toPromise();
          this.modelController.dismiss({ ...newData }, 'update')
          this.toastService.show('dark', 'Produit a été modifié')
          this.submitted = false;
        }).catch(err => {
          console.log(err);
          this.submitted = false;
        })
      }

    } else {
      if (await this.uploadImage() && this.addProduitForm.valid) {
        this.articleService.createArticle(this.addProduitForm.value).toPromise().then(async res => {
          let newData = await this.articleService.getArticle(res.id).toPromise();
          this.modelController.dismiss({ ...newData })
          this.toastService.show('dark', 'Nouveau article a été ajouté')
          this.submitted = false;
        }).catch(err => {
          console.log(err);
          this.submitted = false;
        })
      }
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

  public getImageUpdate(event: any) {
    this.imageIdDeleted.push(this.images[this.currentImageIndex].id);
    this.images[this.currentImageIndex] = event;
  }

  public active1() { }

  async active(item: any, index: number) {
    this.currentImageIndex = index;
    const actionSheet = await this.actionSheetController.create({
      backdropDismiss: false,
      header: 'Actions',
      buttons: [{
        text: 'Supprimer',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.images = this.images.filter((i) => i !== item);
          // let imagesSaved = this.addProduitForm.value.images;
          // imagesSaved = imagesSaved.splice(index, 1);
          // this.addProduitForm.patchValue({
          //   images: imagesSaved
          // })
          this.imageIdDeleted.push(item.id);
        }
      }, {
        text: 'Modifier',
        icon: 'create',
        handler: () => {
          this.imageComponentUpdate.selectImageSource()
        }
      }, {
        text: 'Annuler',
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
