export interface Payment {
    pay(amount: number): void;
}
  
export class CashPayment implements Payment {
    pay(amount: number): void {
      console.log(`Paid ${amount} VND in Cash.`);
    }
}
  
export class CardPayment implements Payment {
    pay(amount: number): void {
      console.log(`Paid ${amount} VND via Credit/Debit Card.`);
    }
}

// --- Test ---
const cash = new CashPayment();
cash.pay(500000);
  
const card = new CardPayment();
card.pay(1500000);