import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { environment } from '../../../environments/environments';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private http = inject(HttpClient);
  private placesApi = inject(PlacesApiClient);
  private mapService = inject(MapService);

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean{
    return !!this.userLocation
  }

  constructor() { 
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(
        ({coords}) => {

          this.userLocation = [coords.longitude, coords.latitude]
          resolve(this.userLocation);

        },
        (err) => {
          alert('No se pudo obtener la Geolocalización');
          console.log(err);
          reject();
        }
          
      )


    });
  }

  getPlacesByQuery(query: string = ''){

    if(query.length === 0){
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    this.isLoadingPlaces = true;

    this.placesApi.get<PlacesResponse>(`/forward?q=${query}`, {
      params:{
        proximity : 'ip'
      }
    })
      .subscribe( resp => {
        console.log(resp.features);
        this.isLoadingPlaces = false;
        this.places = resp.features;

        this.mapService.createMarkerFromPlaces(this.places);
      })

    /*
    this.http.get<PlacesResponse>(`/forward?q=${query}&country=bo&limit=5&proximity=ip&language=es&access_token=${environment.mapbox_key}`)
      .subscribe(resp => {
        console.log(resp.features);
        this.isLoadingPlaces = false;
        this.places = resp.features;
      });
      */
  }

  deletePlaces(){
    this.places = [];
  }

}
