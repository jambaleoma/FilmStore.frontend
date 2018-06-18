import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from '../models/film';

@Injectable()
export class FilmService {

  constructor(private http: HttpClient) {}

   /**
   * @return List of Film
   */

    getFilms() {
            return this.http.get('/rest/films/all')
                    .toPromise()
                    .then(res => <Film[]> res)
                    .then(data => data);
    }
}
