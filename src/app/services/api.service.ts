import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class Api {
    apiUrl = 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/20e97e1117msh94521a8d54a51d0p1a1eecjsn0736ce7afe60'
    // appId: string = '00a41518';
    // appKey: string = '20e97e1117msh94521a8d54a51d0p1a1eecjsn0736ce7afe60';
   
    
    // private _recipes = new BehaviorSubject([]);
    // recipes = this._recipes.asObservable();

    constructor( private http: HttpClient) {}
    
    // getMovie = (query) => {
    //     return this.http.get(this.movieUrl = `https://api.edamam.com/search?q=${query || ""}&app_id=${this.appId}&app_key=${this.appKey}&from=${pagFrom}&to=${pagTo}&health=${healthValue}&ingr=${numberIngr}`)
    // }

    getMovie = () => {
        return this.http.get(this.apiUrl);
    }



}
