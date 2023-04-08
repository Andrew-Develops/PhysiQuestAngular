import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../models/user-dto.model';


@Component({
  selector: 'app-ladderboard',
  templateUrl: './ladderboard.component.html',
  styleUrls: ['./ladderboard.component.css']
})
export class LadderboardComponent implements OnInit {
  users: UserDTO[] = [];
  isLadderboardVisible = false;

  constructor(private userService: UserService) { }

  toggleLadderboard() {
    this.isLadderboardVisible = !this.isLadderboardVisible;
  }

  ngOnInit(): void {
    this.userService.getUsersByPointsDescending().subscribe({
      next: (users: UserDTO[]) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }
  
}
