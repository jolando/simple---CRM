import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';

import { User } from '../models/user.class';


@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user = new User();
  birthDate: Date;

  loading = false;

  constructor( public dialogRef: MatDialogRef<DialogAddUserComponent>, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log(this.user);
    this.loading = true;

    this.firestore
    .collection('users')
    .add(this.user.toJSON())
    .then((res: any) => {
      this.loading = false;
      console.log('adding user finished', res);
      this.dialogRef.close();
    })
  }

}
