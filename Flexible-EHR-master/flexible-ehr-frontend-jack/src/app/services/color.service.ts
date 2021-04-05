import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  public colors:string[] = [
    "lightgreen",
    "yellow",
    "white",
    "lightblue",
    "pink"
  ]

  constructor() { }
}
