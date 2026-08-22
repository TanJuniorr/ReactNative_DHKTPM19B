export abstract class Appliance {
    abstract turnOn(): void;
}
  
export class Fan extends Appliance {
    turnOn(): void {
      console.log("The fan is spinning fast...");
    }
}
  
export class AirConditioner extends Appliance {
    turnOn(): void {
      console.log("The air conditioner is blowing cold air at 18°C...");
    }
}
  
// --- Test ---
const myFan = new Fan();
myFan.turnOn();
  
const myAC = new AirConditioner();
myAC.turnOn();