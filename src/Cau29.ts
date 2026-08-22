export interface Movable {
    move(): void;
  }
  
  export class Car implements Movable {
    move(): void {
      console.log("The car moves on 4 wheels on the road.");
    }
  }
  
  export class Robot implements Movable {
    move(): void {
      console.log("The robot moves using mechanical joints and servo motors.");
    }
  }
  
  // --- Test ---
  const car1 = new Car();
  car1.move();
  
  const robot1 = new Robot();
  robot1.move();