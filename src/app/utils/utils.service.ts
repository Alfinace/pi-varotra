import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private location: Location,
  ) { }


  goBack() {
    this.location.back();
  }
}
