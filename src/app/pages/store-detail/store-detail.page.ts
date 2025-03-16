import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import * as L from 'leaflet';
import { MarkerService } from 'src/app/services/marker.service';
import { StoreService } from 'src/app/services/store.service';
import { environment } from 'src/environments/environment';
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
  selector: 'app-store-detail',
  templateUrl: './store-detail.page.html',
  styleUrls: ['./store-detail.page.scss'],
})
export class StoreDetailPage implements OnInit {

  public articles: Article[] = []
  public store: any
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

  ngOnInit() {}
  ngOnDestroy() {
    this.map.remove();
  }

  ionViewWillEnter() {
    let id = this.route.snapshot.paramMap.get('id') as any;
    this.storeService.getStoreOne(id).toPromise().then(res => {
      this.store = res
    })
    this.storeService.getArticlesByStore(id, 0, 10).toPromise().then(res => {
      this.articles = res.rows
    })
  }

  toggle(){
    this.isModalOpen = !this.isModalOpen
    if(this.isModalOpen){
      setTimeout(() => {
        this.initMap();
        this.markerService.makeCapitalCircleMarkers(this.map);
      },2000)
    }
  }

  ionViewDidEnter() {
    this.initMap();
    this.markerService.makeCapitalCircleMarkers(this.map);
  }


  private initMap(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.coordonnes = position.coords;
      this.map = L.map("mapMagasin", {
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
      // this._markerService.coordonne.subscribe((data: any) => {
      //   this.centerLeafletMapOnMarker(this.map, this.makersLayer, data);
      // });
      // this._markerService.makePubMarkers(this.makersLayer, this.store);
      if (this.user) {
        L.marker([this.user.position[0], this.user.position[1]], { icon: redIcon })
          .addTo(this.map)
          .bindPopup('Test')
          .openPopup();

      } var b = L.marker([this.coordonnes.latitude, this.coordonnes.longitude], { icon: redIcon })
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
