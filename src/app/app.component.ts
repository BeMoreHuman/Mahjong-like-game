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

  constructor(
    public gameService: GameServiceService,
  ) {}

  ngOnInit(): void {}

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
        setTimeout(() => {
          this.selectedCardIndex = null;
          this.isWaiting = false;
        }, 500);
      }
    }
  }

}
