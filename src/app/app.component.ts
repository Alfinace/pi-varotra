import { LocalstorageService } from 'src/app/services/localstorage.service';
import { SessionService } from 'src/app/services/session.service';
import { Component, OnInit } from '@angular/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { ThemeService } from './services/theme.service';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private sessionService: SessionService,
    private localstorgaService: LocalstorageService,
    private primengConfig: PrimeNGConfig,
    private themeService: ThemeService) {
    defineCustomElements(window);
    this.sessionService.getSessionStatus()
    let theme = this.localstorgaService.getItem('theme');
    if (theme) {
      this.themeService.setDarkTheme(theme === 'dark')
    }
  }
  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
