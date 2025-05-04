import * as L from "leaflet";

import { AfterViewInit, Component, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { MarkerService } from 'src/app/services/marker.service';
import { Store } from 'src/app/models/store-model';
import { StoreService } from 'src/app/services/store.service';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { take } from "rxjs/operators";

const iconRetinaUrl = "assets/marker-icon.png";
const iconUrl = "assets/marker-icon.png";
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [15, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [65, 65],
});

var redIcon = new L.Icon({
  iconUrl: environment.BACKEND_URL + '/marker/location2.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize:[65, 65],
  iconAnchor: [12, 41],
  popupAnchor: [15, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  @Input() public stores: Store[] = []
  @Input() public users: User[] = []
  @Input() public heightMap: number;
  @Input() public modeStoreView: boolean = false
  @Input() public storeName = '';
  @Input() public id = '';
  isModalOpen: boolean = false;
  map: L.Map;
  coordonnes: GeolocationCoordinates;
  makersLayer: L.FeatureGroup<any>;
  user: any
  constructor(
    private markerService: MarkerService,
    private storeService: StoreService
  ) { }


  ngAfterViewInit() {
    this.initMap();
  }



  private initMap(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.coordonnes = position.coords;
      if(!this.id){
        this.map = L.map("map", {
          center: [this.coordonnes.latitude, this.coordonnes.longitude],
          zoom: 10,
        });
      }
      else{

        this.map = L.map('map_2', {
          center: [this.coordonnes.latitude, this.coordonnes.longitude],
          zoom: 10,
        });
        console.log( this.map );

      }
      this.map.zoomControl.remove();
      L.control.zoom({ position: 'bottomright' }).addTo(this.map);
      const tiles = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 50,
          minZoom: 3,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      );
      tiles.addTo(this.map);
      this.makersLayer = L.featureGroup().addTo(this.map);
      this.map.on("click", (e: any) => {
        if(!this.modeStoreView){
          return
        }
        let long = e.latlng.lng;
        let lat = e.latlng.lat;
        this.markerService.makeMarkers(this.makersLayer, [{ lat,long, draggable:true, name:this.storeName}], { icon: iconDefault });
        this.storeService.updateLocalizationStores({ lat, long }).pipe(take(1)).subscribe((res: any) => {
        });
      });
      this.map.on("drag", (e: any) => {
        let long = e.latlng.lng;
        let lat = e.latlng.lat;
        this.markerService.makeMarkers(this.makersLayer, [{ lat,long, name:this.storeName}], { icon: iconDefault });
      })
      this.markerService.makeMarkers(this.makersLayer, this.stores, { icon: iconDefault });
      this.markerService.makeMarkers(this.makersLayer, this.users, { icon: redIcon });
      // var b = L.marker([this.coordonnes.latitude, this.coordonnes.longitude], { icon: redIcon })
      //   .addTo(this.map)
      //   .bindPopup("Votre position")
      //   .openPopup()
      //   .on('click', () => {
      //     console.log('click');

      //   })
      // var latLngs = b.getLatLng();
      // this.map.setView(latLngs, 10, { animate: true });
    });
  }
}
