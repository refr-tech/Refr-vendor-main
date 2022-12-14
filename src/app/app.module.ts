import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, BottomSheetUpdate } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';

import { BottomSheetNotification, TabsComponent } from './components/tabs/tabs.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WalletComponent } from './components/tabs/wallet/wallet.component';
import { ProfileComponent } from './components/tabs/profile/profile.component';
import { SignComponent } from './components/welcome/sign/sign.component';

import { DashboardComponent } from './components/tabs/dashboard/dashboard.component';
import { CampaignComponent } from './components/tabs/campaign/campaign.component';
import { InsightComponent } from './components/tabs/insight/insight.component';
import { CustomerComponent } from './components/tabs/customer/customer.component';
import { StoreCreateComponent } from './components/store-create/store-create.component';
import { BottomSheetOTP, NewStoreComponent } from './components/store-create/new-store/new-store.component';
import { NewLocationComponent } from './components/store-create/new-location/new-location.component';
import { NewCampaignComponent } from './components/store-create/new-campaign/new-campaign.component';
import { FundWalletComponent } from './components/store-create/fund-wallet/fund-wallet.component';
import { AddProductComponent } from './components/store-create/add-product/add-product.component';
import { PayComponent } from './components/pay/pay.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ListOrderComponent } from './components/tabs/list-order/list-order.component';
import { ListProductComponent } from './components/tabs/list-product/list-product.component';
import { AddBalanceComponent } from './components/tabs/wallet/add-balance/add-balance.component';

import { provideFirebaseApp, getApp, initializeApp, FirebaseApp } from '@angular/fire/app';
import { provideAuth, initializeAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore, enableIndexedDbPersistence, connectFirestoreEmulator } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';

import { indexedDBLocalPersistence, browserPopupRedirectResolver } from 'firebase/auth';

import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
// 1. Import the libs you need
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import {
//   getAuth,
//   indexedDBLocalPersistence,
//   initializeAuth,
//   provideAuth,
// } from '@angular/fire/auth';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { GoogleMapsModule } from '@angular/google-maps';
import { ImageCropperModule } from 'ngx-image-cropper';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { ContentComponent } from './placeholders/content/content.component';
import { CropperComponent } from './placeholders/cropper/cropper.component';
import { UploadProductComponent } from './components/tabs/list-product/upload-product/upload-product.component';
import { OrdrPlacedComponent } from './components/store-create/ordr-placed/ordr-placed.component';
import { PlanBalanceComponent } from './components/tabs/wallet/plan-balance/plan-balance.component';
import { ShareAdvocacyComponent } from './components/tabs/dashboard/share-advocacy/share-advocacy.component';
import { ShareLoyaltyComponent } from './components/tabs/dashboard/share-loyalty/share-loyalty.component';
import { OrdrShipComponent } from './components/tabs/list-order/ordr-ship/ordr-ship.component';
import { OrdrTrackComponent } from './components/tabs/list-order/ordr-track/ordr-track.component';
import { NewCustomerComponent } from './components/tabs/customer/new-customer/new-customer.component';

// import { Capacitor } from '@capacitor/core';
// import { getApp } from '@firebase/app';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent, BottomSheetNotification,
    WelcomeComponent, BottomSheetUpdate,
    WalletComponent,
    ProfileComponent,
    SignComponent,
    DashboardComponent,
    CampaignComponent,
    InsightComponent,
    ContentComponent,
    CustomerComponent,
    StoreCreateComponent,
    CropperComponent,
    NewStoreComponent, BottomSheetOTP, NewLocationComponent, NewCampaignComponent, FundWalletComponent, AddProductComponent, PayComponent, ListOrderComponent, ListProductComponent, 
    AddBalanceComponent, UploadProductComponent, OrdrPlacedComponent, PlanBalanceComponent, ShareAdvocacyComponent, ShareLoyaltyComponent, OrdrShipComponent, OrdrTrackComponent, NewCustomerComponent,
  ],
  imports: [
    BrowserModule, CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule, HttpClientJsonpModule,

    FormsModule, ReactiveFormsModule,

    MatToolbarModule, MatButtonModule, MatIconModule,
    MatDialogModule, MatBottomSheetModule,
    MatSnackBarModule, 
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatTooltipModule, MatMenuModule,MatTabsModule,MatListModule,
    MatTableModule,MatPaginatorModule, 
    MatStepperModule, MatAutocompleteModule,MatSlideToggleModule,MatSidenavModule,
    MatDatepickerModule, MatNativeDateModule,

    // 3. Initialize
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    //provideFirestore(() => getFirestore()),
    provideFirestore(() => {
      const firestore = getFirestore();
      //connectFirestoreEmulator(firestore, 'localhost', 8080);
      enableIndexedDbPersistence(firestore);
      return firestore;
    }),
    provideAuth(() => initializeAuth(getApp(), { 
      persistence: indexedDBLocalPersistence,
      popupRedirectResolver: browserPopupRedirectResolver,
    })),
    provideStorage(() => getStorage()),
    provideMessaging (() => getMessaging()),

    // 3. Initialize
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule, // firestore
    // AngularFireAuthModule, // auth
    // AngularFireStorageModule, // storage

    // provideAuth(() => {
    //   if (Capacitor.isNativePlatform()) {
    //     return initializeAuth(getApp(), {
    //       persistence: indexedDBLocalPersistence,
    //     });
    //   } else {
    //     return getAuth();
    //   }
    // }),

    Ng2GoogleChartsModule, GoogleMapsModule, ImageCropperModule, 
    
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    SocialSharing, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
