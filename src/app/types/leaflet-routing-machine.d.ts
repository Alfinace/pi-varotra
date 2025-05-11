import * as L from 'leaflet';

declare module 'leaflet' {
  namespace Routing {
    class Control extends L.Control {
      constructor(options?: RoutingControlOptions);
      getPlan(): any;
      on(event: string, fn: Function): this;
    }

    interface RoutingControlOptions {
      waypoints?: L.LatLng[];
      router?: any;
      plan?: any;
      geocoder?: any;
      routeWhileDragging?: boolean;
      show?: boolean;
    }

    function control(options?: RoutingControlOptions): Control;
  }
}
