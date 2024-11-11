import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interfaces/directions';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private http = inject(HttpClient);
  private directionsApi = inject(DirectionsApiClient);

  private map?: Map;
  private markers?: Marker[] = [];

  get isMapReady(){
    return !!this.map;  //si tiene un valor, devuelve True
  }

  setMap(map : Map){
    this.map = map;
  }

  //LngLatLike es una variable ofrecida por MapBox que representa un [number, number]
  flyTo( coords: LngLatLike ){
    if ( !this.isMapReady) throw Error('El mapa no esta inicializado');
    
    this.map?.flyTo({
      zoom: 14,
      center: coords
    });
  }

  createMarkerFromPlaces(places: Feature[]){
    if(!this.map) throw Error('Mapa no inicializado');

    this.markers?.forEach( marker => marker.remove());
    const newMarkers = [];

    for(const place of places){
      const [lng,lat]= place.geometry.coordinates;
      const popup = new Popup()
        .setHTML(`
          <h6>${place.properties.context}</h6>
          <span>${place.properties.name}</span>
          `);
      const newMarker = new Marker()
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(this.map);

      newMarkers.push(newMarker);
    }

    this.markers = newMarkers;

    if(places.length === 0) return;

    // Limites del mapa
    const bounds = new LngLatBounds();
    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));

    this.map.fitBounds(bounds, {
      padding: 200
    });
  }

  getRouteBetweenPoints(start: [number,number], end: [number,number]){
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(resp => this.drawPolyline(resp.routes[0]));
  }

  private drawPolyline(route: Route){
    //Dividimos entre mil por las millas a km
    //Dividimos entre 60 por los minutos
    console.log({kms: route.distance / 1000, duration: route.duration / 60});

    if(!this.map) throw Error('Map not available');

    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();
    coords.forEach( ([lng, lat]) => {
      bounds.extend([lng, lat]);
    });

    this.map?.fitBounds( bounds, {
      padding: 200
    });

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    if(this.map.getLayer('RouteString')){
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    this.map.addSource('RouteString', sourceData);

    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    })

  }

}
