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
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Movie-Database';
  // movies: Movie[];
  searchInput: string;
  typeMovie: boolean = false;
  typeTv: boolean = false;
  videoType: string;
  startYear: string = '1900';
  endYear: string = '2019';
  locations = [
    {id: '23', name:'Australia'},
    {id: '33', name: 'Canada'},
    {id: '40', name: 'Denmark'},
    {id: '44', name:'Finland'},
    {id: '45', name: 'France'},
    {id: '39', name: 'Germany'},
    {id: '67', name: 'Netherlands'},
    {id: '68', name: 'Norway'},
    {id: '46', name: 'United Kingdom'},
    {id: '78', name: 'United States'}
  ];

  selectedLocation: string='78';

  genres = [
    {genreId: '1365', genreName: 'Action & Adventure'},
    {genreId: '5763', genreName: 'Dramas'},
    {genreId: '6839', genreName: 'Documentaries'},
    {genreId: '7627', genreName: 'Cult Movies'},
    {genreId: '3979', genreName: 'Critically-acclaimed Films'},
    {genreId: '1492', genreName: 'Sci-fi & Fantasy'},
    {genreId: '83', genreName: 'TV Shows'},
    {genreId: '6548', genreName: 'Comedies'}
  ];

  selectedGenre: string;



  constructor(private api: Api, private router: Router) {}


    // getAllMovies = () => {
    //   this.api.getMovie(this.searchInput).subscribe((data:any) => console.log(data.ITEMS.filter(movie => movie.title.toLowerCase().includes(this.searchInput.toLowerCase()))));
    // }
    




  getAllMovies = () => {
    if (this.typeMovie === true && this.typeTv === false) {
      this.videoType = 'Movie'; 
      } else {
        if (this.typeMovie === false && this.typeTv === true){
          this.videoType = 'Series';
        } else this.videoType = 'Any';
      }
      this.selectedGenre=this.genres[Math.floor(Math.random() * this.genres.length)].genreId;
    // this.api.getMovie(this.searchInput).subscribe((data:any) => console.log(data.ITEMS.filter(movie => movie.title.toLowerCase().includes(this.searchInput.toLowerCase()))));
    // this.api.getMovie(this.searchInput).subscribe(data => console.log(data));
    this.api.getMovie(this.videoType, this.startYear, this.endYear,this.selectedLocation, this.selectedGenre).subscribe(data => console.log(data));
    console.log(this.selectedGenre);
  }


}