import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public gotoLogin() {
    this.router.navigate(['/login']);
  }
}
