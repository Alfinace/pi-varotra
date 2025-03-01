import { ThemeService } from './../../services/theme.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { CartComponent } from 'src/app/shared/components/modals/cart/cart.component';
import { SessionService } from 'src/app/services/session.service';
import { IMenuPage } from 'src/app/models/app';


@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit, OnDestroy {
  public carts: Cart[] = [];
  public theme: string = this.localstorageService.getItem('theme');
  currentUser: any
  public userPages: IMenuPage[] = [
    {
      title:'Profil',
      url: '',
      icon: 'person-outline'
    },
    {
      title: 'Mes commandes',
      url: '',
      icon: 'bag-handle-outline'
    },
    {
      title:'Paramètres',
      url: '',
      icon: 'settings-outline'
    },
  ]
  public storePages: IMenuPage[] = [
    {
      title:'Tableau de bord',
      url: '',
      icon: 'grid-outline'
    },
    {
      title: 'Commandes',
      url: '',
      icon: 'bag-handle-outline'
    },
    {
      title:'Produits',
      url: '',
      icon: 'cube-outline'
    },
    {
      title:'Transactions',
      url: '',
      icon: 'cash-outline'
    },
    {
      title:'Informations',
      url: '',
      icon: 'information-circle-outline'
    },
  ]
  public isLogged: boolean = false;
  private unsubscribe$: Subject<any> = new Subject<any>()
  constructor(
    private router: Router,
    private cartService: CartService,
    private themeService: ThemeService,
    private localstorageService: LocalstorageService,
    private sessionService: SessionService,
    private modalController: ModalController) {
    this.sessionService.userInfo.subscribe((user: any) => {
      if (user) {
        this.isLogged = true;
        this.currentUser = user
      } else {
        this.isLogged = false;
      }
    })
    this.sessionService.getInfoUser().subscribe((user: any) => {
      if (user) {
        this.isLogged = true;
        this.currentUser = user
      } else {
        this.isLogged = false;
      }
    })
    this.cartService.cartStateObservable.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((carts: Cart[]) => {
      this.carts = carts
    })
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    this.cartService.getAllCart()
  }

  public gotoLogin() {
    this.router.navigate(['login'])
  }

  async onCart() {
    let modal = await this.modalController.create({
      component: CartComponent,
      animated: true,
    })

    await modal.present();

  }

  swithTheme() {
    let theme = this.localstorageService.getItem('theme')
    console.log(theme);

    if (theme === 'dark') {
      this.themeService.setDarkTheme(false)
      this.localstorageService.setItem('theme', 'light');
      this.theme = 'light';
    } else {
      this.themeService.setDarkTheme(true)
      this.localstorageService.setItem('theme', 'dark')
      this.theme = 'dark  ';
    }
  }
}
