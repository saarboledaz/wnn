import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AndroidPermissions } from '@ionic-native/android-permissions';

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

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,private socialSharing: SocialSharing, private androidPermissions: AndroidPermissions,private browserTab: BrowserTab) {

  }
  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('País');

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
    /*
    this.phoneNumber = this.countryCode + phone
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCEPT_HANDOVER)
    .then(
      result => console.log("Tiene los permisos"), 
      err => this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCEPT_HANDOVER,this.androidPermissions.PERMISSION.SEND_RESPOND_VIA_MESSAGE])
    );
    this.socialSharing.shareViaWhatsAppToReceiver(this.phoneNumber,"","","")
    .then(() => {
      console.log("Enviado!");
    }).catch(() => {
      console.log("Error");
    })*/
    var url = "https://api.whatsapp.com/send?phone="+this.countryCode+phone;
    this.browserTab.isAvailable()
    .then(isAvailable => {
      if (isAvailable) {
        
        this.browserTab.openUrl(url);
      } else {
        // open URL with InAppBrowser instead or SafariViewController
      }
    });
  }

}
