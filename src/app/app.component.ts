import {
  Component,
  OnInit
} from '@angular/core';

interface cardInterface {
  value: number;
  isEnabled: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Mahjong-like game';
  cardArray: cardInterface[] = [
    {value: 0, isEnabled: false},
    {value: 1, isEnabled: false},
    {value: 2, isEnabled: false},
    {value: 3, isEnabled: false},
    {value: 4, isEnabled: false},
    {value: 5, isEnabled: false},
  ];

  constructor() {}

  ngOnInit(): void {}

  showCard(item: cardInterface): void {
    item.isEnabled = !item.isEnabled;
  }

}
