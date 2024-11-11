import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  standalone: true,
  imports: [],
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

  private mapService = inject(MapService);
  private placeService = inject(PlacesService);

  public goToMyLocation(){  

    if(!this.placeService.isUserLocationReady) throw Error('No hay ubicación de usuario');

    if(!this.mapService.isMapReady) throw Error('No hay mapa disponible');

    this.mapService.flyTo(this.placeService.userLocation!);
  }

}
