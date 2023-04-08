import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user-dto.model';
import { QuestDTO } from '../models/quest-dto.model';
import { BadgeDTO } from '../models/badge-dto.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:7280/api';

  constructor(private http: HttpClient) {}

  getUsersByPointsDescending(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.apiUrl}/User/top`);
  }

  // Adaugă metodele pentru a apela endpoint-urile Quest și Badge

  getQuests(): Observable<QuestDTO[]> {
    return this.http.get<QuestDTO[]>(`${this.apiUrl}/Quest`);
  }

  getBadges(): Observable<BadgeDTO[]> {
    return this.http.get<BadgeDTO[]>(`${this.apiUrl}/Badge`);
  }
}
