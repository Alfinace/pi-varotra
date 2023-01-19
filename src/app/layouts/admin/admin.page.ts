import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  showFiller = false;
  showMenu: boolean;
  constructor() { }

  ngOnInit() {
  }


  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

}
