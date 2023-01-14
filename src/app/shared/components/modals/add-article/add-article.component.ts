import { ToastService } from 'src/app/services/toast.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/models/categorie-model';
import { UploadService } from 'src/app/services/upload.service';
import { ArticleService } from 'src/app/services/article.service';
import { resolve } from 'dns';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {
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
      console.log(this.categories);

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

}
