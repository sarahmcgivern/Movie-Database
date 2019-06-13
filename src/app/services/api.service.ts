
import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import {HttpHeaders} from '@angular/common/http';


@Injectable()

export class Api {
    // apiUrl = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?country=us'
    // apiUrl = 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi'

    apiUrl = 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?tl&q'

    
    constructor( private http: HttpClient) {}
    

    getMovie = (searchInput) => {
        let headers = new HttpHeaders({
            "X-RapidAPI-Host":'unogs-unogs-v1.p.rapidapi.com',
            "X-RapidAPI-Key": "20e97e1117msh94521a8d54a51d0p1a1eecjsn0736ce7afe60"
        });
        return this.http.get(this.apiUrl + '&query' + searchInput, { headers });
    }

}