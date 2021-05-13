import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  url: 'https://restcountries.eu/rest/v2/all'
  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get('https://restcountries.eu/rest/v2/all').pipe(
      map((resp: any) => resp)
    );
  }
}
