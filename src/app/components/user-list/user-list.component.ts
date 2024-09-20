import { Component, Input, OnInit } from '@angular/core';
import { IonAvatar, IonItem, IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonAvatar]
})
export class UserListComponent implements OnInit {

  @Input() item: any
  constructor() {
    // console.log("users", this.item)
  }

  ngOnInit() { }

}
