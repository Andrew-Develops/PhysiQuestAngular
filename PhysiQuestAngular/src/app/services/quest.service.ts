import { HttpClient,HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestDTO } from '../models/quest-dto.model';
import { CreateAndUpdateQuestDTO } from '../models/create-and-update-quest-dto.model';
import { UserQuestDetailDTO } from '../models/user-quest-detail-dto.model';
import { UserQuestDTO } from '../models/user-quest-dto.model';
import { UserQuestDetailWithIdDTO } from '../models/user-quest-detail-with-id-dto.model';


@Injectable({
  providedIn: 'root',
})
export class QuestService {
  private apiUrl = 'https://localhost:7280';

  constructor(private http: HttpClient) {}

  createQuest(quest: CreateAndUpdateQuestDTO): Observable<QuestDTO> {
    return this.http.post<QuestDTO>(`${this.apiUrl}/api/Quest`, quest);
  }

  getQuestsAlphabetical(): Observable<QuestDTO[]> {
    return this.http.get<QuestDTO[]>(`${this.apiUrl}/api/Quest/alphabetical`);
  }

  getQuestsByRewardPoints(): Observable<QuestDTO[]> {
    return this.http.get<QuestDTO[]>(`${this.apiUrl}/api/Quest/reward-points`);
  }

  getQuestsByRewardTokens(): Observable<QuestDTO[]> {
    return this.http.get<QuestDTO[]>(`${this.apiUrl}/api/Quest/reward-tokens`);
  }

  // getQuestsForUser(username: string): Observable<UserQuestDetailDTO[]> {
  //   return this.http.get<UserQuestDetailDTO[]>(`${this.apiUrl}/api/Quest/user?username=${username}`);
  // }

  getQuestsForUser(username: string): Observable<UserQuestDetailWithIdDTO[]> {
    return this.http.get<UserQuestDetailWithIdDTO[]>(`${this.apiUrl}/api/Quest/user?username=${username}`);
  }

  assignQuestToUser(username: string, questId: number): Observable<QuestDTO> {
    const url = `${this.apiUrl}/api/Quest/assign/${username}/${questId}`;
    return this.http.post<QuestDTO>(url, null);
  }

  createUserQuest(username: string, questDto: CreateAndUpdateQuestDTO): Observable<QuestDTO> {
    return this.http.post<QuestDTO>(`${this.apiUrl}/api/User/create-quest/${username}`, questDto);
  }

  completeUserQuest(questId: number, username: string, imageUrl: string): Observable<UserQuestDTO> {
    const formData = new FormData();
    formData.append('imageUrl', imageUrl);
    const queryParams = new HttpParams().set('username', username);
    return this.http.put<UserQuestDTO>(`${this.apiUrl}/api/Quest/complete/${questId}`, formData, { params: queryParams });
  }

  deleteUserQuest(username: string, questId: number): Observable<UserQuestDTO> {
    const params = new HttpParams().set('username', username);
    return this.http.delete<UserQuestDTO>(`${this.apiUrl}/api/Quest/delete/${questId}`, { params });
  }
  
}
