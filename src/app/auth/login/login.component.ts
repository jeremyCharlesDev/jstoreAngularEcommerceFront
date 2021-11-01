import { CartService } from './../../services/cart.service';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/model/users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.initFormLogin();
  }

  initFormLogin(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', Validators.email),
      password: this.fb.control('', Validators.minLength(6))
    });
  }

  onSubmit(): void {
    const userEmail = this.loginForm.get('email').value;
    const userPassword = this.loginForm.get('password').value;
    const newUser: Users = {email: userEmail, password: userPassword};
    this.userService.authentifier(newUser).then(
      (data) => {
        const cart = this.cartService.cart;
        if (cart.length){
          this.router.navigate(['/checkout']);
        }else{
          this.router.navigate(['/shop']);
        }
      }
    ).catch((error) => {
      this.errorMessage = error;
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
    });
  }

}
