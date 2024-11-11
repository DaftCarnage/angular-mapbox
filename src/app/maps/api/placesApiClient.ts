import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";


@Injectable({
    providedIn: 'root'
})
export class PlacesApiClient extends HttpClient{

    public baseUrl: string = 'https://api.mapbox.com/search/geocode/v6';


    //permite usar peticiones HTTP
    constructor(
        handler: HttpHandler
    ){
        super(handler);
    }

    //VOLVER A VER EL VIDEO 442 DE ANGULAR
    //Aca nosotros creamos nuestra propia peticion get
    //con el fin de reemplazar el httpclient
    public override get<T>(url: string, options:{
        params?: HttpParams | {
            [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>
        };
    }){
        url = this.baseUrl+url;

        return super.get<T>(url, {
            params: {
                limit: 5,
                country: 'bo',
                languaje: 'es',
                access_token: environment.mapbox_key,
                ...options.params
            }
        });
    }
}