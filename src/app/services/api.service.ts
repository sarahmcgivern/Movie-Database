import {Injectable} from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class Api {
    apiUrl = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?country=us&term=office'
    
    constructor( private http: HttpClient) {}
    
    getMovie = () => {
        let headers = new HttpHeaders({
            "X-RapidAPI-Host":  "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
            "X-RapidAPI-Key": "20e97e1117msh94521a8d54a51d0p1a1eecjsn0736ce7afe60"
        });
        return this.http.get(this.apiUrl, { headers });
    }
 


}
