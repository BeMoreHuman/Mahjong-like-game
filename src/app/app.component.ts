import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'mahjong-game';
  gameField: number[] = [];
  prevValue = 0;
  currentValue = 0;
  exceptionNumbers: number[] = [];
  rememberTime = 3000;
  clickedCard: HTMLDivElement;
  attempt = 0;

  constructor(){}

  ngOnInit(): void {
    // const userSelect = Number(prompt('Select game field size:', '6'));
    //
    // if (!userSelect) {
    //   alert('Pls reload the page and select game field...');
    // }

    this.initGame();
  }

  ngAfterViewInit(): void {
    // show numbers for user
    // this.showField();
  }

  initGame(): void {
    const field = this.generateField(18);
    this.gameField = this.shuffleArray(field.concat(field));
  }

  /**
   * Shuffles array in place. ES6 version
   * @param {Array of number} arr items An array containing the items.
   */
  shuffleArray(arr: number[]): number[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  generateField(fieldSize: number): number[] {
    const result: number[] = [];
    for (let i = 0; i < fieldSize; i++) {
      result.push(this.randomIntFromInterval());
    }
    return result;
  }

  randomIntFromInterval(min: number = 1, max: number = 99): number { // min and max included
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (this.exceptionNumbers.length === 0) {
      this.exceptionNumbers.push(num);
      return num;
    }
    if (this.exceptionNumbers.includes(num)) {
      return this.randomIntFromInterval(min, max);
    } else {
      this.exceptionNumbers.push(num);
      return num;
    }
  }

  selectCard(event: MouseEvent, number: number): void {
    this.attempt++;
    const card = event.target as HTMLDivElement;
    this.currentValue = number;
    if (this.checkPair() && !(this.clickedCard === card) && (this.attempt === 2)) {
      this.prevValue = 0;
      this.attempt = 0;
      // show pair
      const pairs = Array.prototype.slice.call(document.querySelectorAll(`.mahjong__card[data-index='${number}']`));
      pairs.forEach(card => {
        card.classList.add('mahjong__card--pair');
      });
    } else {
      this.prevValue = number;
      this.clickedCard = card;
      card.classList.add('mahjong__card--active');
      if (this.attempt === 2) {
        this.attempt = 0;
        setTimeout(() => {
          this.hideNumber();
        }, 500);
      }
    }

  }

  hideNumber(): void {
    const numbers = Array.prototype.slice.call(document.querySelectorAll('.mahjong__card--active'));
    numbers.forEach(card => {
      card.classList.remove('mahjong__card--active');
    });
  }

  showField(): void {
    const cards = Array.prototype.slice.call(document.querySelectorAll('.mahjong__card'));
    cards.forEach(card => {
      card.classList.add('mahjong__card--active');
      setTimeout(() => {
        card.classList.remove('mahjong__card--active');
      }, this.rememberTime);
    });
  }

  checkPair(): boolean {
    return this.currentValue === this.prevValue;
  }
}
