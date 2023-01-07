import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public render2: Renderer2;
  public $darkTheme: Subject<boolean> = new Subject<boolean>();
  public isDarkTheme = this.$darkTheme.asObservable();

  constructor(
    private renderFacory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.render2 = renderFacory.createRenderer(null, null);
  }

  setDarkTheme(isDarkTheme: boolean) {
    if (isDarkTheme) {
      this.render2.removeClass(this.document.body, 'light-theme');
      this.render2.addClass(this.document.body, 'dark-theme');
    } else {
      this.render2.removeClass(this.document.body, 'dark-theme');
      this.render2.addClass(this.document.body, 'light-theme');
    }
  }
}
