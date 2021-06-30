import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from './app.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { IWalletInfo } from './interfaces/wallet-info.interface';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { IBlock } from './interfaces/block.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddPeerDialogComponent } from './components/add-peer-dialog/add-peer-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'naivecoin-app';

  address: string;
  amount: number;
  txOnly: boolean;
  balance: number;
  myaddress: string;
  miningInProgress: boolean;
  lastBlock: IBlock;
  peer: string;

  myWebSocket: WebSocketSubject<any> = webSocket('ws://localhost:8080/ws');

  constructor(private appService: AppService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
    this.myWebSocket.subscribe(
      data => {
        if ("Code" in (data as any) && "Data" in (data as any)) {
          this.handleServerMessage(data);
        }
        else {
          console.log(data);
        }
      },
      // Called whenever there is a message from the server
      err => console.log(err),
      // Called if WebSocket API signals some kind of error
      () => console.log('complete')
      // Called when connection is closed (for whatever reason)
    );
  }

  handleServerMessage(data: any) {
    switch (data.Code) {
      case "WALLET_INFO":
        let walletInfo = <IWalletInfo>data.Data;
        console.log(walletInfo);
        this.myaddress = walletInfo.Address;
        this.balance = walletInfo.Balance;
        break;
    }
  }

  ngOnInit() {
  }

  sendCoins() {
    if (this.txOnly) {
      this.sendTx();
      return;
    }
    this.appService.sendCoins(this.address, this.amount).subscribe(block => {
      console.log(block);
      this.lastBlock = block;
    }, error => {
      this._snackBar.open(error, '', { duration: 3000 });
    });
    this.clear();
  }

  sendTx() {
    this.appService.sendTx(this.address, this.amount).subscribe(tx => {
      console.log(tx);
    }, error => {
      this._snackBar.open(error, '', { duration: 3000 });
    });
    this.clear();
  }

  clearAddress() {
    this.address = null;
  }

  clearAmount() {
    this.amount = null;
  }

  clear() {
    this.clearAddress();
    this.clearAmount();
  }

  copyAddress() {
    const el = document.createElement('textarea');
    el.value = this.myaddress;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  mineNextBlock() {
    this.miningInProgress = true;
    this.appService.mineNextBlock().subscribe(block => {
      this.miningInProgress = false;
      this.lastBlock = block;
      console.log(block);
    }, error => {
      this.miningInProgress = false;
      this._snackBar.open(error, '', { duration: 3000 });
    });
  }

  onChange($event: MatSlideToggleChange) {
    this.txOnly = $event.checked;
  }

  getLastBlock() {
    this.appService.getLastBlock().subscribe(block => {
      this.lastBlock = block;
      console.log(block);
    }, error => {
      this._snackBar.open(error, '', { duration: 3000 });
    });
  }

  addPeer() {
    const dialogRef = this.dialog.open(AddPeerDialogComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(peerAddr => {
      if(!peerAddr)
        return
      this.appService.addPeer(peerAddr).subscribe(status => {
        this._snackBar.open(status, '', { duration: 3000 });
      }, error => {
        this._snackBar.open(error, '', { duration: 3000 });
      });
    });
  }
}