import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

//import * as QRCodeStyling from "qr-code-styling";
import QRCodeStyling, { Extension } from 'qr-code-styling';
import { Observable, of, take } from 'rxjs';
import { User } from 'src/app/universal.model';
import { PaymentService } from 'src/app/services/payment.service';
import { AddBalanceComponent } from './add-balance/add-balance.component';
import { PayComponent } from '../../pay/pay.component';
import { PlanBalanceComponent } from './plan-balance/plan-balance.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasX', { static: false }) canvasX: ElementRef | undefined;

  userID = "";
  storeID = "";
  userData:User | undefined;
  qrCodeV1:any = null;
  qrCodeB1:any = null;
  showCode = false;

  store$: Observable<any> = of();
  payments$: Observable<any> = of();

  shareUrlV1 = "";
  shareUrlB1 = "";
  shareUrlX1 = "";

  customRate = 0;





  activated: number = 1;
  expandedindex: any = null;
  expandedchildindex: any = null;
  


  constructor(
    public themeService: ThemeService,
    public auth: AuthService,
    public pay: PaymentService,
  ) { }

  ngOnInit(): void {}


  ngAfterViewInit(): void {
    this.auth.user$.pipe(take(1)).subscribe((mine:any) => {
      if(!mine){

      }else{
        //this.execute(mine);
        if(mine.storeLoc?.length > 0){
          if(mine.storeCam?.length > 0){
            this.userID = mine.uid;
            this.storeID = mine.storeLoc[0];
            this.userData = mine;
            this.execute(mine);
          }else{
            console.log("CREATE CAMP")
            // GO TO CREATE CAMP
            //this.auth.resource.router.navigate(["/store/create-campaign"]);
          }
        }else{
          console.log("CREATE STORE")
          // GO TO CREATE STORE
          //this.auth.resource.router.navigate(["/store/create-location"]);
        }
      }
      
    })
    
  }

  // onKey(event: any): void {
  //   this.data = event.target.value;
  //   this.qrCode.update({
  //     data: this.data
  //   });
  // }

  //onChange(event: any): void {
    //this.extension = event.target.value;
  //}

  downloadV(extension:string): void {
    if(extension){
      this.qrCodeV1.download({ extension: extension as Extension });
    }
  }
  downloadB(extension:string): void {
    if(extension){
      this.qrCodeB1.download({ extension: extension as Extension });
    }
  }

  execute(mine:User){
    this.auth.getStore(this.storeID).pipe(take(1)).subscribe((s:any) => {
      if(!s){

      }else{
        if(!s.addedDynamicLink){

        }else{

          
          this.shareUrlV1 = s.shareUrlV1;
          this.shareUrlB1 = s.shareUrlB1;
          this.shareUrlX1 = s.shareUrlX1;




    this.qrCodeV1 = new QRCodeStyling({
      width: 200,
      height: 200,
      type: 'svg',
      data: this.shareUrlV1,
      image: 'https://firebasestorage.googleapis.com/v0/b/refr/o/locate.svg?alt=media&token=e23de5bd-4a26-4a9e-bb63-bc9e3a87b29c',
      margin: 0,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q'
      },
      // imageOptions: {
      //   hideBackgroundDots: false,
      //   imageSize: .8,
      //   margin: 0,
      //   crossOrigin: 'anonymous',
      // },
      dotsOptions: {
        color: '#000000',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 0,
        //   colorStops: [{ offset: 0, color: '#8688B2' }, { offset: 1, color: '#77779C' }]
        // },
        type: 'dots'
      },
      backgroundOptions: {
        color: "rgba(255, 255, 255, 0%)",
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 0,
        //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
        // },
      },
      cornersSquareOptions: {
        color: '#512da8',
        type: 'square',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
        // },
      },
      cornersDotOptions: {
        color: '#000000',
        type: 'square',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
        // },
      }
    });

    this.qrCodeB1 = new QRCodeStyling({
      width: 200,
      height: 200,
      type: 'svg',
      data: this.shareUrlB1,
      image: 'https://firebasestorage.googleapis.com/v0/b/refr/o/locate.svg?alt=media&token=e23de5bd-4a26-4a9e-bb63-bc9e3a87b29c',
      margin: 0,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'Q'
      },
      // imageOptions: {
      //   hideBackgroundDots: false,
      //   imageSize: .8,
      //   margin: 0,
      //   crossOrigin: 'anonymous',
      // },
      dotsOptions: {
        color: '#000000',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 0,
        //   colorStops: [{ offset: 0, color: '#8688B2' }, { offset: 1, color: '#77779C' }]
        // },
        type: 'dots'
      },
      backgroundOptions: {
        color: "rgba(255, 255, 255, 0%)",
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 0,
        //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
        // },
      },
      cornersSquareOptions: {
        color: '#512da8',
        type: 'square',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
        // },
      },
      cornersDotOptions: {
        color: '#000000',
        type: 'square',
        // gradient: {
        //   type: 'linear', // 'radial'
        //   rotation: 180,
        //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
        // },
      }
    });

    setTimeout(() => {
      this.showCode = true;
      //this.qrCode.append(this.canvasX?.nativeElement);
      const type:string[] = [];
      this.payments$ = this.pay.getAllPayments(mine.uid, 22, type) //.pipe(take(1));
      
      this.payments$.pipe(take(1)).subscribe(z => {
        console.log("z", z)
      })

    }, 3000)





        }

      }
    })

  }


  campCost(tX:string){
    if(tX == "tC"){
      return this.customRate || 0;
    }else{
      const t = this.auth.resource.campaignPlans.findIndex((x:any) => x.tX == tX);
      if(t == -1){
        return 0;
      }else{
        return this.auth.resource.campaignPlans[t].total;
      }
    }
  }

  addMoney(){
    let w = (this.auth.resource.getWidth - 16) + 'px';
    let h = (this.auth.resource.getHeight - 16) + 'px';
    const refDialog = this.auth.resource.dialog.open(PlanBalanceComponent, {
      width: w, minWidth: "320px", maxWidth: "480px",
      //height:h,
      data:{enableDirect:true},
      disableClose: true, 
      panelClass:"dialogLayout"//, autoFocus:false
    });

    refDialog.afterClosed().subscribe((ref:{tX:any}) =>{
      console.log("Add Money", ref)
      if(!ref.tX){}else{
        if(this.userData){
        const costX = this.campCost(ref.tX)

        const amRate = this.auth.resource.campaignPlans;
        const amCamp = costX;
        //const amMerc = this.getMerchCost() || 0;
        const amSale = 0//(this.campCost(tX) + ( (oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0) ));
        const amCost = costX;
        const amSave = 0;//(oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0);
        const amTotal = costX;

        console.log( this.userData.uid, ref.tX, amRate, amCamp, 
          amSale,amCost,amSave,amTotal 
          )
          this.startPayment( this.userData.uid, ref.tX, amRate, amCamp, 
            //amMerc, 
            amSale,amCost,amSave,amTotal 
            //this.userData.uid, //ref.storeCamp
            )
        }
      }
      /*
      if(!ref.id){}else{
        if(this.userData){
          console.log("Add Money")
          this.execute(this.userData);
          const costX = (ref.tX !== 'tC') ? this.campCost(ref.tX) : ref.payCustom

          const amRate = this.auth.resource.campaignPlans;
          const amCamp = costX;
          //const amMerc = this.getMerchCost() || 0;
          const amSale = 0//(this.campCost(tX) + ( (oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0) ));
          const amCost = costX;
          const amSave = 0;//(oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0);
          const amTotal = costX;
          this.startPayment( this.userData.uid, ref.tX, amRate, amCamp, 
            //amMerc, 
            amSale,amCost,amSave,amTotal 
            //this.userData.uid, //ref.storeCamp
            )
        }
      }
      */
    })
    //this.auth.resource.router.navigate(["/store/create-campaign"])
  }

  startPayment( 
    by:string, tX:string, amRate:any, amCamp:number, 
    //amMerc:number, 
    amSale:number, amCost:number, amSave:number, 
    amTotal:number 
  ){
    let w = this.auth.resource.getWidth + "px";
    let h = this.auth.resource.getHeight + "px";

    const refDialog = this.auth.resource.dialog.open(PayComponent, {
      width: w, minWidth: w, maxWidth: w,
      height: h, 
      data:{
        from:"FUND", tX:tX,
          type:["addBalance", "nextBalance", "vendorAc"], by, to:"Δ", 
          amRate, amCamp, 
          //amMerc, 
          amSale, amCost, amSave, 
          amTotal, 
          userData:this.userData 
      },
      //data:{ 
      //   type:["addBalance", "firstBalance", "vendorAc"], by, to:"Δ", 
      //   amRate, amCamp, amMerc, amSale, amCost, amSave, amTotal, 
      //   userData:this.userData 
      // },
      
      disableClose: true, panelClass:"dialogLayout"//, autoFocus:false
    });
    refDialog.afterClosed().subscribe(ref =>{
      if(!ref.success){
        console.log(ref)
        this.auth.resource.startSnackBar(ref.info)
        //this.disableForm = false;
      }else{
        console.log("Payment Complete")
        
      }
    })
  }


  addTransfer(){
    this.auth.resource.startSnackBar("You dont have sufficent balance in your store account.");
  }

  addWithdraw(){
    this.auth.resource.startSnackBar("You dont have sufficent balance in your store account.");
  }



  addMoneyCustom(){
    let w = this.auth.resource.getWidth + 'px';
    //let h = this.auth.resource.getHeight + 'px';
    const refDialog = this.auth.resource.dialog.open(AddBalanceComponent, {
      //width: w, minWidth: "320px", maxWidth: "480px",
      //height:h,

      data:{what:"addMoney"},
      disableClose: true, 
      panelClass:"dialogLayout"//, autoFocus:false
    });
    refDialog.afterClosed().subscribe(r => {
      if(!r.success){

      }else{
        if(this.userData){
        let payX = r.amt;
  
        //const amRate = this.auth.resource.campaignPlans;
        const amRate = r.rate;
        //const amCamp = payX;
        //const amMerc = this.getMerchCost() || 0;
        const amSale = 0//(this.campCost(tX) + ( (oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0) ));
        const amCost = payX;//100;//payX;
        const amSave = 0;//(oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0);
        const amTotal = payX;

        this.startPaymentCustom( this.userData.uid, //ref.tX, 
          amRate, //amCamp, 
          //amMerc, 
          amSale,amCost,amSave,amTotal 
          //this.userData.uid, //ref.storeCamp
          );
        }
      }
    })
    //this.auth.resource.router.navigate(["/store/add-product"])
  }

  startPaymentCustom( 
    by:string, //tX:string, 
    amRate:any, //amCamp:number, 
    //amMerc:number, 
    amSale:number, amCost:number, amSave:number, 
    amTotal:number 
  ){
    let w = this.auth.resource.getWidth + "px";
    let h = this.auth.resource.getHeight + "px";

    const refDialog = this.auth.resource.dialog.open(PayComponent, {
      width: w, minWidth: w, maxWidth: w,
      height: h, 
      data:{ 
        //campID: this.userData.campID,
        from:"WALL", //tX:tX,
        type:["addBalance", "nextBalance", "vendorAc"], by, to:"Δ", 
        amRate, //amCamp, 
        //amMerc, 
        amSale, amCost, amSave, 
        amTotal, 

        userData:this.userData 
      },
      
      disableClose: true, panelClass:"dialogLayout"//, autoFocus:false
    });
    refDialog.afterClosed().subscribe(ref =>{
      if(!ref.success){
        console.log(ref)
        this.auth.resource.startSnackBar(ref.info)
        //this.disableForm = false;
      }else{
        this.auth.resource.startSnackBar("Payment Successful")
        // if( this.storeTyp == 'Both' || this.storeTyp == 'Onli' ){
        //   this.auth.resource.router.navigate(["/store/add-product"])
        // }else{
        //   this.auth.resource.router.navigate(["/dash"])
        // }
      }
    })
    
  }

}
