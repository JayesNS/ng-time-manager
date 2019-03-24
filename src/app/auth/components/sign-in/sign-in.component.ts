import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {
  user = { username: '', password: '' };
  message: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  signIn(): void {
    this.auth.signIn(this.user).subscribe(
      (response: any) => {
        this.message = response.msg;
        if (response.success) {
          localStorage.setItem('jwtToken', response.token);
          this.router.navigate(['']);
        }
      },
      err => {
        this.message = err.error.msg;
      }
    );
  }
}
