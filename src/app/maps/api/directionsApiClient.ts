import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";


@Injectable({
    providedIn: 'root'
})
export class DirectionsApiClient extends HttpClient{

    public baseUrl: string = 'https://api.mapbox.com/directions/v5/mapbox/driving';


    //permite usar peticiones HTTP
    constructor(
        handler: HttpHandler
    ){
        super(handler);
    }

    //VOLVER A VER EL VIDEO 442 DE ANGULAR
    //Aca nosotros creamos nuestra propia peticion get
    //con el fin de reemplazar el httpclient
    public override get<T>(url: string){
        url = this.baseUrl+url;

        return super.get<T>(url, {
            params: {
                alternatives: false,
                geometries: 'geojson',
                overview: 'full',
                steps: false,
                access_token: environment.mapbox_key,
            }
        });
    }
}