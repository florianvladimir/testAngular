import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-detail-photo',
  templateUrl: './detail-photo.component.html',
  styleUrls: ['./detail-photo.component.css']
})
export class DetailPhotoComponent implements OnInit {
   constructor() {
  }

  panelOpenState = false;

  @Input()
  id: string;

  ngOnInit() {
  }
}
