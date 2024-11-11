import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { Map, Popup, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

import { MapService, PlacesService } from '../../services';
import { environment } from '../../../../environments/environments';

(mapboxgl as any).accessToken = environment.mapbox_key;

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export default class MapViewComponent implements AfterViewInit{

  @ViewChild('map') divMap!: ElementRef;

  private placesServices = inject(PlacesService);
  private mapService = inject(MapService);

  ngAfterViewInit(): void {

    if(!this.placesServices.userLocation){
      throw Error('Error al obtener localización')
    }

    if(!this.divMap) throw 'El elemento HTML no fue encontrado';

    const map = new Map({
      container: this.divMap.nativeElement,
      //style: 'mapbox://styles/mapbox/streets-v12',
      style: 'mapbox://styles/mapbox/light-v10',
      center: this.placesServices.userLocation ? this.placesServices.userLocation : [-74.5, 40] , // starting user position or predetermined location [lng, lat]
      zoom: 9,
    });


    const popup = new Popup()
      .setHTML(`
        <h6> Aquí Estoy </h6>
        <span>Estoy en este lugar del mundo</span>
        `);

    new Marker({color: 'red'})
        .setLngLat(this.placesServices.userLocation)
        .setPopup(popup)
        .addTo(map);

    this.mapService.setMap(map);
  }

  

}
