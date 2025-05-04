import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  public loadingStores: boolean = true;
  public loadingUsers: boolean = true;
  public stores: any[] = [];
  public users: any[] = [];

  constructor(
    private router: Router,
    private storeService: StoreService,
    private userService: UserService
  ) { }


  ngOnInit() {


  }

  ionViewWillEnter() {
    this.loadingStores = true;
    this.storeService.getLocalizationStores().pipe(take(1)).subscribe((stores) => {
      this.stores = stores.rows;
      this.loadingStores = false;
    });
    this.loadingUsers = true;
    this.userService.getLocalization().subscribe((users) => {
      this.users = users.rows;
      this.loadingUsers = false;
    });
  }

  public close(): void {
    this.router.navigate(['/']);
  }
}
