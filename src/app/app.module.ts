import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ExchangeuiComponent } from './exchangeui/exchangeui.component';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HelpComponent } from './help/help.component';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { ProfileComponent } from './profile/profile.component';
import { LoadingSpinnerComponent } from './item/ui/loading-spinner/loading-spinner.component';
import { AuthService } from './services/auth.service';
import { ReversePipe } from './item/pipe/reverse/reverse.pipe';
import { ToastMessageComponent } from './toast-message/toast-message.component';
import { CheckComponent } from './check/check.component';
import { UserComponent } from './user/user.component';
import { TransactionComponent } from './transaction/transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ExchangeuiComponent,
    LoginComponent,
    HelpComponent,
    ProfileComponent,
    LoadingSpinnerComponent,
    ReversePipe,
    ToastMessageComponent,
    CheckComponent,
    UserComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [LoginComponent, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
