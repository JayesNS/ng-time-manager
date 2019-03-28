import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  user = { username: '', password: '' };
  message: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  signUp(): void {
    this.auth.signUp(this.user).subscribe(
      (response: any) => {
        this.message = response.msg;
        if (response.success) {
          this.router.navigate(['sign-in']);
        }
      },
      err => {
        this.message = err.error.msg;
      }
    );
  }
}
