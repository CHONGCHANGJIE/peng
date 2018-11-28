export class Check {
    active: boolean;
    currency: string;
    payamount: number;
    quantity: number;
    rate: number;
    status: string;
    $key: string;


    constructor(active, currency, payamount, quantity, rate, status, $key?) {
      this.active = active;
      this.currency = currency; 
      this.payamount = payamount;
      this.quantity = quantity;
      this.rate = rate;
      this.status = status;
      this.$key= $key
    }
}
