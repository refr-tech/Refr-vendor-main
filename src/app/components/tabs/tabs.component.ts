import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterViewInit {
  title = 'Refr';
  infocus = false;
  showMenu = false;

  navRoutes = [
    { tit:"Dashboard", link:"/dash" },
    { tit:"My Store", link:"/profile" },
    { tit:"Campaigns", link:"/campaign" },
    { tit:"Wallets", link:"/wallet" },
    { tit:"Products", link:"/my-inventory" },
    { tit:"My Customers", link:"/customer" },
    { tit:"Orders", link:"/my-order-list" },
    //{ tit:"Subscriptions", link:"/dash" },
    //{ tit:"Integrations", link:"/api" },
    { tit:"Reports", link:"/insight" },
    //{ tit:"Settings", link:"/dash" },
  ]

  constructor(
    public router: Router,
    public auth: AuthService,
    public themeService: ThemeService,
    private bottomSheet: MatBottomSheet    
  ) { 
    
  }

  ngOnInit(): void {
    if(this.auth.resource.getWidth > 767){
      this.showMenu = true;
    }
/*
menu_position = menu_current_item.offsetLeft - 16;
menu_indicator.style.left = menu_position + "px";
menu_bar.style.backgroundPosition = menu_position-8 + 'px';
menu_item.forEach(() =>
  (select_menu_item: any){
    select_menu_item.addEventListener('click', function(e){
      e.preventDefault();
      menu_position = this.offsetLeft - 16;
      menu_indicator.style.left = menu_position + "px";
      menu_bar.style.backgroundPosition = menu_position-8 + 'px';
      [...select_menu_item.parentElement.children].forEach(
        sibling => {
          sibling.classList.remove('sc-current');
        })
      select_menu_item.classList.add('sc-current');
    });
  }
)
*/
  }

  ngAfterViewInit(){
    // let menu_bar:any = document.querySelector('.sc-bottom-bar');
    // let menu_item = document.querySelectorAll('.sc-menu-item');
    // let menu_indicator:any = document.querySelector('.sc-nav-indicator');
    // let menu_current_item:any = document.querySelector('.sc-current');
    // let menu_position;

    //menu_position = (menu_current_item.offsetLeft || 0) - 16;
    //menu_indicator.style.left = menu_position + "px";
    //menu_bar.style.backgroundPosition = menu_position-8 + 'px';
  }


  getIndiWidth(){
    return this.auth.resource.getWidth > 360 ? (360/5) : (this.auth.resource.getWidth / 5)
  }

  openBottomSheet(notes:any): void {
    // let isPhone = this.auth.resource.getWidth < 768;
    // let w = isPhone ? this.auth.resource.getWidth + "px" : "480px";
    // let h = isPhone ? this.auth.resource.getHeight + "px" : "";

    this.bottomSheet.open(BottomSheetNotification, {
      data: { notes: notes }, panelClass:"bottomSheetClass", //hasBackdrop: false,
    });
  }
  
}




@Component({
  selector: 'bottom-sheet-notification',
  templateUrl: './bottom-sheet-notification.html',
})
export class BottomSheetNotification {
  notes:any = [];

  constructor(
    private bsRef: MatBottomSheetRef<BottomSheetNotification>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private auth: AuthService
  ) {
    this.notes = data.notes;
  }

  openLink(): void {
    this.bsRef.dismiss();
  }

  clearNotifications(){
    this.auth.clearNotifications()
    this.bsRef.dismiss();
  }

}