import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Api } from "./services/api.service";

// interface MovieInfo {
//   title: string;
// }

// interface Movie {
//   count: number;
//   movie: MovieInfo[];
// }

// interface IMDB {
//   filmid: string;
//   genre: string;
//   plot: string;
//   poster: string;
//   released: string;
//   runtime: string;
// }

// interface ApiData {
//   items: Movie;
//   hits: Movie[];
//   imdbResults: IMDB;
//   results: IMDB[];
// }

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Movie-Database";

  movie: any;
  // movies: Movie[];
  list: object[];
  searchInput: string = null;
  typeMovie: boolean = false;
  typeTv: boolean = false;
  videoType: string;
  startYear: string = "1900";
  endYear: string = "2019";
  films: object[];
  imdbId: string = "80998296";
  baseUrl: string = "https://www.imdb.com/title/";
  errorMessage: string;
  locations = [
    { id: "23", name: "Australia" },
    { id: "33", name: "Canada" },
    { id: "40", name: "Denmark" },
    { id: "44", name: "Finland" },
    { id: "45", name: "France" },
    { id: "39", name: "Germany" },
    { id: "67", name: "Netherlands" },
    { id: "68", name: "Norway" },
    { id: "46", name: "United Kingdom" },
    { id: "78", name: "United States" }
  ];

  selectedLocation: string = "78";

  genres = [
    { genreId: "1365", genreName: "Action & Adventure" },
    { genreId: "5763", genreName: "Dramas" },
    { genreId: "6839", genreName: "Documentaries" },
    { genreId: "7627", genreName: "Cult Movies" },
    { genreId: "3979", genreName: "Critically-acclaimed Films" },
    { genreId: "1492", genreName: "Sci-fi & Fantasy" },
    { genreId: "83", genreName: "TV Shows" },
    { genreId: "6548", genreName: "Comedies" },
    { genreId: "47147", genreName: "Classics" },
    { genreId: "1252", genreName: "Campy Movies" }
  ];

  genresMovies = [
    { genreId: "1252", genreName: "Campy Movies" },
    { genreId: "9434", genreName: "Cult Comedies" },
    { genreId: "10256", genreName: "Slapstick Comedies" },
    { genreId: "6548", genreName: "Comedies" },
    { genreId: "31694", genreName: "Classic Comedies" }
  ];

  genresTV = [
    { genreId: "11559", genreName: "Stand-up Comedy" },
    { genreId: "9833", genreName: "Reality TV" },
    { genreId: "26052", genreName: "Romantic TV Soaps" },
    { genreId: "10375", genreName: "TV Comedies" }
  ];

  mood: string;
  selectedGenre: string;
  mediaType: string;

  mediaButtons = ["Movie", "Series", "Any"];

  genreButtons = [
    "Feel Badass",
    "Laugh",
    "Believe In Love",
    "Think",
    "Be Scared",
    "Watch With Kids",
    "Feel Nostalgic",
    "Learn",
    "Only Kind Of Pay Attention"
  ];

  constructor(private api: Api, private router: Router) {}

  searchAllMovies = () => {
    this.api.searchMovie(this.searchInput).subscribe(
      (data: any) => {
        this.list = data.ITEMS.filter(movie =>
          movie.title.toLowerCase().includes(this.searchInput.toLowerCase())
        );

        if (this.list.length > 0) {
          this.errorMessage = null;
        } else {
          this.errorMessage = "No Results Found";
          console.log(this.errorMessage);
        }
      },
      error => {
        this.errorMessage = error.message;
      }
    );
  };

  getAllMovies = () => {
    if (this.mood === "Feel Badass") {
      this.selectedGenre = "801362";
    }
    if (this.mood === "Laugh") {
      this.selectedGenre = "6548";
    }
    if (this.mood === "Believe In Love") {
      this.selectedGenre = "8883";
    }
    if (this.mood === "Think") {
      this.selectedGenre = "5763";
    }
    if (
      this.mood === "Be Scared" &&
      (this.mediaType === "Movie" || this.mediaType === "Any")
    ) {
      this.selectedGenre = "8711";
    } else {
      if (this.mood === "Be Scared" && this.mediaType === "Series")
        this.selectedGenre = "83059";
    }
    if (
      this.mood === "Watch With Kids" &&
      (this.mediaType === "Movie" || this.mediaType === "Any")
    ) {
      this.selectedGenre = "783";
    } else {
      if (this.mood === "Watch With Kids" && this.mediaType === "Series")
        this.selectedGenre = "11177";
    }
    if (
      this.mood === "Feel Nostalgic" &&
      (this.mediaType === "Movie" || this.mediaType === "Any")
    ) {
      this.selectedGenre = "31574";
    } else {
      if (this.mood === "Feel Nostalgic" && this.mediaType === "Series")
        this.selectedGenre = "46553";
    }
    if (this.mood === "Learn") {
      this.selectedGenre = "6839";
    }
    if (
      this.mood === "Only Kind Of Pay Attention" &&
      (this.mediaType === "Movie" || this.mediaType === "Any")
    ) {
      this.selectedGenre = `${
        this.genresMovies[Math.floor(Math.random() * this.genresMovies.length)]
          .genreId
      }`;
    } else {
      if (
        this.mood === "Only Kind Of Pay Attention" &&
        this.mediaType === "Series"
      )
        this.selectedGenre = `${
          this.genresTV[Math.floor(Math.random() * this.genresTV.length)]
            .genreId
        }`;
    }

    // this.selectedGenre=this.genres[Math.floor(Math.random() * this.genres.length)].genreId;
    // this.api.getMovie(this.searchInput).subscribe((data:any) => console.log(data.ITEMS.filter(movie => movie.title.toLowerCase().includes(this.searchInput.toLowerCase()))));
    // this.api.getMovie(this.searchInput).subscribe(data => console.log(data));

    // this.api.getMovie(this.mediaType, this.startYear, this.endYear,this.selectedLocation, this.selectedGenre).subscribe(data => console.log(data));
    // console.log(this.selectedGenre);

    this.api
      .getMovie(
        this.mediaType,
        this.startYear,
        this.endYear,
        this.selectedLocation,
        this.selectedGenre
      )
      .subscribe((data: any) => {
        this.list = data.ITEMS;
        console.log(data.ITEMS);
        this.errorMessage = null;
      });
  };

  getAllImdbDetails = movie => {
    this.api.getImdbDetails(movie.netflixid).subscribe(data => {
      this.movie = { ...movie, ...data };
      console.log(this.movie);
    });
  };

  setMediaType = type => {
    this.mediaType = type;
    console.log(this.mediaType);
    document.getElementById("Movie").style.backgroundColor = "";
    document.getElementById("Series").style.backgroundColor = "";
    document.getElementById("Any").style.backgroundColor = "";
    document.getElementById(type).style.backgroundColor = "rgb(0, 123, 255)";
  };

  closeModal = () => {
    this.movie = null;
  };

  // setDateRange = (dateRange) => {
  //   if (dateRange === 'classic'){
  //     this.startYear = '1900';
  //     this.endYear = '1980';
  //   };
  //   if (dateRange === 'contemporary'){
  //     this.startYear = '1981';
  //     this.endYear = '2019';
  //   };
  //   if (dateRange === 'suprise'){
  //     this.startYear = '1900';
  //     this.endYear = '2019';
  //   }
  // }

  setGenre = genre => {
    this.mood = genre;
    // if (genre === 'Feel Badass') {this.selectedGenre = '801362'};
    // if (genre === 'Laugh') {this.selectedGenre = '6548'};
    // if (genre === 'Believe In Love') {this.selectedGenre = '8883'};
    // if (genre === 'Think') {this.selectedGenre = '5763'};
    // if (genre ==='Be Scared' && (this.mediaType === 'Movie' || this.mediaType === 'Any')) {this.selectedGenre = '8711'} else {if (genre === 'Be Scared' && this.mediaType === 'Series') this.selectedGenre = '83059'};
    // if (genre === 'Watch With Kids' && (this.mediaType === 'Movie' || this.mediaType === 'Any')) {this.selectedGenre = '783'} else {if (genre === 'Watch With Kids' && this.mediaType === 'Series') this.selectedGenre = '11177'};
    // if (genre === 'Feel Nostalgic' && (this.mediaType === 'Movie' || this.mediaType === 'Any')) {this.selectedGenre = '31574'} else {if (genre === 'Feel Nostalgic' && this.mediaType === 'Series') this.selectedGenre = '46553'};
    // if (genre === 'Learn') {this.selectedGenre = '6839'};
    // if (genre === 'Only Kind Of Pay Attention' && (this.mediaType === 'Movie' || this.mediaType === 'Any')) {this.selectedGenre = `${this.genresMovies[Math.floor(Math.random() * this.genresMovies.length)].genreId}`} else {if (genre === 'Only Kind Of Pay Attention' && this.mediaType === 'Series') this.selectedGenre = `${this.genresTV[Math.floor(Math.random() * this.genresTV.length)].genreId}`};

    document.getElementById("Feel Badass").style.backgroundColor = "";
    document.getElementById("Laugh").style.backgroundColor = "";
    document.getElementById("Believe In Love").style.backgroundColor = "";
    document.getElementById("Think").style.backgroundColor = "";
    document.getElementById("Be Scared").style.backgroundColor = "";
    document.getElementById("Feel Nostalgic").style.backgroundColor = "";
    document.getElementById("Learn").style.backgroundColor = "";
    document.getElementById("Watch With Kids").style.backgroundColor = "";
    document.getElementById(
      "Only Kind Of Pay Attention"
    ).style.backgroundColor = "";
    document.getElementById(genre).style.backgroundColor = "rgb(0, 123, 255)";
  };
}
