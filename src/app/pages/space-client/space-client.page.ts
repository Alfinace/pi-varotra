import { SessionService } from './../../services/session.service';
import { ParamsComponent } from './../../shared/components/modals/params/params.component';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { CreateStoreComponent } from 'src/app/shared/components/modals/create-store/create-store.component';
Chart.register(...registerables);


interface Order {
  order: string
  date: string
  status: string
  amount: string
}

interface Product {
  image: string
  name: string
  status: string
  inventory: string
  price: string
}

@Component({
  selector: 'app-space-client',
  templateUrl: './space-client.page.html',
  styleUrls: ['./space-client.page.scss'],
})
export class SpaceClientPage implements OnInit, AfterViewInit {
  isOpen = false
  selectedTab = "orders"

  orders: Order[] = [
    { order: "#4532", date: "Apr 2, 2023", status: "Completed", amount: "$250.00" },
    { order: "#4531", date: "Apr 1, 2023", status: "Processing", amount: "$125.00" },
    { order: "#4530", date: "Mar 30, 2023", status: "Completed", amount: "$450.00" },
    { order: "#4529", date: "Mar 28, 2023", status: "Pending", amount: "$175.00" },
    { order: "#4528", date: "Mar 25, 2023", status: "Completed", amount: "$375.00" },
  ]

  products: Product[] = [
    {
      image: "assets/placeholder.svg",
      name: "Wireless Earbuds",
      status: "In Stock",
      inventory: "245 units",
      price: "$89.99",
    },
    {
      image: "assets/placeholder.svg",
      name: "Smart Watch",
      status: "In Stock",
      inventory: "120 units",
      price: "$199.99",
    },
    {
      image: "assets/placeholder.svg",
      name: "Bluetooth Speaker",
      status: "Low Stock",
      inventory: "15 units",
      price: "$129.99",
    },
    {
      image: "assets/placeholder.svg",
      name: "Laptop Stand",
      status: "In Stock",
      inventory: "78 units",
      price: "$49.99",
    },
    {
      image: "assets/placeholder.svg",
      name: "Wireless Charger",
      status: "Out of Stock",
      inventory: "0 units",
      price: "$39.99",
    },
  ]

  @ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: any;
  currentUser: any;
  loading: boolean = true;
  constructor(
    private modalController: ModalController,
    private sessionService: SessionService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    // this.barChartMethod();
  }

  ionViewWillEnter() {
    this.loading = true
    this.sessionService.getInfoUser().subscribe((user: any) => {
      if (user) {
        this.currentUser = user;
        this.loading = false
      }
    }, (error) => {
      console.log(error);
      this.loading = false
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

  toggleSidebar(): void {
    this.isOpen = !this.isOpen
  }

  closeSidebar(): void {
    this.isOpen = false
  }

  selectTab(tab: string): void {
    this.selectedTab = tab
  }
}
