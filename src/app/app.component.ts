import { Component } from '@angular/core';
import { AnimationController, Platform } from '@ionic/angular';
import { defineCustomElements } from '@ionic/pwa-elements/loader';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    defineCustomElements(window);
  }
}
