import {
  Component,
  OnInit
} from '@angular/core';
import { GameServiceService } from './services/game-service.service';

export interface CardInterface {
  value: number;
  isEnabled: boolean;
  isDone: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Mahjong-like game';
  cardArray: CardInterface[] = [
    {value: 0, isEnabled: false, isDone: false},
    {value: 1, isEnabled: false, isDone: false},
    {value: 2, isEnabled: false, isDone: false},
    {value: 1, isEnabled: false, isDone: false},
    {value: 0, isEnabled: false, isDone: false},
    {value: 2, isEnabled: false, isDone: false},
  ];
  selectedCardIndex: number = null;
  isWaiting = false;
  isReadyToPlay = false;
  sec = 0;
  min = 0;
  hour = 0;
  playerGameTime = '00:00:00';
  timer: any;
  winScore = this.cardArray.length / 2;
  currentScore = 0;

  constructor(
    public gameService: GameServiceService,
  ) {}

  ngOnInit(): void {}

  startGame(): void {
    this.isReadyToPlay = true;
    this.timer = setInterval(() => {
      this.timeHandler();
    }, 1000);
  }

  endGame(): void {
    this.timer = clearInterval(this.timer);
  }

  giveUp(): void {
    this.isReadyToPlay = false;
    this.timer = clearInterval(this.timer);
    this.sec = 0;
    this.min = 0;
    this.hour = 0;
    this.playerGameTime = '00:00:00';
    this.cardArray.forEach(card => {
      card.isEnabled = false;
      card.isDone = false;
    });
    this.selectedCardIndex = null;
  }

  timeHandler(): void {
    this.sec++;

    if (this.sec === 60) {
      this.sec = 0;
      this.min++;
    }
    if (this.min === 60) {
      this.min = 0;
      this.hour++;
    }
    this.displayTime();
  }

  displayTime(): void {
    let sec_pretty: string = String(this.sec);
    let min_pretty: string = String(this.min);
    let hour_pretty: string = String(this.hour);

    if (this.sec < 10) {
      sec_pretty = '0' + this.sec;
    }
    if (this.min < 10) {
      min_pretty = '0' + this.min;
    }
    if (this.hour < 10) {
      hour_pretty = '0' + this.hour;
    }

    this.playerGameTime = hour_pretty + ':' + min_pretty + ':' + sec_pretty;
  }

  showCard(item: CardInterface, index: number): void {
    // Card already has pairs or double click
    if (item.isDone || index === this.selectedCardIndex) {
      return;
    }
    // First click
    if (!this.isWaiting && !this.selectedCardIndex) {
      this.isWaiting = true;
      item.isEnabled = true;
      this.selectedCardIndex = index;
      setTimeout(() => {
        this.isWaiting = false;
      }, 500);
    }
    // Second click
    if (!this.isWaiting && this.selectedCardIndex) {
      this.isWaiting = true;
      item.isEnabled = true;
      // Cards don't match
      if (item.value !== this.cardArray[this.selectedCardIndex - 1].value) {
        setTimeout(() => {
          this.cardArray[this.selectedCardIndex - 1].isEnabled = false;
          this.selectedCardIndex = null;
          item.isEnabled = false;
          this.isWaiting = false;
        }, 500);
      }
      // Cards match
      if (item.value === this.cardArray[this.selectedCardIndex - 1].value) {
        item.isDone = true;
        this.cardArray[this.selectedCardIndex - 1].isDone = true;
        // Check win score
        this.currentScore++;
        if (this.winScore === this.currentScore) {
          this.endGame();
        }
        setTimeout(() => {
          this.selectedCardIndex = null;
          this.isWaiting = false;
        }, 500);
      }
    }
  }

}
