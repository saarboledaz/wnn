import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/*import { SocialSharing } from '@ionic-native/social-sharing';*/

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  testRadioOpen: boolean;
  testRadioResult;
  countryCodes = {
    "Colombia": '57',
    "Argentina": '54',
    "Bolivia": '591',
    "Chile": '56'
  };
  countryCode = '57';
  phoneNumber: string = "";

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private http: HTTP,private iab: InAppBrowser/*, private socialSharing: SocialSharing*/) {

  }
  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Country');

    alert.addInput({
      type: 'radio',
      label: 'Colombia',
      value: 'Colombia',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Argentina',
      value: 'Argentina',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Bolivia',
      value: 'Bolivia',
      checked: false
    });
    alert.addInput({
      type: 'radio',
      label: 'Chile',
      value: 'Chile',
      checked: false
    });


    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        this.countryCode = this.countryCodes[this.testRadioResult];
      }
    });
    alert.present().then(() => {
      this.testRadioOpen = true;
    });


  }
  sendMessage(phone: string){
    this.phoneNumber = this.countryCode + phone
    let url = 'https://api.whatsapp.com/send?phone='+ this.phoneNumber;
    let browser = this.iab.create(url);
    browser.show();
  }

}
