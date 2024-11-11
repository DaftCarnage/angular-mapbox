import { Component, inject } from '@angular/core';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    SearchResultsComponent,
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  private placeService = inject(PlacesService);
  private debounceTimer?: NodeJS.Timeout;

  onQueryChanged(query: string){

    if(this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(()=> {
      this.placeService.getPlacesByQuery(query);
    }, 1000);

  }

}
