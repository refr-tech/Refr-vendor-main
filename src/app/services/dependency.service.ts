import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResourceService } from './resource.service';

@Injectable({
  providedIn: 'root'
})
export class DependencyService {

  constructor(
    private httpClient: HttpClient,
    private resource: ResourceService
    ) { }

  getState(){
    return this.httpClient.get(`${environment.server}/api/refrBot/${ !environment.production ? "TEST" : "VENDOR" }`);
  }

  sendSMS(iso:string, phone:string, mes:string){
    const body = {
      phone, mes
    }
      console.log("send Sms")
      return this.httpClient.post(`${environment.server}/api/SMS/sendSMS/${ iso }`, body);
  }

  sendSES(iso:string, email:string, mes:string){
    const body = {
      email, mes
    }
      console.log("send email")
      return this.httpClient.post(`${environment.server}/api/SES/sendSES/${ iso }`, body);
  }
  
  sendSNS(iso:string, token:string, mes:string){
    const body = {
      token, mes
    }
      console.log("send notification")
      return this.httpClient.post(`${environment.server}/api/SNS/sendSNS/${ iso }`, body);
  }

  getLocationInfo(iso:string, lat:number, lon:number){
    const body = {
      lat, lon
    }
      console.log("get Location")
      return this.httpClient.post(`${environment.server}/api/locate/about/${ iso }`, body);
  }

  submitShipment(iso:string, data:any){
    const body = {
      uid: data.uid,

      name: data.name, pin_code: data.pin_code,
      address: data.address, address_2: data.address_2,
      city: data.city, state:data.state, country: data.country,

      order_id: data.order_id,
      order_date: data.order_date,
      comment: data.comment,
      billing_customer_name: data.billing_customer_name, billing_last_name: data.billing_last_name,
      billing_address: data.billing_address, billing_address_2: data.billing_address_2,
      billing_pincode: data.billing_pincode, billing_city: data.billing_city, billing_country: data.billing_country, billing_state: data.billing_state,
      billing_email: data.billing_email, billing_phone: data.billing_phone,
      
      order_items:data.order_items,
      payment_method: data.payment_method,
      shipping_charges: data.shipping_charges, giftwrap_charges: data.giftwrap_charges, transaction_charges: data.transaction_charges,
      total_discount: data.total_discount, sub_total: data.sub_total,

      O_length: data.O_length, O_breadth: data.O_breadth, O_height: data.O_height,
      O_weight: data.O_weight
    }
      console.log("place order")
      return this.httpClient.post(`${environment.server}/api/shipping/newShipment/${ iso }`, body);
  }

  trackShipment(iso:string, shipID:string, shipToken:string){
    const body = {
      shipID, shipToken
    }
    return this.httpClient.post(`${environment.server}/api/shipping/trackShipment/${ iso }`, body);
  }

}
