import * as L from 'leaflet';

declare module 'leaflet' {
  namespace Control {
    namespace Geocoder {
      function nominatim(): any;
    }

    class Geocoder extends Control {
      constructor(options?: any);
    }
  }
}
