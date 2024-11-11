import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { CommonModule } from '@angular/common';
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

  private placeService = inject(PlacesService);
  private mapService = inject(MapService);

  public selectedId : string = '';

  get isLoadingPlaces(): boolean{
    return this.placeService.isLoadingPlaces;
  }

  get places(): Feature[]{
    return this.placeService.places;
  }

  flyTo(place: Feature){
    this.selectedId = place.id;

    const [lng, lat] = place.geometry.coordinates;
    this.mapService.flyTo([lng,lat]);

  }

  getDirections(place: Feature){

    if(!this.placeService.userLocation) throw Error('There is not user location available')

    this.placeService.deletePlaces();

    const start = this.placeService.userLocation;
    const end = place.geometry.coordinates as [number, number];

    this.mapService.getRouteBetweenPoints(start, end)
  }

}
