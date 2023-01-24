import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  showFiller = false;
  showMenu: boolean;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {

  }


  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  navigateTo(path: string) {
    this.toggleMenu()
    this.router.navigate([path])
  }
}
