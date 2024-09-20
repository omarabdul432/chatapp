import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonItem, IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonLabel, IonInput, IonIcon, IonInputPasswordToggle, IonButton, IonBackButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
  standalone: true,
  imports: [IonBackButton, ReactiveFormsModule, RouterLink, IonButton, IonIcon, IonInput, IonItem, IonLabel, IonText, IonContent, IonHeader, IonTitle, IonToolbar, IonInputPasswordToggle, CommonModule, FormsModule]
})
export class SigninPage implements OnInit {

  private auth = inject(AuthService)
  private router = inject(Router)
  constructor() {
    addIcons({ mailOutline });
  }

  ngOnInit() {
  }

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  submit() {
    const email: any = this.form.value.email
    const password: any = this.form.value.password

    if (this.form.valid) {
      console.log(this.form.value)
      this.auth.signin(email, password).then((res: any) => {
        console.log(res)
        this.router.navigateByUrl('/home')
      })
    } else {
      this.form.markAllAsTouched()
    }
  }

}
