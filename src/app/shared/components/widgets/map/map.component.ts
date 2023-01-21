import { MarkerService } from 'src/app/services/marker.service';
import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import * as L from "leaflet";
import { Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { StoreService } from 'src/app/services/store.service';

const iconRetinaUrl = "assets/marker-icon.png";
const iconUrl = "assets/marker-icon.png";
// const shadowUrl = "assets/marker-shadow.png";
// const iconRetinaPositionUrl = "assets/marker-icon-2x.png";
// const iconPositionUrl = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png";

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
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
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
export class MapComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() store: any;
  @Input() user: User;
  coordonnes: any;
  makersLayer: L.FeatureGroup<any>;
  private map: any;
  private initMap(): void {
    this.map = L.map("map").setView([-25.429397, -49.271165], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map Test'
    }).addTo(this.map);
    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.coordonnes = position.coords;
    //   this.map = L.map("map", {
    //     center: [this.coordonnes.latitude, this.coordonnes.longitude],
    //     zoom: 23,
    //   });
    //   this.map.zoomControl.remove();
    //   L.control.zoom({ position: 'bottomright' }).addTo(this.map);
    //   const tiles = L.tileLayer(
    //     "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    //     {
    //       maxZoom: 50,
    //       minZoom: 3,
    //       // accessToken:
    //       //   "pk.eyj1ijoiywxmaw5hbmnliiwiysi6imnrb3nszxczyzaybheybmxrend2yxbhzzyifq.x-oiked1j2hlhsj_2iorra",
    //       attribution:
    //         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    //     }
    //   );
    //   tiles.addTo(this.map);
    //   this.makersLayer = L.featureGroup().addTo(this.map);
    //   this.map.on("click", (e: any) => {
    //     //to do
    //   });
    //   this._markerService.coordonne.subscribe((data: any) => {
    //     this.centerLeafletMapOnMarker(this.map, this.makersLayer, data);
    //   });
    //   this._markerService.makePubMarkers(this.makersLayer, this.store);
    //   if (this.user) {
    //     L.marker([this.user.position[0], this.user.position[1]], { icon: redIcon })
    //       .addTo(this.map)
    //       .bindPopup('Test')
    //       .openPopup();

    //   } var b = L.marker([this.coordonnes.latitude, this.coordonnes.longitude], { icon: redIcon })
    //     .addTo(this.map)
    //     .bindPopup("Ma position")
    //     .openPopup();
    //   var latLngs = b.getLatLng();
    //   this.map.setView(latLngs, 17);
    // });
  }
  constructor(private _markerService: MarkerService, private storeService: StoreService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this._markerService.coordonne.subscribe((data: any) => {
      if (data) {
        this.centerLeafletMapOnMarker(this.map, this.makersLayer, data);
      }
    });
    this._markerService.makePubMarkers(this.makersLayer, this.store);
    if (this.user) {
      console.log(this.user);

      L.marker([this.user.position[0], this.user.position[1]], { icon: redIcon })
        .addTo(this.map)
        .bindPopup('Test')
        .openPopup();
    }
    var b = L.marker([this.coordonnes.latitude, this.coordonnes.longitude], { icon: redIcon })
      .addTo(this.map)
      .bindPopup("Ma position")
      .openPopup();
    var latLngs = b.getLatLng();
    this.map.setView(latLngs, 8);
  }
  ngAfterViewInit(): void {
    console.log('after');

    // if(this.map){
    //   this.map.off();
    //   this.map.remove();
    // }
    this.initMap()
  }
  ngOnDestroy(): void {
    console.log('destroy');

    if (this.map) {
      this.map.off();
      this.map.remove();
    }
  }


  ngOnInit(): void {
    console.log('init');
    // this.publicationService.datapub.subscribe(
    //   (res: any) => {
    //     if (res) {
    //       this.publications = res
    //     }
    //   }
    // )
  }

  centerLeafletMapOnMarker(map: any, markers: any, data: any) {
    markers.getLayers().forEach((marker: any) => {
      if (
        JSON.stringify([marker._latlng.lat, marker._latlng.lng]) ===
        JSON.stringify(data.coordonne)
      ) {
        markers.removeLayer(marker);
        if (data.pub._materiel) {
          var a = L.marker(data.coordonne)
            .on("click", () => {
              console.log(this.findPos(document.getElementById(data.pub._id)));
              window.scroll(0, this.findPos(document.getElementById(data.pub._id)) + 250);
            })
            .addTo(markers)
            .bindPopup(data.pub._materiel.designationMat)
            .openPopup();
        } else {
          var a = L.marker(data.coordonne)
            .on("click", () => {
              console.log(this.findPos(document.getElementById(data.pub._id)));
              window.scroll(0, this.findPos(document.getElementById(data.pub._id)) + 250);
            })
            .addTo(markers)
            .bindPopup(data.pub.titre)
            .openPopup();
        }
        var latLngs = a.getLatLng();
        map.setView(latLngs, 8);
        return;
      }
    });
  }

  findPos(obj: any): any {
    var curtop = 0;
    if (obj.offsetParent) {
      do {
        curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);
      return [curtop];
    }
  }
}
