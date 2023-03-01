import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { NewService } from 'src/app/services/new.service';
import { UploadService } from 'src/app/services/upload.service';
import { log } from 'console';
import { AlertController } from '@ionic/angular';
import { AddNewComponent } from 'src/app/shared/components/modals/add-new/add-new.component';
import { New } from 'src/app/models/new.model';

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

  }

  edit(_new: any) {
    this.ref = this.dialogService.open(AddNewComponent, {
      header: 'Modification de la nouvelle',
      data: {
        _new: {
          ..._new,
          editMode: true
        }
      },
      width: '50%',

      height: '100%',
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000,
      modal: true,
      // showHeader: false,
      draggable: true,
      transitionOptions: '400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
    });
    this.ref.onClose.subscribe((_new: New) => {
      let i = this._news.findIndex((c: any) => c.id == _new.id);

      if (i >= 0) {
        this._news[i] = { ...this._news[i], ..._new };
      }
    }
    );
  }

  ionViewWillEnter() {
    this.rows = 8;
    this.newService.getNews(0, this.rows).toPromise().then((res: any) => {
      this._news = res.rows;
      

      this.totalRecords = res.count;
    });
  }

  add() {
    this.ref = this.dialogService.open(AddNewComponent, {
      header: 'Publier une nouvelle',
      width: '90%',
      height: '100%',
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000,
      modal: true,
      // showHeader: false,
      draggable: true,
      transitionOptions: '400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
    });
    this.ref.onClose.subscribe((_new: New) => {
      if (_new) {
        

        this._news.unshift(_new);
      }
    });
  }


  paginate(e: any) {
    this.newService.getNews(e.page, e.rows).toPromise().then((res: any) => {
      this._news = res.rows;
      this.totalRecords = res.count;
    });
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
