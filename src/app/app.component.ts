import { LocalstorageService } from 'src/app/services/localstorage.service';
import { SessionService } from 'src/app/services/session.service';
import { Component } from '@angular/core';
import { AnimationController, Platform } from '@ionic/angular';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { ThemeService } from './services/theme.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private sessionService: SessionService,
    private localstorgaService: LocalstorageService,
    private themeService: ThemeService) {
    defineCustomElements(window);
    this.sessionService.getSessionStatus()
    let theme = this.localstorgaService.getItem('theme');
    if (theme) {
      this.themeService.setDarkTheme(theme === 'dark')
    }
  }
}
