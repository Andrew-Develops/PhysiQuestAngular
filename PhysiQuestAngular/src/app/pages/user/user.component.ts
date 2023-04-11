import { Component } from '@angular/core';
import { QuestService } from 'src/app/services/quest.service';
import { CreateAndUpdateQuestDTO } from 'src/app/models/create-and-update-quest-dto.model';
import { UserService } from '../../services/user.service';
import { BadgeDTO } from 'src/app/models/badge-dto.model';
import { UserDTO } from 'src/app/models/user-dto.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  badges: BadgeDTO[] = [];
  userPointsAndTokens: { points: number, tokens: number } | null = null;
  pointsTokensUsername = '';
  searchedUsername: string = '';
  createQuestTitle: string = '';
  createQuestDescription: string = '';
  createQuestRewardPoints: number = 0;
  createQuestRewardTokens: number = 0;
  createQuestUsername: string = '';
  proofImageUrl: string | null = null;
  proofImageUrlMessage: string | null = null;
  usernameForProofImage: string = '';
  questIdForProofImage: number = 0;
  showProofImageForm = false;
  badgesLoaded = false;
  showForm = false;
  showBadges = false;
  showPointsAndTokens = false;

  message: string | null = null;
  showTable = false;

  constructor(private userService: UserService,private questService: QuestService) { }

  toggleForm() {
    this.showForm = !this.showForm; 
  }
  toggleTable() {
    this.showTable = !this.showTable;
  }
  toggleBadges() {
    this.showBadges = !this.showBadges;
  }
  toggleProofImageForm() {
    this.showProofImageForm = !this.showProofImageForm;
  }
  togglePointsAndTokens(): void {
    this.showPointsAndTokens = !this.showPointsAndTokens;
  }
  onGetBadges() {
    this.userService.getBadgesByUsername(this.searchedUsername).subscribe({
      next: (response) => {
        this.badges = response;
        this.badgesLoaded = true;
      },
      error: (error) => {
        console.error('Error getting badges:', error);
        this.badgesLoaded = true;
      },
    });
  }

  onGetUserPointsAndTokens(): void {
  this.userService.getUserByUserName(this.pointsTokensUsername).subscribe({
    next: (user: UserDTO) => {
      this.userPointsAndTokens = { points: user.points, tokens: user.tokens };
    },
    error: (error) => {
      console.error('Error getting user points and tokens:', error);
      this.userPointsAndTokens = null;
    },
  });
  }
  
  onGetProofImageUrl() {
    this.userService.getProofImageUrl(this.usernameForProofImage, this.questIdForProofImage).subscribe({
      next: (response) => {
        console.log('Proof image URL:', response);
        this.proofImageUrlMessage = response || 'No URL link found';
        setTimeout(() => {
          this.proofImageUrlMessage = null;
        }, 10000);
      },
      error: (error) => {
        console.error('Error getting proof image URL:', error);
        this.proofImageUrlMessage = 'Failed to get proof image URL!';
        setTimeout(() => {
          this.proofImageUrlMessage = null;
        }, 10000);
      },
    });
  }
  
  onCreateQuest(): void {
    this.questService.createUserQuest(this.createQuestUsername, {
      title: this.createQuestTitle,
      description: this.createQuestDescription,
      rewardPoints: this.createQuestRewardPoints,
      rewardTokens: this.createQuestRewardTokens,
    }).subscribe({
      next: (response) => {
        console.log('Quest created successfully:', response);
        this.message = 'Quest created successfully!';
        this.createQuestUsername = '';
        this.createQuestTitle = '';
        this.createQuestDescription = '';
        this.createQuestRewardPoints;
        this.createQuestRewardTokens;
  
        setTimeout(() => {
          this.message = null;
        }, 5000);
      },
      error: (error) => {
        console.error('Error creating quest:', error);
        this.message = 'Failed to create quest!';
        setTimeout(() => {
          this.message = null;
        }, 5000);
      },
    });
  }
}
