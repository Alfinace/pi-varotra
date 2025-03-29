import { MarkerService } from 'src/app/services/marker.service';
import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import * as L from "leaflet";
import { Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { StoreService } from 'src/app/services/store.service';
import { environment } from 'src/environments/environment';
import { Store } from 'src/app/models/store-model';
import { ActivatedRoute } from '@angular/router';

const iconRetinaUrl = "assets/marker-icon.png";
const iconUrl = "assets/marker-icon.png";
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

var redIcon = new L.Icon({
  iconUrl: environment.BACKEND_URL + '/marker/location2.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [41, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  @Input() public stores: Store[] = []
  @Input() public users: User[] = []
  @Input() public heightMap: number;
  isModalOpen: boolean = false;
  map: L.Map;
  coordonnes: GeolocationCoordinates;
  makersLayer: L.FeatureGroup<any>;
  user : any
  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private markerService: MarkerService
  ) { }

  ngOnInit() {
    console.log("test");

    this.initMap();
  }
  ngOnDestroy() {
    this.map.remove();
  }


  // private initMap(): void {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     this.coordonnes = position.coords;
  //     this.map = L.map("map", {
  //       center: [this.coordonnes.latitude, this.coordonnes.longitude],
  //       zoom: 23,
  //     });
  //     L.control.zoom({ position: 'bottomright' }).addTo(this.map);
  //     const tiles = L.tileLayer(
  //       "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  //       {
  //         maxZoom: 50,
  //         minZoom: 3,
  //         // accessToken:
  //         //   "pk.eyj1ijoiywxmaw5hbmnliiwiysi6imnrb3nszxczyzaybheybmxrend2yxbhzzyifq.x-oiked1j2hlhsj_2iorra",
  //         attribution:
  //           '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  //       }
  //     );
  //     tiles.addTo(this.map);
  //     this.makersLayer = L.featureGroup().addTo(this.map);
  //     this.map.on("click", (e: any) => {
  //       //to do
  //     });
  //     // this._markerService.coordonne.subscribe((data: any) => {
  //     //   this.centerLeafletMapOnMarker(this.map, this.makersLayer, data);
  //     // });
  //     this.markerService.makePubMarkers(this.makersLayer, this.stores, { icon: iconDefault });
  //     this.markerService.makePubMarkers(this.makersLayer, this.users,{ icon: redIcon });
  //     var b = L.marker([this.coordonnes.latitude, this.coordonnes.longitude], { icon: redIcon })
  //       .addTo(this.map)
  //       .bindPopup("Votre position")
  //       .on('click', () => {
  //         console.log('click');
  //       })
  //     var latLngs = b.getLatLng();
  //     this.map.setView(latLngs, 23, { animate: true});
  //   });
  // }

  private initMap(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.coordonnes = position.coords;
      this.map = L.map("map", {
        center: [this.coordonnes.latitude, this.coordonnes.longitude],
        zoom: 23,
      });
      this.map.zoomControl.remove();
      L.control.zoom({ position: 'bottomright' }).addTo(this.map);
      const tiles = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 50,
          minZoom: 3,
          // accessToken:
          //   "pk.eyj1ijoiywxmaw5hbmnliiwiysi6imnrb3nszxczyzaybheybmxrend2yxbhzzyifq.x-oiked1j2hlhsj_2iorra",
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }
      );
      tiles.addTo(this.map);
      this.makersLayer = L.featureGroup().addTo(this.map);
      this.map.on("click", (e: any) => {
        //to do
      });
      this.markerService.makePubMarkers(this.makersLayer, this.stores, { icon: iconDefault });
      this.markerService.makePubMarkers(this.makersLayer, this.users,{ icon: redIcon });
     var b = L.marker([this.coordonnes.latitude, this.coordonnes.longitude], { icon: redIcon })
        .addTo(this.map)
        .bindPopup("Votre position")
        .openPopup()
        .on('click', () => {
          console.log('click');

        })
      var latLngs = b.getLatLng();
      this.map.setView(latLngs, 17, { animate: true});
    });
  }
}
