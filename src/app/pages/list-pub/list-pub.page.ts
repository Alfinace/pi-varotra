import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PubService } from 'src/app/services/pub.service';
import { ToastService } from 'src/app/services/toast.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-list-pub',
  templateUrl: './list-pub.page.html',
  styleUrls: ['./list-pub.page.scss'],
  providers: [DialogService]
})
export class ListPubPage implements OnInit {

  pubs: any;
  display: boolean = false;
  totalRecords: number;
  rows: number = 8;
  loading: boolean;
  pubForm: FormGroup;
  editMode = false;
  preview: any;
  image: any;

  constructor(private pubService: PubService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private uploadService: UploadService,
    public dialogService: DialogService,) { }
  ref: DynamicDialogRef;
  ngOnInit() {
    this.pubForm = this.fb.group({
      id: [''],
      image: ['', Validators.required],
      lien: [''],
    });
  }

  ionViewWillEnter() {
    this.rows = 8;
    this.pubService.getPubs(0, this.rows).toPromise().then((res: any) => {
      this.pubs = res.rows;
      this.totalRecords = res.count;
    });
  }


  paginate(e: any) {
    this.pubService.getPubs(e.page, e.rows).toPromise().then((res: any) => {
      this.pubs = res.rows;
      this.totalRecords = res.count;
    });
  }

  onSubmit() {
    this.loading = true;
    this.pubService.createPub(this.pubForm.value).toPromise().then((res: any) => {
      this.pubForm.reset();
      this.pubs.unshift({ ...res, articles: [] });
      this.loading = false;
      this.display = false;
      this.toastService.show('success', 'Ajout effectuée avec succès')
    }, (err: any) => {

      this.loading = false;
      this.toastService.show('danger', 'Erreur lors de l\'ajout')
    });
  }

  edit(pub: any) {
    this.pubForm.patchValue(pub);
    this.editMode = true;
    this.display = true;
  }

  async updatepub() {
    this.loading = true;
    this.pubForm.patchValue({ image: (await this.uplodImage(this.image))[0] });
    this.pubService.updatePub(this.pubForm.value.id, this.pubForm.value).toPromise().then((res: any) => {
      this.editMode = false;
      this.loading = false;
      let i = this.pubs.findIndex((c: any) => c.id == this.pubForm.value.id);
      if (i >= 0) {
        this.pubs[i] = { ...this.pubs[i], ...this.pubForm.value };
      }
      this.toastService.show('success', 'Modification effectuée avec succès')
      this.display = false;
      this.pubForm.reset();
    }, (err: any) => {
      this.loading = false;
    });
  }

  reset() {
    this.pubForm.reset();
    this.editMode = false;
  }

  add() {
    this.display = true;
  }

  public getImage(event: any) {
    this.image = event;
    this.pubForm.patchValue({ image: event.preview });
  }

  uplodImage(event: any) {
    let formData = new FormData();
    formData.append('files', event.source);
    return this.uploadService.upload(formData)
  }
}
