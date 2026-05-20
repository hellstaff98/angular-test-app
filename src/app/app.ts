import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

type TITLE_OPTIONS = "Hello" | "Hi";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {


  protected readonly title = signal<TITLE_OPTIONS>("Hello");

  handleChangeTitle() {
    this.title.set(this.title() === "Hello" ? "Hi" : "Hello");
  }

}
