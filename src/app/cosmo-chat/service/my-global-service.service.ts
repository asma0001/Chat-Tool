import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyGlobalService {
  isDarkMode: boolean = true;

  constructor() {
    this.setDarkModeClass();
  }
  toggleDarkMode(): void {
    console.log(this.isDarkMode)
    this.isDarkMode = !this.isDarkMode;
    this.setDarkModeClass()
  }
  private setDarkModeClass() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
