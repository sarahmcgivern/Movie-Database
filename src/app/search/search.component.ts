import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from '../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  list: object[];
  searchInput: string;

  constructor(private api: Api, private router: Router) {}

  searchAllMovies = () => {
    this.api.searchMovie(this.searchInput).subscribe((data:any) => {
      this.list = data.ITEMS.filter(movie => movie.title.toLowerCase().includes(this.searchInput.toLowerCase()));
  });
};
}
