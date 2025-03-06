import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = 'http://localhost:8259/api';

  constructor(private http: HttpClient) { }

  getGreeting() {
    return this.http.get(`${this.apiUrl}/greeting`);
  }
}
