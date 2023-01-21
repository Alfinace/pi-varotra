import { ToastService } from './../../services/toast.service';
import { CategorieService } from './../../services/categorie.service';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.page.html',
  styleUrls: ['./list-categorie.page.scss'],
  providers: [DialogService]
})
export class ListCategoriePage implements OnInit {
  categories: any;
  display: boolean = false;
  totalRecords: number;
  rows: number = 8;
  loading: boolean;
  categorieForm: FormGroup;
  editMode = false;

  constructor(private categorieService: CategorieService,
    private fb: FormBuilder,
    private toastService: ToastService,
    public dialogService: DialogService,) { }
  ref: DynamicDialogRef;
  ngOnInit() {
    this.categorieForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
    });
  }

  ionViewWillEnter() {
    this.rows = 8;
    this.categorieService.getCategories(0, this.rows).toPromise().then((res: any) => {
      this.categories = res.rows;
      this.totalRecords = res.count;
    });
  }


  paginate(e: any) {
    this.categorieService.getCategories(e.page, e.rows).toPromise().then((res: any) => {
      this.categories = res.rows;
      this.totalRecords = res.count;
    });
  }

  onSubmit() {
    this.loading = true;
    this.categorieService.createCategorie(this.categorieForm.value).toPromise().then((res: any) => {
      this.categorieForm.reset();
      this.categories.unshift({ ...res, articles: [] });
      this.loading = false;
      this.display = false;
      this.toastService.show('success', 'Ajout effectuée avec succès')
    }, (err: any) => {

      this.loading = false;
      this.toastService.show('danger', 'Erreur lors de l\'ajout')
    });
  }

  edit(categorie: any) {
    this.categorieForm.patchValue(categorie);
    this.editMode = true;
    this.display = true;
  }

  updateCategorie() {
    this.loading = true;
    this.categorieService.updateCategorie(this.categorieForm.value.id, this.categorieForm.value).toPromise().then((res: any) => {
      this.editMode = false;
      this.loading = false;
      let i = this.categories.findIndex((c: any) => c.id == this.categorieForm.value.id);
      if (i >= 0) {
        this.categories[i] = { ...this.categories[i], ...this.categorieForm.value };
      }
      this.toastService.show('success', 'Modification effectuée avec succès')
      this.display = false;
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
