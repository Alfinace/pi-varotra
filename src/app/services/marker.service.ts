import { StoreService } from 'src/app/services/store.service';
import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import { BehaviorSubject, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  capitals: string = '/assets/data/capitals.json';
  constructor(
    private http: HttpClient,
    public _router: Router,
    public storeService: StoreService
    ) { }
  private coordonne$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  coordonne = this.coordonne$.asObservable()
  private idForMap$: BehaviorSubject<string> = new BehaviorSubject<any>(null);
  idForMap = this.idForMap$.asObservable()
  private markers: any = {};
  makeMarkers(map: any, data: any[], icon: any): void {
    if(data.length == 1){
      map.removeLayer(this.markers[data[0].name])
    }
    for (const d of data) {
      let lon = d.long ?? d.longitude;
      let lat = d.lat ?? d.latitude;
      let marker = L.marker([lat, lon],{...icon,draggable:d.draggable}).on('click', () => {
        this.idForMap$.next(d.id)
      });
      marker.on('dragend', (e) => {
        this.storeService.updateLocalizationStores({ lat: marker.getLatLng().lat, long: marker.getLatLng().lng }).pipe(take(1)).subscribe((res: any) => {
        });
      })
      if (d?.name || d?.username) {
        marker.addTo(map).bindPopup(d.name || d.username).openPopup();
      }
      this.markers[d.name] = marker
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

