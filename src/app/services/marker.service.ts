import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  capitals: string = '/assets/data/capitals.json';
  constructor(
    private http: HttpClient,
    public _router: Router) { }
  private coordonne$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  coordonne = this.coordonne$.asObservable()
  private idForMap$: BehaviorSubject<string> = new BehaviorSubject<any>(null);
  idForMap = this.idForMap$.asObservable()
  makePubMarkers(map: any, res: any): void {
    for (const pub of res) {
      let lon = pub.publication.positionPub[1];
      let lat = pub.publication.positionPub[0];
      let marker = L.marker([lat, lon]).on('click', () => {
        this.idForMap$.next(pub.publication._id)
      });
      if (pub.publication._materiel) {
        marker.addTo(map).bindPopup(pub.publication._materiel.designationMat).openPopup();
      } else {
        marker.addTo(map).bindPopup(pub.publication.titre).openPopup();
      }
    }
  }
  changeMarkerCenter(coordonne: any, pub: any) {
    this.coordonne$.next({ coordonne, pub })
  }

  makeCapitalCircleMarkers(map: any): void {
    this.http.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const circle = L.circleMarker([lat, lon]);

        circle.addTo(map);
      }
    });
  }
}

