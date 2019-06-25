import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { Api } from './services/api.service';
import { ReplaceAscii } from './replace.pipe';


const appRoutes: Routes = [
  {path: '', component: AppComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    ReplaceAscii

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule
  ],
  providers: [Api],
  bootstrap: [AppComponent]
})
export class AppModule { }
