import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagerComponent } from './components/pager/pager.component';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { SelectInputComponent } from './components/select-input/select-input.component';


@NgModule({
  declarations: [
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
    BasketSummaryComponent,
    PagerComponent,
    PagingHeaderComponent,
    SelectInputComponent,
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    CdkStepperModule,
    RouterModule,
  ],
  exports:[
    PaginationModule,
    OrderTotalsComponent,
    CarouselModule,
    ReactiveFormsModule,
    FormsModule,
    TextInputComponent,
    BsDropdownModule,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent,
    PagerComponent,
    PagingHeaderComponent,
    SelectInputComponent,
  ]
})
export class SharedModule { }
