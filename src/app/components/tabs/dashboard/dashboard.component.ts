import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
import { Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ThemeService } from 'src/app/services/theme.service';
import { User } from 'src/app/universal.model';
import { ShareAdvocacyComponent } from './share-advocacy/share-advocacy.component';
import { ShareLoyaltyComponent } from './share-loyalty/share-loyalty.component';

import { Timestamp } from "@firebase/firestore";
import { OrdrShipComponent } from '../list-order/ordr-ship/ordr-ship.component';
import { OrdrTrackComponent } from '../list-order/ordr-track/ordr-track.component';
//import {MediaMatcher} from '@angular/cdk/layout';
//import {ChangeDetectorRef} from '@angular/core';
//import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  store$: Observable<any> = of();
  paymentRedeem$: Observable<any[]> = of();
  campaign$: Observable<any[]> = of();
  campaign:any = "";
  campALL:any[] = [];
  paymentOrder$: Observable<any[]> = of();



  isLinear=true;
  selectedIndex = 0;
  showDetailsRedeem: string[] =[];
  showLedgerOrders: string[] =[];
  showDetailsOrders: string[] =[];

  //@ViewChild(MatStepper) stepper!: MatStepper;


   //mobileQuery!: MediaQueryList;

   //private _mobileQueryListener!: () => void;
/*
  public lineChart: GoogleChartInterface = {
    chartType: GoogleChartType.LineChart,
    dataTable: [
      ['Year', 'Sales', 'Expenses'],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ],
    options: {title: 'Performance'}
  };

  public pieChart: GoogleChartInterface = {
    chartType: GoogleChartType.PieChart,
    dataTable: [
      ['City', 'Number of sales'],
      ['Mumbai',     11],
      ['Delhi',      2],
      ['Pune',  2],
    ],
    //firstRowIsData: true,
    options: {'title': 'Performance'},
  };
*/

  makeChanges = false;
  storename = "";
  shareUrlB1 = "";
  shareUrlP1 = "";

  constructor(
    public themeService: ThemeService,
    public auth: AuthService,
    public pay: PaymentService,

    //changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
  ) { }

  ngOnDestroy(): void {
    //this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  expandRedeemCard(id:string) {
    if(!this.showDetailsRedeem.includes(id)){
      this.showDetailsRedeem.push(id);
    }else{
      this.showDetailsRedeem.splice( this.showDetailsRedeem.indexOf(id) , 1)
    }
  }

  expandOrderCard(id:string) {
    if(!this.showDetailsOrders.includes(id)){
      this.showDetailsOrders.push(id);
    }else{
      this.showDetailsOrders.splice( this.showDetailsOrders.indexOf(id) , 1)
    }
 }


 expandLedgerCard(id:string) {
  if(!this.showLedgerOrders.includes(id)){
    this.showLedgerOrders.push(id);
  }else{
    this.showLedgerOrders.splice( this.showLedgerOrders.indexOf(id) , 1)
  }
 }

 goLink( selectedIndex:any){
   console.log("hii", selectedIndex)
   if(selectedIndex == 0){
    this.auth.resource.router.navigate(["/store/add-location"])
   }
   if(selectedIndex == 1){
    this.auth.resource.router.navigate(["/store/create-campaign"])
   }
   if(selectedIndex == 2){
    this.auth.resource.router.navigate(["/wallet"])
   }
   if(selectedIndex == 3){
    this.auth.resource.router.navigate(["/store/add-product"])
   }
 }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    //this.stepper._getIndicatorType = () => 'number';
  
    this.auth.user$.pipe(take(1)).subscribe((mine:any) => {
      if(!mine){

      }else{
        //this.execute(mine);
        if(mine.storeLoc?.length > 0){
          if(mine.storeCam?.length > 0){
            this.execute(mine);
            if(mine.acBalH > 0){
              this.selectedIndex = 3;

            }else{
              this.selectedIndex = 2;
            }
          }else{
            console.log("CREATE CAMP")
            this.selectedIndex = 1;
            // GO TO CREATE CAMP
            this.auth.resource.router.navigate(["/store/create-campaign"]);
          }
        }else{
          console.log("CREATE STORE")
          this.selectedIndex = 0;
          // GO TO CREATE STORE
          this.auth.resource.router.navigate(["/store/create-location"]);
        }
      }
      
    })
    
  }

  execute(mine:User){
    setTimeout(() => {
      const typeR:string[] = [
        "addORDER", //"POS"
      ];
      this.paymentRedeem$ = this.pay.getAllOrdersR(mine.uid, 5, typeR) //.pipe(take(1));
      //this.paymentRedeem$ = of([]);
      const typeO:string[] = [
        "addORDER"
      ];
      this.paymentOrder$ = this.pay.getAllOrdersO(mine.uid, 6, typeO) //.pipe(take(1));
      //this.paymentOrder$ = of([]);
      this.auth.getMyStore(mine.uid)//.pipe(take(1))
      .subscribe((storeRef:any) => {
        if(storeRef[0]){
          console.log(storeRef)

          this.store$ = of({
            name: storeRef[0].name,
            logo: storeRef[0].logo ||"",
            type: this.auth.resource.env.storeTyp[this.auth.resource.env.storeTyp.findIndex(x => x.id == storeRef[0].type)].name,
      
            vEarn: storeRef[0].vEarn || 0, vFan: storeRef[0].vFan || 0,
            vGave: storeRef[0].vGave || 0,
            vOrdr: storeRef[0].vOrdr || 0,
            acBalH: mine.acBalH,
        
            fb:"", yt:"", tw:"", in:""
          })

          if(storeRef[0].addedDynamicLink){
            this.storename = storeRef[0].name;

            this.shareUrlB1 = storeRef[0].shareUrlB1;
            console.log( "shareUrlP1", storeRef[0].addedDynamicLinkP1, storeRef[0].shareUrlP1)
            if(storeRef[0].addedDynamicLinkP1){
            this.shareUrlP1 = storeRef[0].shareUrlP1;
            }
          }
        }
      })

      this.auth.getMyCampaignListByUID(mine.uid).subscribe(storeXcampaigns => {


      let cX = [];
      let c4 = [];
      for (let indexC = 0; indexC < storeXcampaigns.length; indexC++) {
        const c:any = storeXcampaigns[indexC];
        if(this.calculateStartExpiry(c.dateS , c.dateE) && c.id){
          cX.push(c)
          if( c4.length < 4){
            c4.push(c)
          }
        }
        
        // if(!madeIT && cX.length == 4 || !madeIT && storeXcampaigns.length == (indexC+1) ){
        //   madeIT = true;
        //   this.campaign$ = of(c4);
        // }

        if( storeXcampaigns.length == (indexC+1) ){
          this.campALL = cX;
          this.campaign$ = of(c4);
          // if(cX.length == 1){
          //   this.selectedCamp = cX[0].id
          // }
        }
      }


      })

      

      // this.campaign$ = this.auth.getMyCampaignByUID(mine.uid, 4) //.pipe(take(1));
      // this.campaign$.pipe(take(1)).subscribe(c => {
      //   this.campALL = c;
      //   console.log("BEMAN", c)
      // })
    }, 3000);






  };

  sendSMS(){
    var userAgent = window.navigator.userAgent;
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
       // iPad or iPhone
    const url = "sms:?body=hello%20there";
    window.open(url, "_blank");
    }
    else {
       // Anything else 
    const url = "sms:;?body=hello%20there";
    window.open(url, "_blank");
    }
  }
  

  getCampAmt(c:any, cb:string){
    if(!c){return 0}else{
      const x = this.campALL.findIndex(x => x.id == c)
      return this.campALL[x][cb] || 0
    }
  }

  rejectReedem(id:string){
    this.makeChanges = true;
    this.pay.rejectReedem(id).then(() => {
      this.makeChanges = false;
    }).catch(err => {
      this.makeChanges = false;
      this.auth.resource.startSnackBar("Error: " + err)
    })
  }

  acceptReedem(balance:number, ordr:any, id:string, journey:string, amt:any, camp: any, campX: any, code:string){
    console.log(id, journey, amt, camp, campX, code);

    if(journey == "F2F"){
      this.makeChanges = true;
      if(!id || !journey || !amt || !camp){
        this.makeChanges = false;
        if(!amt){
          this.auth.resource.startSnackBar("Please enter an amount.")
        }else{
            this.auth.resource.startSnackBar("Something went wrong...")
        }
      }else{
        const y = camp;
        //console.log(x, y);
        if(!y){
          this.auth.resource.startSnackBar("Something went wrong...")
        }else{
         const iEarn = 0 + (y.min > +amt ? 0 : (
          ( y.type =="flat" ? y.cbNew : 0 ) + 
          ( y.type == "percent" ? (
            y.max > (amt * y.cbNew/100) ? (amt * y.cbNew/100) : y.max
            ) : 0 )
         )
        );
         const refEarn = 0 + (y.min > +amt ? 0 : ( // TAKE OPENION
          ( y.type =="flat" ? y.cbExi : 0 ) + 
          ( y.type == "percent" ? (
            y.max > (amt * y.cbExi/100) ? (amt * y.cbExi/100) : y.max
            ) : 0 )
         )
        );

        if(iEarn > balance || y.min > +amt || iEarn == 0 ){
          this.makeChanges = false;
          if(iEarn > balance){
            this.auth.resource.startSnackBar("You are running short on campaign wallet.")
          }
          if(y.min > +amt){
            this.auth.resource.startSnackBar("Minimum order value is not fulfilled.")
          }
          if( y.min <= +amt && iEarn == 0 ){
            this.auth.resource.startSnackBar("Reward is next to 0.")
          }
        }else{
          console.log(ordr.sid, ordr.by, ordr.to, iEarn, refEarn, ordr.amTotal)
        
          const refr = ordr.refr;
          refr["earn"] = refEarn;
          const earnTotal = iEarn + refEarn;
          this.pay.setCampF2F(id, y, +amt, earnTotal, iEarn, refr).then(() => {
            // deduct money & add money
            const vFan = 1;//withNewCode ? 1:0;
            
            this.pay.transferOfflineF2F(ordr.sid, ordr.to, ordr.by, ordr.refr.uid, earnTotal, iEarn, refEarn, ordr.amTotal, vFan).then(ref => {
              if(!ref || !ref.success){
                this.auth.resource.startSnackBar("Something went wrong...")
              }else{
                this.pay.setCodesCampaignF2F(code, y.id, earnTotal, refEarn, iEarn, ordr.by, ordr.amTotal)
                this.makeChanges = false;
                this.auth.resource.startSnackBar("Both Users " + ordr.refr.name + " & " + ordr.userName + " Rewarded in total Rs " + earnTotal)

              }
            })
          })


        }
        }
      }
      
    }

    if(journey == "POS"){
      this.makeChanges = true;
      if(!id || !journey || !amt || !campX){
        this.makeChanges = false;
        if(!amt){
          this.auth.resource.startSnackBar("Please enter an amount.")
        }else{
          if(!campX){
            this.auth.resource.startSnackBar("Please select a campaign.")
          }else{
            this.auth.resource.startSnackBar("Something went wrong...")
          }
        }
      }else{
        
      const x = this.campALL.findIndex(x => x.id == campX);
      const y = this.campALL[x];

      //console.log(x, y);
      if(!y){
        this.auth.resource.startSnackBar("Something went wrong...")
      }else{
       const earn = 0 + (y.min > +amt ? 0 : (
        ( y.type =="flat" ? y.cbDir : 0 ) + 
        ( y.type == "percent" ? (
          y.max > (amt * y.cbDir/100) ? (amt * y.cbDir/100) : camp.max
          ) : 0 )
       )
      );
        //console.log(x, y, ordr, id, journey, amt, camp, campX, earn);
        // set campaign
        if(earn > balance || y.min > +amt || earn == 0 ){
          this.makeChanges = false;
          if(earn > balance){
            this.auth.resource.startSnackBar("You are running short on campaign wallet.")
          }
          if(y.min > +amt){
            this.auth.resource.startSnackBar("Minimum order value is not fulfilled.")
          }
          if( y.min <= +amt && earn == 0 ){
            this.auth.resource.startSnackBar("Reward is next to 0.")
          }
        }else{
          console.log(ordr.sid, ordr.to, ordr.by, earn, ordr.amTotal)
    
          this.pay.setCampPOS(id, y, +amt, earn, null).then(() => {
            // deduct money & add money
            const vFan = 1;//withNewCode ? 1:0;
          
            this.pay.transferPOS(ordr.sid, ordr.to, ordr.by, earn, ordr.amTotal, vFan).then(ref => {
              if(!ref || !ref.success){
                this.auth.resource.startSnackBar("Something went wrong...")
              }else{
                this.pay.setCodesCampaignPOS(code, y.id, earn, ordr.by, ordr.amTotal)
                this.makeChanges = false;
                this.auth.resource.startSnackBar("User Rewarded Rs " + earn + " Cashback")

              }
            })
          
          })
        }
      }
        // give cashback

      }
    }

  }

  ordrStatus(journey:string, ordr:any, setStatus:any){
    this.makeChanges = true;
    console.log(setStatus)
    
if(journey == "F2F"){

  if(setStatus == "Placed"){
    this.makeChanges = false;

  }

  if(setStatus == "Refund"){// goes to Refunded
    const ordrTYPE = ordr.ordrTYPE;

    const sid = ordr.sid;
    const uidV = ordr.to;
    const uidC = ordr.by;
    const uidR = ordr.refr.uid;

    const costUSER = ordr.amTotal;
    const transferRefrCash = ordr.invoice.useRefrCash ? ordr.invoice.amtRefrCash : 0;
    const cashback = ordr.earn;
    const referalCashback = ordr.refr.earn;

    this.pay.transferRefundF2F(
      sid, uidV, uidC, uidR, 
      costUSER, transferRefrCash, cashback, referalCashback
      ).then(ref => {
        if(!ref.success){

        }else{
          if(ordrTYPE == "RefrCASH+ONLINE" || ordrTYPE == "ONLINE"){
            const paymentID = ordr.gwID;
            const paymentAmt = ordr.amCost;
            this.pay.onlinePaymentRefund("IN", ordr.id, paymentID, paymentAmt, "INR").pipe(take(1)).subscribe((razorRef:any) => {
                console.log(razorRef)
              if(!razorRef || !razorRef.success){
                this.auth.resource.startSnackBar("Failed to refund.")
              }else{
                const newLO = ordr.logistics;
                newLO.status = -1000;
                
                this.makeChanges = false;
                return this.pay.changeRefundOnlineF2F(ordr.id, -10, newLO, razorRef)
              }
            })
    
          }else{
            const newLO = ordr.logistics;
            newLO.status = -1000;
            
            this.makeChanges = false;
            return this.pay.changeRefundOnlineF2F(ordr.id, -10, newLO, {})
          }
        }
      })

/*
    const newLO = ordr.logistics;
    newLO.status = -1000;

    const uidC = ordr.by;
    const uidR = ordr.refr.uid;
    const amtC = ordr.earn;
    const amtR = ordr.refr.earn;
    if(!ordr.gwInfo){
      console.log("GATEWAY INFO")
      this.pay.transferRefund(ordr.id, newLO, uidC, uidR, amtC, amtR).then(() => {
        this.makeChanges = false;
      })
    }else{
      console.log("GATEWAY INFO", ordr.gwInfo)
    }
*/      
/*
    this.pay.changeStatusOnlineF2F(ordr.id, -10, newLO).then(() => {
      this.makeChanges = false;
    })
*/
  }

  if(setStatus == "Delivered"){// goes to Delivered
    const newLO = ordr.logistics;
    newLO.status = 20;

    /*
    this.pay.changeStatusOnlineF2F(ordr.id, 10, newLO)
    */
    const uidC = ordr.by;
    const uidR = ordr.refr.uid;
    const amtC = ordr.earn;
    const amtR = ordr.refr.earn;
    const sid = ordr.sid;

    this.pay.transferDeliveredF2F(sid, ordr.id, newLO, uidC, uidR, amtC, amtR).then(() => {
      // remove from reserved & add to permenent balance
      this.makeChanges = false;
    })
  }

}

if(journey == "DIRECT"){

  if(setStatus == "Placed"){
    this.makeChanges = false;

  }

  if(setStatus == "Refund"){// goes to Refunded
    const ordrTYPE = ordr.ordrTYPE;

    const sid = ordr.sid;
    const uidV = ordr.to;
    const uidC = ordr.by;
    //const uidR = ordr.refr.uid;

    const costUSER = ordr.amTotal;
    const transferRefrCash = ordr.invoice.useRefrCash ? ordr.invoice.amtRefrCash : 0;
    //const cashback = ordr.earn;
    //const referalCashback = ordr.refr.earn;

    this.pay.transferRefundDIRECT(
      sid, uidV, uidC, //uidR, 
      costUSER, transferRefrCash //, cashback, referalCashback
      ).then(ref => {
        if(!ref.success){
          this.auth.resource.startSnackBar("Failed to refund.")
        }else{
          if(ordrTYPE == "RefrCASH+ONLINE" || ordrTYPE == "ONLINE"){
            const paymentID = ordr.gwID;
            const paymentAmt = ordr.amCost;
            this.pay.onlinePaymentRefund("IN", ordr.id, paymentID, paymentAmt, "INR").pipe(take(1)).subscribe((razorRef:any) => {
                console.log("razorRef", razorRef)
              if(!razorRef || !razorRef.success){
                this.auth.resource.startSnackBar("Failed to refund.")
              }else{
                const newLO = ordr.logistics;
                newLO.status = -1000;
                
                this.makeChanges = false;
                return this.pay.changeRefundOnlineDIRECT(ordr.id, -10, newLO, razorRef)
              }
            })
    
          }else{
            const newLO = ordr.logistics;
            newLO.status = -1000;
            
            this.makeChanges = false;
            return this.pay.changeRefundOnlineDIRECT(ordr.id, -10, newLO, {})
          }
        }
      })

  }

  if(setStatus == "Delivered"){// goes to Delivered
    const newLO = ordr.logistics;
    newLO.status = 20;

    /*
    this.pay.changeStatusOnlineF2F(ordr.id, 10, newLO)
    */
    const uidC = ordr.by;
    //const uidR = ordr.refr.uid;
    const amtC = ordr.earn;
    //const amtR = ordr.refr.earn;
    const sid = ordr.sid;
    console.log("dataSend", ordr)

    this.pay.transferDeliveredDIRECT(sid, ordr.id, newLO, uidC, //uidR, 
      amtC //, amtR
      ).then(() => {
      // remove from reserved & add to permenent balance
      this.makeChanges = false;
    })
  }

}

if(journey == "BURN"){

  if(setStatus == "Placed"){
    this.makeChanges = false;

  }

  if(setStatus == "Refund"){// goes to Refunded
    const ordrTYPE = ordr.ordrTYPE;

    const sid = ordr.sid;
    const uidV = ordr.to;
    const uidC = ordr.by;
    //const uidR = ordr.refr.uid;

    const costUSER = ordr.amTotal;
    const transferRefrCash = ordr.invoice.useRefrCash ? ordr.invoice.amtRefrCash : 0;
    //const cashback = ordr.earn;
    //const referalCashback = ordr.refr.earn;

    this.pay.transferRefundBURN(
      sid, uidV, uidC, //uidR, 
      costUSER, transferRefrCash //, cashback, referalCashback
      ).then(ref => {
        if(!ref.success){

        }else{
          if(ordrTYPE == "RefrCASH+ONLINE" || ordrTYPE == "ONLINE"){
            const paymentID = ordr.gwID;
            const paymentAmt = ordr.amCost;
            this.pay.onlinePaymentRefund("IN", ordr.id, paymentID, paymentAmt, "INR").pipe(take(1)).subscribe((razorRef:any) => {
                console.log(razorRef)
              if(!razorRef || !razorRef.success){
                this.auth.resource.startSnackBar("Failed to refund.")
              }else{
                const newLO = ordr.logistics;
                newLO.status = -1000;
                
                this.makeChanges = false;
                return this.pay.changeRefundOnlineBURN(ordr.id, -10, newLO, razorRef)
              }
            })
    
          }else{
            const newLO = ordr.logistics;
            newLO.status = -1000;
            
            this.makeChanges = false;
            return this.pay.changeRefundOnlineBURN(ordr.id, -10, newLO, {})
          }
        }
      })

  }

  if(setStatus == "Delivered"){// goes to Delivered
    const newLO = ordr.logistics;
    newLO.status = 20;

    /*
    this.pay.changeStatusOnlineF2F(ordr.id, 10, newLO)
    */
    const uidC = ordr.by;
    //const uidR = ordr.refr.uid;
    const amtC = ordr.earn;
    //const amtR = ordr.refr.earn;
    const sid = ordr.sid;
    console.log("dataSend", ordr)

    this.pay.transferDeliveredBURN(sid, ordr.id, newLO, uidC, //uidR, 
      amtC //, amtR
      ).then(() => {
      // remove from reserved & add to permenent balance
      this.makeChanges = false;
    })
  }

}


if(setStatus == "Shipping"){// goes to Shipping
  const newLO = ordr.logistics;
  newLO.status = 10;

  if(!ordr.logistics.require){
    this.pay.changeStatusOnlineStore(ordr.id, 10, newLO).then(() => {
      this.makeChanges = false;
    }) 
  }else{
    //this.makeChanges = false;
    let w = (this.auth.resource.getWidth - 16) + 'px';
    let h = (this.auth.resource.getHeight - 16) + 'px';

    const refDialog = this.auth.resource.dialog.open(OrdrShipComponent, {
      width: w, minWidth: "320px", maxWidth: "480px",
      height:h,
      data:{ordr:ordr},
      disableClose: true, 
      panelClass:"dialogClassShipment"//, autoFocus:false
    });
    refDialog.afterClosed().subscribe(result =>{
      if(!result || !result.success){
        this.makeChanges = false;
      }else{
        this.pay.startShiping(ordr.id, result.payDataUpdate).then(() => {
          this.pay.changeStatusOnlineStore(ordr.id, 10, newLO).then(() => {
            this.makeChanges = false;
          }) 
        })
      }
    })
  }
}

if(setStatus == "Track"){// opens & updates tracking
  const ship = ordr.logistics.require
  let w = (this.auth.resource.getWidth - 16) + 'px';
  let h = (this.auth.resource.getHeight - 16) + 'px';

  const refDialog = this.auth.resource.dialog.open(OrdrTrackComponent, {
    width: w, minWidth: "320px", maxWidth: "480px",
    //height:h, 
    maxHeight: h,
    data:{ordr:ordr},
    //disableClose: true, 
    panelClass:"dialogClass"//, autoFocus:false
  });
  refDialog.afterClosed().subscribe(result =>{
    if(!result || !result.success){
      this.makeChanges = false;
    }else{
      if(!ship){

      }else{
      // this.pay.updateShiping(ordr.id, result.payDataUpdate).then(() => {
      // })
      let status = result.status;
      // STATUS CODE	DESCRIPTION
      // 0	
      // 6	Shipped
      // 7	Delivered
      // 8	Cancelled
      // 9	RTO Initiated
      // 10	RTO Delivered
      // 11	Pending
      // 12	Lost
      // 13	Pickup Error
      // 14	RTO Acknowledged
      // 15	Pickup Rescheduled
      // 16	Cancellation Requested
      // 17	Out For Delivery
      // 18	In Transit
      // 19	Out For Pickup
      // 20	Pickup Exception
      // 21	Undelivered

      if(status == 0 || status == 8 || status == 16){
        // x.journey == 'F2F' && x.status == -10 && x.logistics.status == -1000 || 
        // x.journey == 'DIRECT' && x.status == -10 && x.logistics.status == -1000 || 
        // x.journey == 'BURN' && x.status == -10 && x.logistics.status == -1000
        if(ordr.status == -10 && ordr.logistics.status == -1000){
          console.log("already refunded")
        }else{
          this.ordrStatus(journey, ordr, "Refund")
          console.log("Done refunded")
        }
      }else{
        if(status == 7){
          this.ordrStatus(journey, ordr, "Delivered")
        }
      }


      }
      this.makeChanges = false;
    }
  })

}

  }

  promoteAdvocacy(){
    let w = (this.auth.resource.getWidth - 16) + 'px';
    //let h = (this.auth.resource.getHeight - 16) + 'px';
    const refDialog = this.auth.resource.dialog.open(ShareAdvocacyComponent, {
      width: w, minWidth: "320px", maxWidth: "480px",
      //height:h,
      data:{name:this.storename, link: this.shareUrlB1},
      //disableClose: true, 
      panelClass:"dialogLayout"//, autoFocus:false
    });

  }

  promoteLoyalty(){
    let w = (this.auth.resource.getWidth - 16) + 'px';
    //let h = (this.auth.resource.getHeight - 16) + 'px';
    const refDialog = this.auth.resource.dialog.open(ShareLoyaltyComponent, {
      width: w, minWidth: "320px", maxWidth: "480px",
      //height:h,
      data:{name:this.storename, link: this.shareUrlP1 || "Loyalty link not created yet"},
      //disableClose: true, 
      panelClass:"dialogLayout"//, autoFocus:false
    });

  }

  calculateStartExpiry(fsDateS:any, fsDateE:any){
    // Create new Date instance
var date = new Date()
// Add a day
//date.setDate(date.getDate() - 14)

    //const dateNow = new Date().setDate(new Date().getDate() + 10);
    //const date14 = new Date().setFullYear( fsDate.toDate() );
    let noteDate = Timestamp.fromDate(date);
    //const date14 = fsDate.toDate();
    //console.log("date14: ",  fsDate, "dateNow: ", noteDate)
    return noteDate > fsDateS && noteDate < fsDateE;
  }

  getVARIENT(v:any){
    console.log("MANKIND", v)
    return v.type + ": " + v.name;
  }

}
