import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Observable, of, take } from 'rxjs';
import { CropperComponent } from 'src/app/placeholders/cropper/cropper.component';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Hype, Shop } from 'src/app/universal.model';

export class PhoneNumber {
  country: string ="91";
  iso: string ="IND";
  coin: string ="INR";
  digits: number = 10;
  area: string ="";
  prefix: string ="";
  line: string ="";
  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  storeID = "";
  storeName = "";
  storeLogo = "";
  storeBanner = "";
  storeBannersActive = "";
  storeBannersList: string[] = [];
  store$: Observable<any> = of();
  dataCurrent:any;
  typeORDER:any = null;
  listLoc:any[] = [];
  makingChanges = true;

  storeLoc = {
    storeType:"", 
    /*
    nationISO: "IND",
    stateISO: "",
    storeName:"", 
    fullname:"",//mine.name
    phone:"", // mine.phone ? mine.phone.split('+91')[1] : ''
    email:"",// mine.email
    storeCat:"", 
    storeSubCat:"", 
    locAddress: "",
    locSearch:"",
    loc:{},
    postal_code:"",
    locality:"",
    administrative_area_level_2:"",
    administrative_area_level_1:"",
    point_of_interest:"",
    by:"",
    */
    opensDaily: true, opensDailyS:"07:00", opensDailyE:"23:00",
    openMon: true, openMonS:"07:00", openMonE:"23:00",
    openTue: true, openTueS:"07:00", openTueE:"23:00",
    openWed: true, openWedS:"07:00", openWedE:"23:00",
    openThu: true, openThuS:"07:00", openThuE:"23:00",
    openFri: true, openFriS:"07:00", openFriE:"23:00",
    openSat: true, openSatS:"07:00", openSatE:"23:00",
    openSun: false, openSunS:"07:00", openSunE:"23:00",
    openBreak: false, openBreakS:"11:00", openBreakE:"15:00",

    delivery: "Citywide", logistics:false, 
    exchange: true, 
    return: true, 
    refund: true, 
    phoneHide: true, 
    COD: true,

    storeCat:"",
    storeSubCat:""
  }




  userExist = true; userCheck = false;

  phoneNumber = new PhoneNumber();
  phoneNumFull:string = "";
  verificationCode:string = "";
  step = 0;
  
  disableLoc = true;
  imageLOADED: string[] = [];

  viewPrimeUser = false;

  // qrCodePOS:any = null;
  // qrCodeInvoice:any = null;
  // qrCodeSubs:any = null;

  // showCode1 = false;
  // showCode2 = false;
  // showCode3 = false;
  
  // @ViewChild('canvasX1', { static: false }) canvasX1: ElementRef | undefined;
  // @ViewChild('canvasX2', { static: false }) canvasX2: ElementRef | undefined;
  // @ViewChild('canvasX3', { static: false }) canvasX3: ElementRef | undefined;
  
  constructor(
    public themeService: ThemeService,
    public auth: AuthService
  ) { }


  ngOnInit(): void {
    this.auth.user$.pipe(take(1)).subscribe(user => {
      const data = {
        //false, user.username, 
        name: user.name || "",

        soFB:user.soFB, 
        soIG:user.soIG, soYT:user.soYT, soTW:user.soTW, soWA:user.soWA,
        //user.info, user.url, user.typ, user.sex, user.stat, user.check, 
        uid: user.uid, iso: user.iso || "",
        phoneNumFull: user.phone.split("+91")[1] || ""
      }
      this.changeAbout(data)
      

    })
  }

  onloadIMG(url:string){
    this.imageLOADED.push(url);
  }

  updateTiming(){
    this.makingChanges = true;
    const data = {
      opensDaily: this.storeLoc.opensDaily, opensDailyS:this.storeLoc.opensDailyS, opensDailyE:this.storeLoc.opensDailyE,
      openMon: this.storeLoc.openMon, openMonS:this.storeLoc.openMonS, openMonE:this.storeLoc.openMonE,
      openTue: this.storeLoc.openTue, openTueS:this.storeLoc.openTueS, openTueE:this.storeLoc.openTueE,
      openWed: this.storeLoc.openWed, openWedS:this.storeLoc.openWedS, openWedE:this.storeLoc.openWedE,
      openThu: this.storeLoc.openThu, openThuS:this.storeLoc.openThuS, openThuE:this.storeLoc.openThuE,
      openFri: this.storeLoc.openFri, openFriS:this.storeLoc.openFriS, openFriE:this.storeLoc.openFriE,
      openSat: this.storeLoc.openSat, openSatS:this.storeLoc.openSatS, openSatE:this.storeLoc.openSatE,
      openSun: this.storeLoc.openSun, openSunS:this.storeLoc.openSunS, openSunE:this.storeLoc.openSunE,
      openBreak: (this.storeLoc.openBreak ? true : false), 
      openBreakS: (this.storeLoc.openBreakS ? this.storeLoc.openBreakS : "11:00"), 
      openBreakE: (this.storeLoc.openBreakE ? this.storeLoc.openBreakE : "15:00"),
    }

    this.auth.changeTimeData(this.storeID, data).then(() => {
      this.makingChanges = false;
    }).catch(err => {
      this.makingChanges = false;
      this.auth.resource.startSnackBar("Issue: " + err)
      })

  }

  setUpTime(type:string, t:any){
    console.log(type, t)
    if(type == 'from'){
      this.storeLoc.openMonS = t;
      this.storeLoc.openTueS = t;
      this.storeLoc.openWedS = t;
      this.storeLoc.openThuS = t;
      this.storeLoc.openFriS = t;
      this.storeLoc.openSatS = t;
      this.storeLoc.openSunS = t;
    }
    if(type == 'until'){
      this.storeLoc.openMonE = t;
      this.storeLoc.openTueE = t;
      this.storeLoc.openWedE = t;
      this.storeLoc.openThuE = t;
      this.storeLoc.openFriE = t;
      this.storeLoc.openSatE = t;
      this.storeLoc.openSunE = t;
    }
  }

  updateOrdr(type:string, current:any, val:any){
    this.makingChanges = true;
    console.log(type, current, val)
    this.typeORDER[type] = val;

    this.auth.updateStoreOrdr(this.storeID, this.typeORDER).then(() => {

    if(type == 'delivery'){
    this.storeLoc.delivery = val;
    }
    if(type == 'logistics'){
    this.storeLoc.logistics = val;
    }

    if(type == 'exchange'){
    this.storeLoc.exchange = val;
    }
    if(type == 'refund'){
    this.storeLoc.refund = val;
    }
    if(type == 'phoneHide'){
    this.storeLoc.phoneHide = val;
    }
    if(type == 'return'){
    this.storeLoc.return = val;
    }

    if(type == 'COD'){
    this.storeLoc.COD = val;
    }

    this.makingChanges = false;
    }).catch(err => {
    this.makingChanges = false;
    this.typeORDER[type] = current;
    this.auth.resource.startSnackBar("Issue: " + err)
    })



    // const xLoc = store.schedule;
    // xLoc["delivery"] = store.typeORDER.delivery; xLoc["logistics"] = store.typeORDER.logistics;
    // xLoc["exchange"] = store.typeORDER.exchange; xLoc["refund"] = store.typeORDER.refund; xLoc["return"] = store.typeORDER.return;
    // xLoc["COD"] = store.typeORDER.COD;
  }


  setContactNumber(){
    console.log(this.phoneNumFull)
    // if(!know){
    //   this.phoneNumber.area = "";
    //   this.phoneNumber.prefix = "";
    //   this.phoneNumber.line = "";
    // }else{
      this.phoneNumber.area = this.phoneNumFull.slice(0,3);
      this.phoneNumber.prefix = this.phoneNumFull.slice(3,6);
      this.phoneNumber.line = this.phoneNumFull.slice(6,this.phoneNumber.digits);
    //}
  }

  // getX(x:any){
  //   return x
  // }

  changeAbout(data:any): void{
    this.dataCurrent = data;
      this.auth.resource.first.setValue( data.name );
      //this.auth.resource.first.setValue( data.name.split(' ')[0] );
      //this.auth.resource.last.setValue( data.name.split(' ')[1] || "");
      if(data.phoneNumFull){
        this.phoneNumFull = data.phoneNumFull;
        this.setContactNumber();
      }
      this.auth.getMyStore(data.uid).pipe(take(1)).subscribe((store:any[]) => {
        if(!store || !store[0] || !store[0].id){
          // Retry

        }else{
          this.auth.resource.last.setValue( store[0].name );

          this.storeID = store[0].id;
          this.storeName = store[0].name;
          this.storeLogo = store[0].logo;
          this.storeBanner = store[0].banner;

          if(store[0].banner.length > 0){
            this.storeBannersList = store[0].banners;
            this.storeBannersActive = store[0].banners[0];
          }

          this.listLoc = store[0].loc;
          const xLoc = store[0].schedule;
          
          xLoc["logistics"] = store[0].typeORDER.logistics;
          if(!xLoc["logistics"]["openBreak"]){
          xLoc["logistics"]["openBreak"] = false;
          xLoc["logistics"]["openBreakS"] = "11:00"; 
          xLoc["logistics"]["openBreakE"] = "15:00";
          }

          xLoc["delivery"] = store[0].typeORDER.delivery; 
          xLoc["exchange"] = store[0].typeORDER.exchange; xLoc["refund"] = store[0].typeORDER.refund; xLoc["return"] = store[0].typeORDER.return;

          xLoc["phoneHide"] = store[0].typeORDER.phoneHide || false;

          xLoc["COD"] = store[0].typeORDER.COD;
          xLoc["storeType"] = store[0].type;
          xLoc["storeCat"] = store[0].cat;
          xLoc["storeSubCat"] = store[0].subCat;

          this.storeLoc = xLoc;
          this.typeORDER = store[0].typeORDER;


          this.store$ = of(store[0])

          /*
          opensDaily: true, opensDailyS:"07:00", opensDailyE:"23:00",
          openMon: true, openMonS:"07:00", openMonE:"23:00",
          openTue: true, openTueS:"07:00", openTueE:"23:00",
          openWed: true, openWedS:"07:00", openWedE:"23:00",
          openThu: true, openThuS:"07:00", openThuE:"23:00",
          openFri: true, openFriS:"07:00", openFriE:"23:00",
          openSat: true, openSatS:"07:00", openSatE:"23:00",
          openSun: false, openSunS:"07:00", openSunE:"23:00",
          delivery: "Citywide", logistics:false, exchange: true, COD: true,
          */
        }
      })
      this.makingChanges = false;
  }

  async takePicture(type:string){
    if(!this.makingChanges){
      const image = await Camera.getPhoto({
        quality: 100,
        height: 300,
        width: 300,
        allowEditing: false,
        //source:CameraSource.Camera,
        resultType: CameraResultType.Uri
      });
      console.log("image", image)
      const imageUrl = image.webPath || "";
      if(imageUrl){
      this.startCropper(imageUrl, type);
      console.log("image", imageUrl)
      }else{
        console.log("No image")
      }
    }
  }

  startCropper(webPath:string, type:string){
    if(!this.makingChanges){
      let isPhone = this.auth.resource.getWidth < 768;
      let w = isPhone ? this.auth.resource.getWidth + "px" : "480px";
      let h = isPhone ? this.auth.resource.getHeight + "px" : "";
      const refDialog = this.auth.resource.dialog.open(CropperComponent, {
        width: w, minWidth: "320px", maxWidth: "480px",
        height:h,
        data:{webPath:webPath, type:type},
        disableClose: true, panelClass:"dialogLayout"//, autoFocus:false
      });
      refDialog.afterClosed().subscribe(result =>{
        console.log("cropper closed")
        if(!result.success){
          if(result.info){
            console.log(result.info);
            this.auth.resource.startSnackBar(result.info)
          }
        }else{

          if(type == "logo"){
            this.auth.updateStoreLogo(this.storeID, result.croppedImage ).then(ref => {
              if(!ref || !ref.success){
                this.auth.resource.startSnackBar("Upload Failed!");
                this.makingChanges = false;
              }else{
                this.storeLogo = ref.url;
                this.auth.resource.startSnackBar("Logo Update Under Review!");
                this.makingChanges = false;
              }
            });
          }

          if(type == "banner"){
            this.auth.updateStoreBanner(this.storeID, result.croppedImage ).then(ref => {
              if(!ref || !ref.success){
                this.auth.resource.startSnackBar("Upload Failed!");
                this.makingChanges = false;
              }else{
                this.storeBanner = ref.url;
                this.auth.resource.startSnackBar("Banner Update Under Review!");
                this.makingChanges = false;
              }
            });
          }

          if(type == "banners"){
            this.auth.addStoreBanners(this.storeID, result.croppedImage ).then(ref => {
              if(!ref || !ref.success){
                this.auth.resource.startSnackBar("Upload Failed!");
                this.makingChanges = false;
              }else{
                this.storeBannersList.push(ref.url)
                if(this.storeBannersList.length == 1){
                  this.storeBannersActive = this.storeBannersList[0];
                }
                this.auth.resource.startSnackBar("Store Pics Update Under Review!");
                this.makingChanges = false;
              }
            });
          }

        }
      })
    }
  }

  removeStoreBanner( resultImage:string ){
    this.makingChanges = true;
    this.auth.removeStoreBanners(this.storeID, resultImage ).then(() => {
      this.storeBanner = resultImage;
      const ind = this.storeBannersList.indexOf(resultImage);
      this.storeBannersList.splice( ind, 1 );
      if(this.storeBannersList.length > 0){
        this.storeBannersActive = this.storeBannersList[0];
      }else{
        this.storeBannersActive = "";
      }
      this.auth.resource.startSnackBar("Banner updated.");
      this.makingChanges = false;
      //this.auth.resource.last.enable();
    });
  }

  updateStoreName(){
    this.makingChanges = true;
    this.auth.resource.last.disable();
    if( this.auth.resource.last.invalid 
      ){
      this.auth.resource.last.enable();
      this.makingChanges = false;
      this.auth.resource.startSnackBar("issue: format must be A-Za-z.")
    }else{
      
      const newName = this.auth.resource.last.value; //+ (this.auth.resource.last.value ? (" " + this.auth.resource.last.value) : "");
      console.log(this.storeName, newName)

      this.auth.updateStoreBio(this.storeID,
        //uid, 
        this.storeName, newName,
        //this.dataCurrent.soIG, this.dataCurrent.soYT,this.dataCurrent.soTW,this.dataCurrent.soWA,
        //this.dataCurrent.username, this.dataCurrent.info, this.dataCurrent.url, this.dataCurrent.typ, this.dataCurrent.sex, this.dataCurrent.stat 
        ).then(() => {
          this.storeName = newName;
        this.auth.resource.startSnackBar("Name Update Under Review!");
        this.auth.resource.last.enable();
        this.makingChanges = false;
      });

    }
  }

  updateSocial(uid:string, type:string, info:string){
    this.makingChanges = true;
    if( !info ){
      this.makingChanges = false;
      this.auth.resource.startSnackBar("issue: format must be A-Za-z0-9.")
    }else{

      this.auth.updateUserBio(
        uid, this.dataCurrent.name, this.dataCurrent.name,
        (type == "FB" ? info : this.dataCurrent.soFB),
        (type == "IG" ? info : this.dataCurrent.soIG),
        (type == "YT" ? info : this.dataCurrent.soYT),
        (type == "TW" ? info : this.dataCurrent.soTW),
        (type == "WA" ? info : this.dataCurrent.soWA),
        //this.dataCurrent.username, this.dataCurrent.info, this.dataCurrent.url, this.dataCurrent.typ, this.dataCurrent.sex, this.dataCurrent.stat 
        ).then(() => {
          if( type == "FB" ){ this.dataCurrent.soFB = info }
          if( type == "IG" ){ this.dataCurrent.soIG = info }
          if( type == "YT" ){ this.dataCurrent.soYT = info }
          if( type == "TW" ){ this.dataCurrent.soTW = info }
          if( type == "WA" ){ this.dataCurrent.soWA = info }
          this.auth.resource.startSnackBar("Social Update Under Review!");
          this.makingChanges = false;
      });

    }
  }

  updateName(uid:string){
    this.makingChanges = true;
    this.auth.resource.first.disable();
    if( this.auth.resource.first.invalid 
      ){
      this.auth.resource.first.enable();
      this.makingChanges = false;
      this.auth.resource.startSnackBar("issue: format must be A-Za-z.")
    }else{
      
      const newName = this.auth.resource.first.value; //+ (this.auth.resource.last.value ? (" " + this.auth.resource.last.value) : "");
      console.log(this.dataCurrent.name, newName)

      this.auth.updateUserBio(
        uid, this.dataCurrent.name, newName,
        this.dataCurrent.soFB, 
        this.dataCurrent.soIG, this.dataCurrent.soYT,this.dataCurrent.soTW,this.dataCurrent.soWA,
        //this.dataCurrent.username, this.dataCurrent.info, this.dataCurrent.url, this.dataCurrent.typ, this.dataCurrent.sex, this.dataCurrent.stat 
        ).then(() => {
          this.dataCurrent.name = newName;
        this.auth.resource.startSnackBar("Name Update Under Review!");
        this.auth.resource.first.enable();
        this.makingChanges = false;
      });

    }
  }


  step0(){//FIGREOUT USER > NEW=SIGNUP|OLD=LOGIN
    let validatePhone = this.phoneNumber.country + this.phoneNumber.area + this.phoneNumber.prefix + this.phoneNumber.line;
    if( this.auth.resource.invalidPhone(validatePhone) ){
      this.auth.resource.startSnackBar("issue: format must be 0-9.")
    }else{
      const step0_CheckUserExist = this.auth.step0_userForward( this.phoneNumber.e164, true );
      step0_CheckUserExist.then((data:any) =>{
        console.log("Indian", data)
        if(!data.success){
          if(data.info == "401" || data.code == "auth/user-disabled"){
            this.auth.stepDisable = false;
            this.auth.resource.startSnackBar("The account associated has been disabled!")
          }
        }else{
          if(data.exist){
            this.auth.stepDisable = false;
            this.auth.resource.startSnackBar("The phone number is already associated with another account");
            //this.phoneNumber.country = "";
            this.phoneNumber.area = "";
            this.phoneNumber.prefix = "";
            this.phoneNumber.line = "";
          }else{
            this.step = 1;
            this.auth.stepDisable = false;
            this.auth.setupReCapca()
            //this.startPhoneAdd()
          }
        }
      })
    }
  }

  // startPhoneAdd(){
  //   this.auth.step4_resetLogin( this.phoneNumber.e164 ).then(data => {
  //     //this.finalRESULT(data);
  //   })
  //   const stepAdd_USERS_PHONE = this.auth.stepAdd_USERS_PHONE( this.phoneNumber.e164, //validatePassword, 
  //     this.phoneNumber.iso, this.phoneNumber.coin );
  // }

  step1(){//CREATE NEW USER
    // this.auth.resource.first.disable();
    // this.auth.resource.last.disable();
    this.auth.resource.pass.disable();

    let validatePassword = this.auth.resource.pass.value;
    if( this.auth.resource.invalidPassword(validatePassword) ){
      this.auth.resource.pass.setValue("");
      // this.auth.resource.first.enable();
      // this.auth.resource.last.enable();
      this.auth.resource.pass.enable();
      this.auth.resource.startSnackBar("issue: format must be 0-9A-Za-z@.")
    }else{
      this.auth.verifyPhoneWithOTP(this.phoneNumber.e164, true).then(data => {
        //this.finalRESULT(data);
        if(!data.success){
          if(data.info !== "401"){
            this.auth.stepDisable = false;
            this.auth.resource.startSnackBar(data.info)
          }else{
            this.auth.stepDisable = false;
            this.auth.resource.startSnackBar("issue: Dirty Data!")
          }
        }else{
          this.step = 2;
          this.auth.stepDisable = false;
        }
      });
      // stepAdd_USERS_PHONE.then(data => {

      // })
    }
  }

  step2(){
    if(this.verificationCode?.length < 6){
      this.auth.resource.startSnackBar("issue: verification code invalid.")
    }else{
      this.auth.step2_varifyCODE(this.verificationCode, this.phoneNumber.e164,// "", ""
      ).then(data => {
        //this.auth.resource.playSound('beep')
        //this.finalRESULT(data);
        if(!data.success){
          if(data.info !== "401"){
            this.auth.stepDisable = false;
            this.auth.resource.startSnackBar(data.info)
          }else{
            this.auth.stepDisable = false;
            this.auth.resource.startSnackBar("issue: Dirty Data!")
          }
        }else{
          this.step = 0;
          this.auth.stepDisable = false;
        }
      })
    }
  }

  addGoogle(state:boolean, hasfacebook:boolean){//FIGREOUT USER > NEW=SIGNUP|OLD=LOGIN
    if(state){
      this.auth.resource.startSnackBar("The account is already associated with a google account.")
    }else{
      this.auth.googleSync(hasfacebook).then(data => {
        console.log("Man", data)
        if(!data.success){
          this.auth.resource.startSnackBar(data.info)
        }else{

        }
      })
      //this.auth.resource.startSnackBar("Comming Soon...")
    }
  }

  addFacebook(state:boolean, hasgogle:boolean){//FIGREOUT USER > NEW=SIGNUP|OLD=LOGIN
    if(state){
      this.auth.resource.startSnackBar("The account is already associated with a facebook account.")
    }else{
      this.auth.facebookSync(hasgogle).then(data => {
        console.log("Man", data)
        if(!data.success){
          this.auth.resource.startSnackBar(data.info)
        }else{

        }
      })
      //this.auth.resource.startSnackBar("Comming Soon...")
    }
  }

}
