import {
  Component,
  ElementRef,
  OnInit,
  VERSION,
  ViewChild,
} from '@angular/core';
import {
  filter,
  interval,
  last,
  map,
  Observable,
  switchMap,
  takeWhile,
} from 'rxjs';
import { takeLast, tap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('gameGround') gameGround: ElementRef;
  @ViewChild('invader1') invader1: ElementRef;
  name = 'Angular ' + VERSION.major;
  top = 0;
  gameSpeed = 100;
  invadersSpeed = 5;

  gameActions$: Observable<number>;
  countDown$: Observable<number>;

  initialCountDown = 1;
  countDown: number;

  constructor() {
    this.countDown$ = interval(1000).pipe(
      map((r) => this.initialCountDown - r),
      tap((r) => (this.countDown = r)),
      takeWhile((r) => r >= 0),
      filter((r) => r === 0),
      tap((_) => this.initGame()),
      tap(console.log)
    );
    this.gameActions$ = this.countDown$.pipe(
      switchMap((countDown) => this.gameLoop())
    );

    this.gameActions$.subscribe();
  }

  ngOnInit() {}

  initGame() {
    this.countDown = this.initialCountDown;
    this.top = 0;
  }

  gameLoop() {
    return interval(this.gameSpeed).pipe(
      tap((_) => (this.top += this.invadersSpeed)),
      takeWhile(
        (_) =>
          this.top + this.invader1.nativeElement.clientHeight <
          this.gameGround.nativeElement.clientHeight
      ),
      last(),
      tap((_) => alert('You loooooose')),
      map((_) => 0)
    );
  }
}
