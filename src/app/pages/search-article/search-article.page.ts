import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterSortingComponent } from 'src/app/shared/components/modals/filter-sorting/filter-sorting.component';

@Component({
  selector: 'app-search-article',
  templateUrl: './search-article.page.html',
  styleUrls: ['./search-article.page.scss'],
})
export class SearchArticlePage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async openFilter() {
    const modal = await this.modalController.create({
      component: FilterSortingComponent,
      componentProps: { value: 123 },
      initialBreakpoint: 0.75,
      breakpoints: [0, 0.25, 0.5, 0.75],
      cssClass: 'filter-modal',
      backdropDismiss: false,
      animated: true
    });

    await modal.present();

    const data = await modal.onDidDismiss();
    console.log(data)

  }
}
