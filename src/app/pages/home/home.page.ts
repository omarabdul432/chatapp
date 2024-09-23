import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonPopover, IonText, IonLabel, IonSegment, IonSegmentButton, IonList, IonListHeader, IonItem, IonAvatar, IonFab, IonFabButton, IonModal, IonButtons } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ellipsisVerticalOutline, add } from 'ionicons/icons'
import { UserListComponent } from 'src/app/components/user-list/user-list.component';
import { Router } from '@angular/router';
import { ChatsService } from 'src/app/services/chats/chats.service';
import { from, Observable } from 'rxjs';
import { user } from '@angular/fire/auth';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButtons, IonModal, IonFabButton, IonFab, IonAvatar, IonItem, IonListHeader, IonList, IonSegmentButton, IonSegment, IonLabel, IonText, IonPopover, IonIcon, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, UserListComponent],
})
export class HomePage implements OnInit {

  // @ViewChild(IonModal) modal!: IonModal
  segment = 'chats'
  openNewChat = false

  users!: Observable<any[]>
  chatRooms!: Observable<any[]>
  // users = [
  //   {
  //     id: '1',
  //     name: 'Fareed',
  //     photo: 'https://img.freepik.com/free-photo/3d-cartoon-portrait-person-practicing-law-related-profession_23-2151419548.jpg?size=626&ext=jpg&ga=GA1.1.758758601.1726203726&semt=ais_hybrid'
  //   },
  //   {
  //     id: '2',
  //     name: 'Nishar',
  //     photo: 'https://img.freepik.com/free-photo/young-businessman-wearing-glasses-white-suit-3d-rendering_1142-39061.jpg?size=626&ext=jpg&ga=GA1.1.758758601.1726203726&semt=ais_hybrid'
  //   }
  // ]

  // chatRooms = [
  //   {
  //     id: '1',
  //     name: 'Fareed',
  //     photo: 'https://img.freepik.com/free-photo/3d-cartoon-portrait-person-practicing-law-related-profession_23-2151419548.jpg?size=626&ext=jpg&ga=GA1.1.758758601.1726203726&semt=ais_hybrid'
  //   },
  //   {
  //     id: '2',
  //     name: 'Nishar',
  //     photo: 'https://img.freepik.com/free-photo/young-businessman-wearing-glasses-white-suit-3d-rendering_1142-39061.jpg?size=626&ext=jpg&ga=GA1.1.758758601.1726203726&semt=ais_hybrid'
  //   }
  // ]


  constructor(private router: Router, private chatsService: ChatsService, private firestore: Firestore) {
    addIcons({ ellipsisVerticalOutline, add });
    this.users = this.getUsers()
  }

  ngOnInit() {
  }

  logout() {

    this.chatsService.auth.signout()
    this.router.navigateByUrl('/signin')
  }

  onSegmentChange(event: any) {
    this.segment = event.detail.value
  }

  newChat() {
    this.openNewChat = true
  }

  getUsers(): Observable<any[]> {
    const querySnapshot = getDocs(collection(this.firestore, "users"))
      .then(querySnapShot => {
        return querySnapShot.docs.map(doc => doc.data())
      })
    return from(querySnapshot)
  }

  cancel() {
    this.openNewChat = false
  }

  getChat(item: any) {
    this.router.navigate(['/chats', item.id])
  }
}
