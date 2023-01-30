import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Filter } from 'src/app/models/filter.type';
import { Category } from 'src/app/models/categorie-model';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-filter-sorting',
  templateUrl: './filter-sorting.component.html',
  styleUrls: ['./filter-sorting.component.scss'],
})
export class FilterSortingComponent implements OnInit {
  public price = { lower: 0, upper: 110 };
  public stateSorting: boolean = false;
  public stateFilter: boolean = true;
  @Input() filter: Filter;
  public ville = []
  public categories: Category[] = []
  // public defaultFilter: Filter = {
  //   categories: [...this.categories.map(c => c.id as number)],
  //   order: 'ASC',
  //   orderBy: 'updatedAt',
  //   range: { lower: 0, upper: 110 },
  //   villes: [...this.ville]
  // }

  constructor(private modalController: ModalController,
    private categorieService: CategorieService) { }
  ngOnInit() {
    console.log(this.filter);

    this.categorieService.getAllCity().toPromise().then((res: any) => {
      this.ville = res.map((c: { name: any; }) => c.name)
      if (this.filter.villes.length === 0) {
        this.filter.villes = [...this.ville]
      }
    })
    this.categorieService.getCategories().toPromise().then((res: any) => {
      this.categories = res.rows
      if (this.filter.categories.length === 0) {
        this.filter.categories = [...this.categories.map(c => c.id as number)]
      }
    })
    if (!this.filter) {
      this.onReset()
    }
  }

  public close() {
    this.modalController.dismiss()
  }
  public rangeChange(e: any) {
    this.filter.range = e.target.value
  }

  public onSelectCategorie(id: number) {

    let index = this.filter.categories.findIndex(c => c === id);
    if (index > -1) {
      this.filter?.categories.splice(index, 1);
    } else {
      this.filter?.categories.push(id);
    }

  }

  public selectAllCategorie() {
    if (this.filter.categories.length === this.categories.length) {
      this.filter.categories = []
    } else {
      this.filter.categories = [... this.categories.map(c => c.id as number)]
    }

  }

  public shouldChecked(id: number) {
    return this.filter.categories.includes(id)
  }

  public changeTab(id: number) {
    this.stateFilter = false;
    this.stateSorting = false;
    if (id == 1) {
      this.stateFilter = true
    } else {
      this.stateSorting = true
    }
  }

  public onReset() {
    this.filter = {
      categories: [...this.categories.map(c => c.id as number)],
      order: 'ASC',
      orderBy: 'updatedAt',
      range: { lower: 0, upper: 110 },
      villes: ['Tous']
    }
  }

  public apply() {
    if (this.filter.villes.length === 0) {
      this.filter.villes = [...this.ville]
    }
    console.log(this.filter);

    this.modalController.dismiss(this.filter)
  }

  public order(e: any) {
    this.filter.order = e.target.value
  }

  public orderBy(e: any) {
    this.filter.orderBy = e.target.value
  }
}
