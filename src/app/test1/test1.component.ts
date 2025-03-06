import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test1',
  imports: [],
  templateUrl: './test1.component.html',
  styleUrl: './test1.component.scss'
})
export class Test1Component implements OnInit {
  constructor(private testService: TestService) { }

  greeting = "";


  ngOnInit(): void {
    this.testService.getGreeting().subscribe((data: any) => {
      this.greeting = data.message;
      console.log(data);
    });
  }
}
