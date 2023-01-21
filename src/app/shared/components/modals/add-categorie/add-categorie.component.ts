import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategorieService } from 'src/app/services/categorie.service';
import { NewService } from 'src/app/services/new.service';
import { ToastService } from 'src/app/services/toast.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss'],
})
export class AddCategorieComponent implements OnInit {

  categorieForm: FormGroup;
  loading: boolean;
  editMode: boolean;
  constructor(
    private categorieService: CategorieService,
    private toastService: ToastService,
    private fb: FormBuilder,
    private uploadService: UploadService,
    public config: DynamicDialogConfig, public ref: DynamicDialogRef,) { }
  ngOnInit() {
    this.categorieForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
    });
    this.editMode = this.config.data.categorie.editMode;
    this.categorieForm.patchValue({ ...this.config.data.categorie });
  }

  onSubmit() {
    this.loading = true;
    this.categorieService.createCategorie(this.categorieForm.value).toPromise().then((res: any) => {
      this.categorieForm.reset();
      // this.categories.unshift({ ...res, articles: [] });
      this.loading = false;
      this.toastService.show('success', 'Ajout effectuée avec succès')
    }, (err: any) => {

      this.loading = false;
      this.toastService.show('danger', 'Erreur lors de l\'ajout')
    });
  }


  updateCategorie() {
    this.loading = true;
    this.categorieService.updateCategorie(this.categorieForm.value.id, this.categorieForm.value).toPromise().then((res: any) => {
      this.editMode = false;
      this.loading = false;
      // let i = this.categories.findIndex((c: any) => c.id == this.categorieForm.value.id);
      // console.log(i);

      // if (i >= 0) {
      //   this.categories[i] = { ...this.categories[i], ...this.categorieForm.value };
      // }
      this.toastService.show('success', 'Modification effectuée avec succès')
      this.categorieForm.reset();
    }, (err: any) => {
      this.loading = false;
    });
  }

  reset() {
    this.categorieForm.reset();
    this.editMode = false;
  }
}
