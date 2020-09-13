import { Component, OnInit } from "@angular/core";
import {
  NavController,
  LoadingController,
  AlertController,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { CometChat } from "@cometchat-pro/cordova-ionic-chat";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  public userUID: string;
  public appID: string = "221712a7cb0c86f";
  public apiKey: string = "532f45c8053f85b9363245bff1d75c8040ee7115";
  public appRegion: string = "US";

  constructor(
    public navCtrl: NavController,
    private loadingContoller: LoadingController,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  async presentAlert(alertmessage: string) {
    const alert = await this.alertController.create({
      header: "Error",
      message: alertmessage,
      buttons: ["OK"],
    });

    await alert.present();
  }

  async onSubmit() {
    const loading = await this.loadingContoller.create({
      message: "Please wait",
      spinner: "dots",
      translucent: true,
    });
    loading.present();
    CometChat.init(
      this.appID,
      new CometChat.AppSettingsBuilder()
        .subscribePresenceForAllUsers()
        .setRegion(this.appRegion)
        .build()
    ).then(
      () => {
        console.log("Initialization completed successfully");

        CometChat.login(this.userUID, this.apiKey).then(
          (user) => {
            console.log("Login Successful:", { user });
            loading.dismiss();
            this.router.navigate(["/home"]);
            // User loged in successfully.
          },
          (error) => {
            loading.dismiss();
            this.presentAlert(error.message);
            // User login failed, check error and take appropriate action.
          }
        );
        // You can now call login function.
      },
      (error) => {
        console.log("Initialization failed with error:", error);
        this.presentAlert(error.message);
        // Check the reason for error and take apppropriate action.
      }
    );
  }
}
