import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInputPasswordToggle, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonBackButton, IonItem, IonIcon, IonText, IonInput } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth/auth.service';
import { user } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonInput, ReactiveFormsModule, IonText, IonInputPasswordToggle, IonIcon, IonItem, IonBackButton, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SignupPage implements OnInit {

  private auth = inject(AuthService)
  private router = inject(Router)

  constructor() {
    addIcons({ mailOutline });
  }

  ngOnInit() {
  }

  form = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  submit() {
    const username: any = this.form.value.username
    const email: any = this.form.value.email
    const password: any = this.form.value.password

    if (this.form.valid) {
      console.log(this.form.value)
      this.auth.signup(username, email, password).then((res: any) => {
        console.log(res)
        this.router.navigateByUrl('/home')
        this.form.reset()
      })
    } else {
      this.form.markAllAsTouched()
    }
  }
}
