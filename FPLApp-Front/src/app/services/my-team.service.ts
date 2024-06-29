import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyTeamService {
  private apiUrl = 'http://localhost:8000/api/my-teams/';

  constructor(private http: HttpClient) { }

  getMyTeams(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createMyTeam(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateMyTeam(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, data);
  }

  deleteMyTeam(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  saveMyTeam(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}

// @Injectable({
//   providedIn: 'root'
// })
// export class UserProfileService {
//   private apiUrl = 'http://localhost:8000/api/user-profile/';

//   constructor(private http: HttpClient) { }

//   getUserProfile(): Observable<any> {
//     return this.http.get(this.apiUrl);
//   }

//   updateUserProfile(data: any): Observable<any> {
//     return this.http.put(this.apiUrl, data);
//   }
// }
