import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'maps',
        title: 'Maps',
        loadComponent: () => import('./maps/screens/screens.component'),
        children: [
            {
                path:'',
                title:'Full Screen Map',
                loadComponent: () => import('./maps/screens/map-screen/map-screen.component')
            }

        ]  
    },
    {
        path:'',
        redirectTo: (route) => {
            return '/maps';
        },
        pathMatch: 'full',
    }
];
