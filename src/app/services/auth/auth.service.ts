import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from '@angular/fire/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { collection, doc, Firestore, getDocs, onSnapshot, QuerySnapshot, setDoc } from '@angular/fire/firestore';
import { User } from 'src/app/user';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private auth = inject(Auth)
  private apiService = inject(ApiService)
  private firestore = inject(Firestore)
  constructor() {
    // this.getUsers()
  }

  public uid = new BehaviorSubject<any>(null)
  currentUser: any
  users!: User[]
  // current = this!.currentUser

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
    const auth = getAuth()
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

  async addChatMsg(msg: any) {
    await setDoc(doc(this.firestore, "messages"), {
      msg,
      from: this.currentUser.uid,
    })
  }


  // getUsers(): Observable<any[]> {
  //   const querySnapshot = getDocs(collection(this.firestore, "users"))
  //     .then(querySnapShot => {
  //       return querySnapShot.docs.map(doc => doc.data())
  //     })
  //   console.log(querySnapshot)
  //   return from(querySnapshot)
  // }

  getUsers(): Observable<User[]> {
    return onSnapshot(collection(this.firestore, "users"), (snapshot) => {
      return snapshot.docs.map((doc) => {
        doc.data()
      })
    })
    // const snapshot = onSnapshot(collection(this.firestore, "users"), doc => {
    //   return doc
    // })
    // return
  }

  getUserformsg(msgFromId: any, currentUser: any) {
    for (let user of currentUser) {
      if (user.uid == msgFromId) {
        return user.name
      }
    }
  }

  getChatmessages() {
    let users = []
    return this.getUsers().pipe
  }
}
