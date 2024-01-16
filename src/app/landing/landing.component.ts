import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  loginClicked!: boolean;
  menuChange!: boolean;
  Login() {
    this.loginClicked = true;
    this.menuChange = true;
  }
  Logout() {
    
    }
}
