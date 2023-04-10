import { Component } from '@angular/core';
import { CreateAndUpdateDTO } from 'src/app/models/create-and-update-dto.model';
import { UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: CreateAndUpdateDTO = {
    name: '',
    email: ''
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;


  constructor(private userService: UserService) {}

  onSubmit(): void {
    this.userService.createUser(this.user).subscribe(
      (response) => {
        console.log('User created successfully:', response);
        this.successMessage = 'User created successfully!';
        this.user.name = '';
        this.user.email = '';

        setTimeout(() => {
          this.successMessage = null;
        }, 5000);
      },
      (error) => {
        console.error('Error creating user:', error);
        this.errorMessage = 'Failed to create user!';

        setTimeout(() => {
          this.errorMessage = null;
        }, 5000);
      }
    );
  }

}
