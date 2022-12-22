import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {SupabaseService} from "../../services/supabase.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>Login</h1>

    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" class="form-control" placeholder="Email" [(ngModel)]="email" (keydown.enter)="onSignIn()">
    </div>

    <button class="btn btn-primary" (click)="onSignIn()">Sign In</button>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';

  constructor(private _supabaseService: SupabaseService) {
  }

  onSignIn() {
    console.log('Sign in with email:', this.email);
    this._supabaseService.signIn(this.email).then((data) => {
      console.log('Sign in result:', data);
    }).catch((error) => {
      console.log('Sign in error:', error);
    })
  }
}
