import * as L from "leaflet";

import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import { Input } from '@angular/core';
import { MarkerService } from 'src/app/services/marker.service';
import { Store } from 'src/app/models/store-model';
import { StoreService } from 'src/app/services/store.service';
import { User } from 'src/app/models/user.model';

import { take } from "rxjs/operators";

const iconRetinaUrl = "assets/marker-icon.png";
const iconUrl = "assets/marker-icon.png";
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  iconSize: [41, 60],
  iconAnchor: [12, 41],
  popupAnchor: [15, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [65, 65],
});

var redIcon = new L.Icon({
  iconUrl: 'assets/icon/location2.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [41, 60],
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
        })

      }
      this.map.zoomControl.remove();
      const legend = L.control.zoom({ position: 'bottomleft' })

      legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'legend');
        // Example content with icons
        div.innerHTML += `
          <div style="display: flex;flex-direction: column; align-items: center;justify-content: space-around; background-color: #fff; padding: 10px;    border-radius: 10px;
    box-shadow: 1px -1px 15px 0px">
            <div style="display: flex;flex-direction: row; align-items: center;justify-content: start; gap: 10px">
              <span style="width: 15px;height: 15px;background-color: #f00;border-radius: 50%;"></span>
             <span>Pionners</span>
             </div>
            <hr>
            <div style="display: flex;width: 100%;flex-direction: row; align-items: center;justify-content: start; gap: 10px">
              <span style="width: 15px;height: 15px;background-color:#257eca;border-radius: 50%;"></span>
            <span>Boutiques</span>
            </div>
          </div>
        `;
        return div;
      }
      legend.addTo(this.map);
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
      // L.Routing.control({
      //   waypoints: [
      //     L.latLng(51.5, -0.1),
      //     L.latLng(51.51, -0.047)
      //   ],
      //   routeWhileDragging: true,
      //   geocoder: L.Control.Geocoder.nominatim()
      // }).addTo(this.map);

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
      var b = L.marker([this.coordonnes.latitude, this.coordonnes.longitude])
        // .addTo(this.map)
        // .bindPopup("Votre position")
        // .openPopup()
        // .on('click', () => {
        //   console.log('click');

        // })
      var latLngs = b.getLatLng();
      this.map.setView(latLngs, 10, { animate: true });
    });
  }
}
