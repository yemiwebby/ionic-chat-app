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
    console.log("Logging out");
    await this.popOverCtrl.dismiss();
    CometChat.logout().then(
      () => {
        console.log("User has been logged out successfully");
        this.router.navigate(["login"]);
      },
      (error) => {
        console.log("Logout failed with exception", { error });
      }
    );
  }
}
