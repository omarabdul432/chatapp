import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { collection, doc, Firestore, getDoc, query, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestore: Firestore) { }

  docRef(path: any) {
    return doc(this.firestore, path)
  }

  setDocument(path: any, data: any) {
    const dataRef = this.docRef(path)
    return setDoc(dataRef, data)
  }

  // collectionRef(path: any) {
  //   return collection(this.firestore, path)
  // }

  getDocById(path: any) {
    const getId = this.docRef(path)
    return getDoc(getId)
  }

  // async collection() {
  //   const docRef = doc(this.firestore, "users")
  //   const docSnap = await getDoc(docRef)
  //   if (docSnap.exists()) {
  //     console.log(docSnap.data())
  //   }
  // }

  // async collection() {
  //   const q = query(collection(this.firestore, 'users'))
  //   const querySnapshot = await getDoc(q)
  //   querySnapshot.forEach(doc => {
  //     console.log(doc.id)
  //   });
  // }
}
