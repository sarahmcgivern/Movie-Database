
import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import {HttpHeaders} from '@angular/common/http';


@Injectable()

export class Api {
    apiUrl = 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?'

    
    constructor( private http: HttpClient) {}
    

    getMovie = (searchInput) => {
        let headers = new HttpHeaders({
            "X-RapidAPI-Host":"unogs-unogs-v1.p.rapidapi.com",
            "X-RapidAPI-Key": "20e97e1117msh94521a8d54a51d0p1a1eecjsn0736ce7afe60"
        });
        return this.http.get(this.apiUrl + 'q=' + searchInput + '-!1900,2018-!0,5-!0,10-!0-!Any-!Any-!Any-!gt100-!{downloadable}&t=ns&cl=all&st=adv&ob=Relevance&p=1&sa=and', { headers });
    }


    }
 
