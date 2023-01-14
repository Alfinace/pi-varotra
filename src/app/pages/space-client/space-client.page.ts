import { SessionService } from './../../services/session.service';
import { ParamsComponent } from './../../shared/components/modals/params/params.component';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { CreateStoreComponent } from 'src/app/shared/components/modals/create-store/create-store.component';
Chart.register(...registerables);

@Component({
  selector: 'app-space-client',
  templateUrl: './space-client.page.html',
  styleUrls: ['./space-client.page.scss'],
})
export class SpaceClientPage implements OnInit, AfterViewInit {
  @ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: any;
  currentUser: any;
  constructor(
    private modalController: ModalController,
    private sessionService: SessionService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.barChartMethod();
  }

  ionViewWillEnter() {
    this.sessionService.getInfoUser().subscribe((user: any) => {
      if (user) {
        this.currentUser = user
      }
    })
  }

  barChartMethod() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Commandes', 'Faloris', 'Other'],
        datasets: [{
          label: '# of Votes',
          data: [200, 50, 30, 15, 20, 34],
          backgroundColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(255, 206, 86, 0.9)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
  }


  async onOpenParams() {
    const modal = await this.modalController.create({
      component: ParamsComponent,
      componentProps: { currentUser: this.currentUser }
    });

    await modal.present();

  }

  async createStore() {
    const modal = await this.modalController.create({
      component: CreateStoreComponent,
      componentProps: { value: 123 }
    });

    await modal.present();
    const data = await modal.onDidDismiss();
    if (data.data) {
      this.ionViewWillEnter()
    }
  }
}
