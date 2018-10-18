import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
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
  phoneNumber;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private http: HTTP/*, private socialSharing: SocialSharing*/) {

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

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add number',
      message: "Type the phone number to start the conversation",
      inputs: [
        {
          name: 'number',
          placeholder: this.countryCode + '3206765879'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log("Cancelled");
          }
        },
        {
          text: 'Send',
          handler: data => {
            this.phoneNumber = this.countryCode + data;
            this.http.get('https://api.whatsapp.com/send?', {phone: this.phoneNumber}, {})
              .then(data => {

                console.log(data.status);
                console.log(data.data); 
                console.log(data.headers);

              })
              .catch(error => {

                console.log(error.status);
                console.log(error.error);
                console.log(error.headers);

              });
            console.log('Sent');
          }
        }
      ]
    });
    prompt.present();
  }


}
