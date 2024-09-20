import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth)
  private apiService = inject(ApiService)

  constructor() { }

  public uid = new BehaviorSubject<any>(null)
  currentUser: any

  async signin(email: string, password: string): Promise<any> {
    try {
      const response = await signInWithEmailAndPassword(this.auth, email, password)
      // console.log('response', response)
      if (response.user) {
        this.setUserData(response.user.uid)
        console.log("response", response.user.uid);
      }
    } catch (error) {
      throw (error)
    }
  }

  getId() {
    // const auth=get
    const auth = getAuth()
    console.log('aut', auth)
    console.log('cus', auth.currentUser)
    console.log('auth', getAuth().currentUser)
    console.log('config', auth.config)
    this.currentUser = auth.currentUser
    console.log('getId', this.currentUser)
    return this.currentUser.uid
  }

  setUserData(uid: any) {
    this.uid.next(uid)
  }



  async signup(username: string, email: string, password: string) {
    try {
      const registerdUser = await createUserWithEmailAndPassword(this.auth, email, password)

      const data = {
        name: username,
        uid: registerdUser.user.uid,
        email: email
      }

      await this.apiService.setDocument(`users/${registerdUser.user.uid}`, data)
      const userData = {
        id: registerdUser.user.uid
      }
      console.log('userDta', userData)
      return userData
    } catch (error) {
      throw (error)
    }
  }

  async signout() {
    try {
      await this.auth.signOut()
      this.uid.next(null)
      console.log(this.auth.currentUser)
      return true
    } catch (error) {
      throw (error)
    }
  }

  async authState() {
    await onAuthStateChanged(this.auth, (user) => {
      if (user) {
        const uid = user.uid
      }
    })
  }

  async getDataById(id: any): Promise<any> {
    const docRef = await this.apiService.getDocById(`users/${id}`)
    if (docRef.exists()) {
      return docRef.data()
    } else {
      console.log("No files exist");

    }
  }
}
