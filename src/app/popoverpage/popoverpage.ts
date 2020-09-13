import { Router } from "@angular/router";
import { PopoverController } from "@ionic/angular";
import { CometChat } from "@cometchat-pro/cordova-ionic-chat";
import { Component } from "@angular/core";

@Component({
  template: `
    <ion-list>
      <ion-item (click)="logout()">
        <ion-label> Logout </ion-label>
      </ion-item>
    </ion-list>
  `,
})
export class PopoverPage {
  constructor(private router: Router, private popOverCtrl: PopoverController) {}

  async logout() {
    console.log("Logout called");
    await this.popOverCtrl.dismiss();
    CometChat.logout().then(
      () => {
        console.log("Logout completed successfully");
        this.router.navigate(["login"]);
      },
      (error) => {
        console.log("Logout failed with exception", { error });
      }
    );
  }
}
