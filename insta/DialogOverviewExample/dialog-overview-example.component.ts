import {Component, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {EventEmitter} from 'selenium-webdriver';

export interface DialogData {
  shareW: string;
  name: string;
}

@Component({
  selector: 'dialog-overview-example',
  templateUrl: './dialog-overview-example.component.html',
  // styleUrls: ['./modal.component.css']
})
export class DialogOverviewExampleComponent {

  shareW: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, shareW: this.shareW}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.shareW = result;
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
