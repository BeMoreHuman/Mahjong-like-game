import { Injectable } from '@angular/core';

export interface MemoryCard {
  value: number;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  mockData: MemoryCard[] = [
    { value: 0, isActive: false },
    { value: 1, isActive: false },
    { value: 2, isActive: false },
    { value: 3, isActive: false },
    { value: 3, isActive: false },
    { value: 2, isActive: false },
    { value: 1, isActive: false },
    { value: 0, isActive: false },
  ];

  constructor() { }
}
