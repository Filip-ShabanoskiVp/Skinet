import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
  providers:[{provide: CdkStepper, useExisting: StepperComponent}]
})
export class StepperComponent extends CdkStepper{

  @Input() linearModelSelected = true;

  onClick(index:number){
    this.selectedIndex = index;
  }

}
