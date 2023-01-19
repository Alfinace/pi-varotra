import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NewService } from 'src/app/services/new.service';
import { UploadService } from 'src/app/services/upload.service';
import { log } from 'console';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list-new',
  templateUrl: './list-new.page.html',
  styleUrls: ['./list-new.page.scss'],
  providers: [DialogService]
})
export class ListNewPage implements OnInit {
  _news: any[] = [];
  totalRecords: number;
  rows: number = 8;
  loading: boolean;
  newForm: FormGroup;
  editMode = false;
  image: any;

  constructor(private newService: NewService,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private alertController: AlertController,
    private toastService: ToastService,
    public dialogService: DialogService,) { }
  ref: DynamicDialogRef;
  ngOnInit() {
    this.newForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      image: [''],
      subtitle: ['', Validators.required],
      detail: ['', Validators.required],
    });
  }

  ionViewWillEnter() {
    this.rows = 8;
    this.newService.getNews(0, this.rows).toPromise().then((res: any) => {
      this._news = res.rows;
      console.log(this._news);

      this.totalRecords = res.count;
    });
  }


  paginate(e: any) {
    this.newService.getNews(e.page, e.rows).toPromise().then((res: any) => {
      this._news = res.rows;
      this.totalRecords = res.count;
    });
  }

  async onSubmit() {
    this.loading = true;
    if (await this.uploadImage(this.image)) {
      this.newService.addNew(this.newForm.value).toPromise().then((res: any) => {
        this.newForm.reset();
        this._news.unshift({ ...res, articles: [] });
        this.loading = false;
        this.toastService.show('success', 'Ajout effectuée avec succès')
      }, (err: any) => {

        this.loading = false;
        this.toastService.show('danger', 'Erreur lors de l\'ajout')
      });
    }
  }

  edit(_new: any) {
    console.log(_new);

    this.newForm.patchValue(_new);
    this.editMode = true;
  }

  async updateNew() {
    this.loading = true;
    if (await this.uploadImage(this.image)) {
      this.newService.updateNew(this.newForm.value.id, this.newForm.value).toPromise().then((res: any) => {
        this.editMode = false;
        this.loading = false;
        let i = this._news.findIndex((c: any) => c.id == this.newForm.value.id);
        console.log(i);

        if (i >= 0) {
          this._news[i] = { ...this._news[i], ...this.newForm.value };
        }
        this.toastService.show('success', 'Modification effectuée avec succès')
        this.newForm.reset();
      }, (err: any) => {
        this.loading = false;
      });
    }
  }

  async uploadImage(file: any) {
    if (!file) {
      return true;
    }
    let formData = new FormData();
    formData.append('files', file)
    return new Promise((resolve, reject) => {
      this.uploadService.upload(formData).then((res: any) => {
        this.newForm.patchValue({
          image: res.images[0]
        })
        resolve(true)
      })
    })
  }


  reset() {
    this.newForm.reset();
    this.editMode = false;
  }

  selectImage(e: any) {
    console.log(e.target.files[0]);

    this.image = e.target.files[0];
  }

  deleteNew(_new: any) {
    this.newService.deleteNew(_new.id).toPromise().then((res: any) => {
      let i = this._news.findIndex((c: any) => c.id == _new.id);
      if (i >= 0) {
        this._news.splice(i, 1);
      }
      this.toastService.show('success', 'Suppression effectuée avec succès')
    }, (err: any) => {
      this.toastService.show('danger', 'Erreur lors de la suppression')
    });
  }

  async confirmDelete(_new: any) {
    const alert = await this.alertController.create({
      header: 'Confirmation!',
      message: 'Voulez-vous vraiment supprimer cette nouvelle?',
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
            this.deleteNew(_new);
          }
        }
      ]
    });

    await alert.present();
  }
}
