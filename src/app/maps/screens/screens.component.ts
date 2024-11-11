import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from '../../shared/components/side-menu/side-menu.component';

@Component({
  selector: 'app-screens',
  standalone: true,
  imports: [
    RouterModule,
    SideMenuComponent,
  ],
  templateUrl: './screens.component.html',
  styles: ``
})
export default class ScreensComponent {

}
