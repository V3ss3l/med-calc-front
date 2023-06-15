import { Component } from '@angular/core';

@Component({
  selector: 'app-sofa-calc',
  templateUrl: './sofa-calc.component.html',
  styleUrls: ['./sofa-calc.component.css']
})
export class SofaCalcComponent {
  isChecked: boolean = true;
  sliderWord = "Креатинин";
  liverString = "Креатинин крови, мкмоль/л";

  SlideToggleClick() {
    if(this.isChecked){
      this.sliderWord = "Креатинин";
      this.liverString = "Креатинин крови, мкмоль/л";
    } else {
      this.sliderWord = "Диурез";
      this.liverString = "Суточный диурез, мл/сут";
    }
  }
}
