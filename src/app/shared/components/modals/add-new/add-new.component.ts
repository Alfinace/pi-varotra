import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewService } from 'src/app/services/new.service';
import { ToastService } from 'src/app/services/toast.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent implements OnInit {
  _new: any;
  totalRecords: number;
  rows: number = 8;
  loading: boolean;
  newForm: FormGroup;
  editMode = false;
  image: any;
  constructor(
    private newService: NewService,
    private toastService: ToastService,
    private fb: FormBuilder,
    private uploadService: UploadService,
    public config: DynamicDialogConfig, public ref: DynamicDialogRef,) { }

  ngOnInit() {
    this.newForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      image: [''],
      subtitle: ['', Validators.required],
      detail: ['', Validators.required],
    });
    this.editMode = this.config.data._new.editMode;
    this.newForm.patchValue({ ...this.config.data._new });
  }

  async onSubmit() {
    this.loading = true;
    if (await this.uploadImage(this.image)) {
      this.newService.addNew(this.newForm.value).toPromise().then((res: any) => {
        this.ref.close({ ...res });
        this.newForm.reset();
        this.loading = false;
        this.toastService.show('success', 'Ajout effectuée avec succès')
      }, (err: any) => {

        this.loading = false;
        this.toastService.show('danger', 'Erreur lors de l\'ajout')
      });
    }
  }


  async updateNew() {
    this.loading = true;
    if (await this.uploadImage(this.image)) {
      this.newService.updateNew(this.newForm.value.id, this.newForm.value).toPromise().then((res: any) => {
        this.editMode = false;
        this.loading = false;
        this.ref.close({ ...this.newForm.value });
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
    

    this.image = e.target.files[0];
  }

}
