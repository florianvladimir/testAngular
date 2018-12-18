import {Component, ElementRef, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DialogOverviewExampleComponent} from './DialogOverviewExample/dialog-overview-example.component';
// @ts-ignore
import EXIF = require('../../../../node_modules/exif-js/exif');

@Component({
  selector: 'app-insta',
  templateUrl: './insta.component.html',
  styleUrls: ['./insta.component.css'],
  animations: [
    trigger('photoState', [
      state('move', style({
        transform: 'translateX(-100%)',
      })),
      state('enlarge', style({
        transform: 'scale(1.4)',
      })),
      state('spin', style({
        transform: 'rotateY(180deg) rotateZ(90deg)',
      })),
      transition('* => *', animate(1000))
    ]),
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        // transform: 'translateY(0) scale(1)'
        transform: 'scale(1.0)'
      })),
      state('hide',   style({
        opacity: 0,
        // transform: 'translateX(-100%) scale(0.8)'
        // transform: 'translateY(100%) scale(0.2)',
        transform: 'scale(0)'
      })),
      transition('show => hide', animate('1s ease-out')),
      transition('hide => show', animate('1s cubic-bezier(0.18, 0.89, 0.32, 1)')),
    ])
  ]
})
export class InstaComponent implements OnInit {

  constructor(public element: ElementRef) {}

  @ViewChild(DialogOverviewExampleComponent) child: DialogOverviewExampleComponent;

  state = 'hide';
  position: null;
  private photoInfo: PhotoInfoInterface[] = [];
  model: string;
  make: string;

  @Input()
  public url: String;

  @Input()
  public detail: boolean;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.element.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;

    if (scrollPosition >= componentPosition - windowHeight + 300) {
      this.state = 'show';
    } else {
      this.state = 'hide';
    }

  }

  ngOnInit() {
    const componentPosition = this.element.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;

    if (scrollPosition >= componentPosition - 110) {
      this.state = 'show';
    } else {
      this.state = 'hide';
    }
  }

  changePosition(t) {
    this.position = t;
    console.log(t);
    if (t === 'spin') {
      this.child.openDialog();
    }
  }
  getExif() {
    if (this.detail) {
      // let m;
      // let model;
      const img2 = document.getElementById(this.url + '');
      EXIF.getData(img2, function() {
        console.log(EXIF.getAllTags(this));
        const model = EXIF.pretty(this);
        console.log(this.id.split('/')[2]);
        const allMetaDataSpan = document.getElementById('acc' + this.id);
        allMetaDataSpan.innerHTML = model;
        console.log(this);
        return 'Hallo';
      });
      // this.photoInfo.push({key: 'Make', value: this.make});
      // this.photoInfo.push({key: 'Model', value: this.model});
    }
  }

}

export class PhotoInfoInterface {
  key: string;
  value: string;
}
