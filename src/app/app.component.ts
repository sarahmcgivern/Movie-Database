import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from './services/api.service';

interface MovieInfo {
  title: string;
}

interface Movie {
  count: number;
  movie: MovieInfo[];
}
interface ApiData {
  items: Movie;
  hits: Movie[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Movie-Database';
  // movies: Movie[];
  searchInput: string;
 list: object[];

  //  ngOnInit() {
  //   this.api.detail.subscribe(data => console.log(data));
  // }

  constructor(private api: Api, private router: Router) {}


    // getAllMovies = () => {
    //   this.api.getMovie(this.searchInput).subscribe((data:any) => console.log(data.ITEMS.filter(movie => movie.title.toLowerCase().includes(this.searchInput.toLowerCase()))));
    // }
    
    getAllMovies = () => {
      this.api.getMovie(this.searchInput).subscribe((data:any) => { 
        this.list = data.ITEMS.filter(movie => movie.title.toLowerCase().includes(this.searchInput.toLowerCase()))});
    }
  // ngOnInit() {
  //   this.api.movies.subscribe(data => this.movies = data);
  // }

  // getAllMovies = () => {
  //   this.api
  //   .subscribe(data => console.log('DATA FROM FACT CALL', data));

  //   this.api.getMovie().subscribe((data: ApiData) => {
  //     console.log('GETTING DATA');
  //     this.list = data.results; 
  //     this.errorMessage = null;
  //   }

  // };
}
