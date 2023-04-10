import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from '../models/user-dto.model';
import { CreateAndUpdateDTO } from '../models/create-and-update-dto.model';
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

  getQuests(): Observable<QuestDTO[]> {
    return this.http.get<QuestDTO[]>(`${this.apiUrl}/Quest`);
  }

  getBadges(): Observable<BadgeDTO[]> {
    return this.http.get<BadgeDTO[]>(`${this.apiUrl}/Badge`);
  }

  createUser(userDto: CreateAndUpdateDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(`${this.apiUrl}/User`, userDto);
  }

  getBadgesByUsername(username: string): Observable<BadgeDTO[]> {
    return this.http.get<BadgeDTO[]>(`${this.apiUrl}/User/${username}/badges`);
  }

  getProofImageUrl(username: string, questId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/User/${username}/user-quest/${questId}/proof-image-url`, { responseType: 'text' });
  }
}
