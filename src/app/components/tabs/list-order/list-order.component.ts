import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ThemeService } from 'src/app/services/theme.service';
import { User } from 'src/app/universal.model';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  payments$: Observable<any[]> = of();

  constructor(
    public themeService: ThemeService,
    public auth: AuthService,
    public pay: PaymentService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
  
    this.auth.user$.pipe(take(1)).subscribe((mine:any) => {
      if(!mine){

      }else{
        //this.execute(mine);
        if(mine.storeLoc?.length > 0){
          if(mine.storeCam?.length > 0){
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


  execute(mine:User){
    setTimeout(() => {
      const type:string[] = ["addOrder"];
      this.payments$ = of([])
      //this.payments$ = this.pay.getAllOrdersO(mine.uid, 5, type).pipe(take(1));
    }, 3000);

  };


}
