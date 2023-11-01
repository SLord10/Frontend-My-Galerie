import { Component } from '@angular/core';
import  { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  email: string = '';
  password: string = '';
  constructor(private router: Router) { }

  onSignUp() {
    // Implement your sign-up logic here
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    this.router.navigate(['/signin'] );


    // You can send a request to your backend API to handle sign-up logic
    // For now, let's assume sign-up is successful
  }
}
