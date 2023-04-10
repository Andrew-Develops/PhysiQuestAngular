import { Component, OnInit } from '@angular/core';
import { QuestService } from 'src/app/services/quest.service';
import { QuestDTO } from 'src/app/models/quest-dto.model';
//import { UserQuestDetailDTO } from 'src/app/models/user-quest-detail-dto.model';
import { UserQuestDTO } from 'src/app/models/user-quest-dto.model';
import { UserQuestDetailWithIdDTO } from 'src/app/models/user-quest-detail-with-id-dto.model';

@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.css']
})
export class QuestComponent implements OnInit {
  quests: QuestDTO[] = [];
  userQuests: UserQuestDetailWithIdDTO[] = [];
  selectedSortOrder = 'default';
  selectedQuest: QuestDTO | null = null;
  username: string = '';
  searchUsername: string = '';
  //userQuests: UserQuestDetailDTO[] = [];
  successMessage: string | null = null;
  completeQuestUsername: string = '';
  completeQuestImageUrl: string = '';
  completeQuestId: number | null = null;
  showCompleteQuestForm = false;
  currentPage: number = 1;
  itemsPerPage: number = 7;

  constructor(private questService: QuestService) { }

  ngOnInit(): void {
    this.loadQuests();
  }

  showAssignForm(quest: QuestDTO): void {
    this.selectedQuest = quest;
  }

  getQuestsForUser(username: string): void {
    this.questService.getQuestsForUser(username).subscribe(
      (quests) => {
        this.userQuests = quests;
      },
      (error) => {
        console.error('Error fetching quests for user:', error);
      }
    );
  }

  completeQuestForm(event: Event): void {
    event.preventDefault();
    if (!this.completeQuestId) return; 
    this.completeUserQuest(this.completeQuestId, this.completeQuestUsername, this.completeQuestImageUrl);
  }
  
  toggleCompleteQuestForm(): void {
    this.showCompleteQuestForm = !this.showCompleteQuestForm;
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
  }

  numberOfPages(): number {
    return Math.ceil(this.quests.length / this.itemsPerPage);
  }

  setSortOrder(sortOrder: string) {
    this.selectedSortOrder = sortOrder;
    this.onSortOrderChanged();
  }

  assignQuestToUser(): void {
    if (!this.selectedQuest) return;

    this.questService.assignQuestToUser(this.username, this.selectedQuest.id).subscribe(
      (userQuest: QuestDTO) => {
        console.log('Quest assigned successfully:', userQuest);
        this.selectedQuest = null;
        this.username = '';
        this.successMessage = 'Quest assigned successfully!';
        setTimeout(() => {
          this.successMessage = null;
          }, 5000);
      },
      (error) => {
        console.error('Error assigning quest:', error);
      }
    );
  }
  completeUserQuest(questId: number, username: string, imageUrl: string): void {
    this.questService.completeUserQuest(questId, username, imageUrl).subscribe(
      (completedUserQuest: UserQuestDTO) => {
        console.log('Quest completed successfully:', completedUserQuest);
      },
      (error) => {
        console.error('Error completing quest:', error);
      }
    );
  }

  loadQuests(): void {
    switch (this.selectedSortOrder) {
      case 'alphabetical':
        this.questService.getQuestsAlphabetical().subscribe((quests) => this.quests = quests);
        break;
      case 'reward-points':
        this.questService.getQuestsByRewardPoints().subscribe((quests) => this.quests = quests);
        break;
      case 'reward-tokens':
        this.questService.getQuestsByRewardTokens().subscribe((quests) => this.quests = quests);
        break;
      default:
        break;
    }
  }

  onQuestCompletionButtonClick(questId: number): void {
    // Prompt the user for their username and the image URL
    const username = this.searchUsername;
    const imageUrl = prompt('Enter the image URL:');
    
    if (username && imageUrl) {
      this.completeUserQuest(questId, username, imageUrl);
    }
  }

  onSortOrderChanged(): void {
    this.loadQuests();
  }
}