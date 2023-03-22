import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
export interface Titles {
  [key: number]: string;
}
export interface Price {
  [key: string]: number;
}
export interface Ref {
  [key: string]: string;
}
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent {
  total: any = {};
  totalPrice = 0;
  step = 2;
  periodicity = 0;
  titles: Titles = {
    1: 'Personal info ',
    2: 'Select your plan ',
    3: 'Pick add-ons ',
    4: 'Finishing up',
  };
  subtitles: Titles = {
    1: 'Please provide your name, email address, and phone number.',
    2: 'You have the option of monthly or yearly billing. ',
    3: 'Add-ons help enhance your gaming experience. ',
    4: 'Double-check everything looks OK before confirming.',
  };
  price: Price = {
    arcade: 9,
    advanced: 12,
    pro: 15,
  };
  addonPrices: Price = {
    online: 1,
    storage: 2,
    custom: 2,
  };

  addonRefs: Ref = {
    online: 'Online Service',
    custom: 'Custom Profile',
    storage: 'Larger Storage',
  };

  changePeriod() {
    {
      this.periodicity > 0 ? (this.periodicity = 0) : (this.periodicity = 1);
    }
  }
  back() {
    this.step = this.step - 1;
  }
  setName(form: NgForm) {
    if (
      form.value.name == '' ||
      form.value.email == '' ||
      form.value.phone == ''
    ) {
      return;
    }
    this.step = this.step + 1;
    console.log(form.value);
  }
  setPlan(plan: NgForm) {
    let cleanPlan = plan.value.plan;
    this.total.plan = cleanPlan;

    this.total.periodicity = this.periodicity;

    let finalPrice: number = 0;
    if (this.total.periodicity) finalPrice = this.price[this.total.plan];
    if (!this.total.periodicity) finalPrice = this.price[this.total.plan] * 10;
    this.total.price = finalPrice;
    this.totalPrice += finalPrice;

    if (cleanPlan) this.step = this.step + 1;
  }
  setAddons(addon: NgForm) {
    let finalAddons: any = [];
    if (addon.value.custom) {
      finalAddons.push('custom');
      {
        this.total.periodicity
          ? (this.totalPrice += this.addonPrices['custom'])
          : (this.totalPrice += this.addonPrices['custom'] * 10);
      }
    }
    if (addon.value.online) {
      finalAddons.push('online');
      {
        this.total.periodicity
          ? (this.totalPrice += this.addonPrices['online'])
          : (this.totalPrice += this.addonPrices['online'] * 10);
      }
    }
    if (addon.value.storage) {
      finalAddons.push('storage');
      {
        this.total.periodicity
          ? (this.totalPrice += this.addonPrices['storage'])
          : (this.totalPrice += this.addonPrices['storage'] * 10);
      }
    }

    this.total.addons = finalAddons;

    this.step = this.step + 1;
  }
  changePlan() {
    this.step = 2;
  }
  final() {
    this.step = 5;
  }
}
