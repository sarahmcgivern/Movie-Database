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

interface IMDB {
  filmid: string;
  genre: string;
  plot: string;
  poster: string;
  released: string;
  runtime: string;
  // imdbid: 'tt6175086';
}

interface ApiData {
  items: Movie;
  hits: Movie[];
  imdbResults: IMDB;
  results: IMDB[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Movie-Database';


  movie:any;
  // movies: Movie[];
  list: object[];
  modalMovie;
  modalIndex: number;

  searchInput: string;
  typeMovie: boolean = false;
  typeTv: boolean = false;
  videoType: string;
  startYear: string;
  endYear: string;
  films: object[];
  imdbId: string = '80998296';
  baseUrl: string = 'https://www.imdb.com/title/';
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
  mediaType: string;



  constructor(private api: Api, private router: Router) {}


    // searchAllMovies = () => {
    //   this.api.searchMovie(this.searchInput).subscribe((data:any) => console.log(data.ITEMS.filter(movie => movie.title.toLowerCase().includes(this.searchInput.toLowerCase()))));
    // }
    
    searchAllMovies = () => {
      this.api.searchMovie(this.searchInput).subscribe((data:any) => {
        this.list = data.ITEMS.filter(movie => movie.title.toLowerCase().includes(this.searchInput.toLowerCase()));
    });
  };

  show = () => {
    this.modalMovie = this.list;
  }

  getAllMovies = () => {
    
      // this.selectedGenre=this.genres[Math.floor(Math.random() * this.genres.length)].genreId;
    // this.api.getMovie(this.searchInput).subscribe((data:any) => console.log(data.ITEMS.filter(movie => movie.title.toLowerCase().includes(this.searchInput.toLowerCase()))));
    // this.api.getMovie(this.searchInput).subscribe(data => console.log(data));
    
    // this.api.getMovie(this.mediaType, this.startYear, this.endYear,this.selectedLocation, this.selectedGenre).subscribe(data => console.log(data));
    // console.log(this.selectedGenre);

    this.api.getMovie(this.mediaType, this.startYear, this.endYear,this.selectedLocation, this.selectedGenre).subscribe((data:any) => {
        this.list = data.ITEMS;
        console.log(data.ITEMS);
    });
    

    // this.api.getMovie(this.videoType, this.startYear, this.endYear,this.selectedLocation, this.selectedGenre).subscribe(data => console.log(data));
    // this.films = (this.selectedGenre);
  }


//   getAllMovies = () => {
//     if (this.typeMovie === true && this.typeTv === false) {
//       this.videoType = 'Movie'; 
//       } else {
//         if (this.typeMovie === false && this.typeTv === true){
//           this.videoType = 'Series';
//         } else this.videoType = 'Any';
//       }
//       this.selectedGenre=this.genres[Math.floor(Math.random() * this.genres.length)].genreId;
//     // this.api.getMovie(this.searchInput).subscribe((data:any) => console.log(data.ITEMS.filter(movie => movie.title.toLowerCase().includes(this.searchInput.toLowerCase()))));
//     // this.api.getMovie(this.searchInput).subscribe(data => console.log(data));
//     this.api.getMovie(this.videoType, this.startYear, this.endYear,this.selectedLocation, this.selectedGenre).subscribe((data:any) => {
//     this.films = this.selectedGenre;
//   });
// };

 

getAllImdbDetails = (netflixid) => {
   this.api.getImdbDetails(netflixid).subscribe(data => {
     this.movie=data;
    console.log(this.movie)
   })
}
setMediaType = (type) => {
  this.mediaType = type;
  console.log(this.mediaType);
}

setDateRange = (dateRange) => {
  if (dateRange === 'classic'){
    this.startYear = '1900';
    this.endYear = '1980';
  };
  if (dateRange === 'contemporary'){
    this.startYear = '1981';
    this.endYear = '2019';
  };
  if (dateRange === 'suprise'){
    this.startYear = '1900';
    this.endYear = '2019';
  }
}

setGenre = (genre) => {
  if (genre === 'Action') {this.selectedGenre = '801362'};
  if (genre === 'Comedy') {this.selectedGenre = '6548'};
  if (genre === 'Romance') {this.selectedGenre = '8883'};
  if (genre === 'Drama') {this.selectedGenre = '5763'};
  if (genre ==='Horror' && (this.mediaType === 'Movie' || this.mediaType === 'Any')) {this.selectedGenre = '8711'} else {if (genre === 'Horror' && this.mediaType === 'Series') this.selectedGenre = '83059'};
  if (genre === 'Children' && (this.mediaType === 'Movie' || this.mediaType === 'Any')) {this.selectedGenre = '783'} else {if (genre === 'Children' && this.mediaType === 'Series') this.selectedGenre = '11177'};
}

}