import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-peer-dialog',
  templateUrl: './add-peer-dialog.component.html',
  styleUrls: ['./add-peer-dialog.component.css']
})
export class AddPeerDialogComponent implements OnInit {
  addr: string;

  constructor(public dialogRef: MatDialogRef<AddPeerDialogComponent>) { }

  ngOnInit(): void {
  }

  addPeer(): void {
    if (!this.addr)
      return
    this.dialogRef.close(this.addr);
  }

  close(): void{
    this.dialogRef.close(null);
  }
}
