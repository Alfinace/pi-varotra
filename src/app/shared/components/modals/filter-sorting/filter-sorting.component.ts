import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Filter } from 'src/app/models/filter.type';

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
  public ville = [
    'Antananarivo',
    'Fianarantsoa',
    'Toliara',
    'Toamasina',
    'Mahajanga',
    'Tous',
  ]
  public categories = [
    {
      id: 1,
      name: 'Categorie 1'
    },
    {
      id: 2,
      name: 'Categorie 2'
    },
    {
      id: 3,
      name: 'Categorie 3'
    },
    {
      id: 4,
      name: 'Categorie 4'
    },
    {
      id: 5,
      name: 'Categorie 5'
    },
    {
      id: 7,
      name: 'Categorie 7'
    },
    {
      id: 8,
      name: 'Categorie 8'
    },
    {
      id: 9,
      name: 'Categorie 9'
    },
    {
      id: 10,
      name: 'Categorie 10'
    },
    {
      id: 11,
      name: 'Categorie 11'
    }, {
      id: 12,
      name: 'Categorie 12'
    },
    {
      id: 13,
      name: 'Categorie 13'
    }
    ,
    {
      id: 10,
      name: 'Categorie 10'
    },
    {
      id: 11,
      name: 'Categorie 11'
    }, {
      id: 12,
      name: 'Categorie 12'
    },
    {
      id: 13,
      name: 'Categorie 13'
    },
    {
      id: 10,
      name: 'Categorie 10'
    },
    {
      id: 11,
      name: 'Categorie 11'
    }, {
      id: 12,
      name: 'Categorie 12'
    },
    {
      id: 13,
      name: 'Categorie 13'
    },
    {
      id: 10,
      name: 'Categorie 10'
    },
    {
      id: 11,
      name: 'Categorie 11'
    }, {
      id: 12,
      name: 'Categorie 12'
    },
    {
      id: 13,
      name: 'Categorie 13'
    },
    {
      id: 10,
      name: 'Categorie 10'
    },
    {
      id: 11,
      name: 'Categorie 11'
    }, {
      id: 12,
      name: 'Categorie 12'
    },
    {
      id: 13,
      name: 'Categorie 13'
    }
  ]
  public defaultFilter: Filter = {
    categories: [...this.categories.map(c => c.id)],
    order: 'ASC',
    orderBy: 'updatedAt',
    range: { lower: 0, upper: 110 },
    villes: ['Tous']
  }
  constructor(private modalController: ModalController) { }

  ngOnInit() {
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
      this.filter.categories.splice(index, 1);
    } else {
      this.filter.categories.push(id);
    }

  }

  public selectAllCategorie() {
    if (this.filter.categories.length === this.categories.length) {
      this.filter.categories = []
    } else {
      this.filter.categories = [... this.categories.map(c => c.id)]
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
      categories: [...this.categories.map(c => c.id)],
      order: 'ASC',
      orderBy: 'updatedAt',
      range: { lower: 0, upper: 110 },
      villes: ['Tous']
    }
  }

  public apply() {
    this.modalController.dismiss(this.filter)
  }

  public order(e: any) {
    this.filter.order = e.target.value
  }

  public orderBy(e: any) {
    this.filter.orderBy = e.target.value
  }
}
