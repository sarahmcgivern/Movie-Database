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


  //  ngOnInit() {
  //   this.api.detail.subscribe(data => console.log(data));
  // }

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
    // this.api.getMovie(this.searchInput).subscribe((data:any) => console.log(data.ITEMS.filter(movie => movie.title.toLowerCase().includes(this.searchInput.toLowerCase()))));
    // this.api.getMovie(this.searchInput).subscribe(data => console.log(data));
    this.api.getMovie(this.videoType, this.startYear, this.endYear,this.selectedLocation).subscribe(data => console.log(data));
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