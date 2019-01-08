import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  animations: [
    trigger('rotate', [
      state('edge', style({
        backgroundColor: '#ce2635',
        borderRadius: '0px',
        transform: 'rotateZ(360deg)',
        opacity: .9
      })),
      state('round', style({
        backgroundColor: '#0b51c3',
        borderRadius: '40%',
        transform: 'rotateZ(-360deg)',
        opacity: 1
      })),
      state('onkl', style({
        transform: 'scale(10)',
        opacity: 0
      })),
      transition('edge => round', [
        animate('0.8s')
      ]),
      transition('round => edge', [
        animate('1.2s')
      ]),
      transition('* => onkl', [
        animate('3s')
      ]),
    ]),
    trigger('zoom', [
      state('normal', style( {
        transform: 'scale(1)',
        opacity: 1
      })),
      state('scale', style( {
        transform: 'scale(10)',
        opacity: 0
      })),
      transition('normal => scale', [
        animate('4s')
      ]),
      transition('scale => normal', [
        animate('0s')
      ])
    ]),
    trigger('loader', [
      state('right', style( {
        transform: 'translateX(2222px)',
      })),
      state('left', style( {
        transform: 'translateX(1%)',
      })),
      transition('right => left', [
        animate('0s')
      ]),
      transition('left => right', [
        animate('1s')
      ])
    ])
  ]
})
export class NotFoundComponent implements OnInit {

  status: string;
  zoom: string;
  load: string;

  constructor() { }

  ngOnInit() {
  }

  changeStatus() {
    if (this.status === 'edge') {
      this.status = 'round';
    } else {
      this.status = 'edge';
    }
  }

  changeLoad() {
    if (this.load === 'right') {
      this.load = 'left';
    } else {
      this.load = 'right';
    }
  }
}
