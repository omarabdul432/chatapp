import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../api/api.service';
import { from, Observable } from 'rxjs';
import { collection, doc, Firestore, getDocs, QuerySnapshot } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  currentUserId!: string
  // public users!: Observable<any>

  constructor(public auth: AuthService, private firestore: Firestore) {
    // this.getDataId()
    // console.log(this.getDataId())
    // console.log("users", this.users)
    // this.getUsers()
  }

  // ngOnInit(): void {
  //   this.users.subscribe((data) => {
  //     console.log("data", data)
  //   })
  // }

  getDataId() {
    this.currentUserId = this.auth.getId()
    console.log('id', this.auth.getId())
  }

  // async getUsers() {
  // const docRef = doc(this.firestore, "users", "aM1lHoNxmyMrgtukd37p4PHzshs1")
  // const docSnap = await getDoc(docRef)
  // if (docSnap.exists()) {
  //   console.log(docSnap.data())
  // }
  // return docSnap.data()

  // const querySnapshot = await getDocs(collection(this.firestore, "users")).then(querySnapShot => {
  //   return querySnapShot.docs.map(doc => doc.data())
  // })
  // return from(querySnapshot)
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data())
  //   return doc.data()
  // })
  // }
}
