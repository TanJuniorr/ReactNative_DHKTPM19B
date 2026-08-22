export class Box<T> {
    value: T;

    constructor(value: T) {
        this.value = value;
    }
}

const numberBox = new Box<number>(99);
console.log("Box chứa số:", numberBox.value);

const stringBox = new Box<string>("TypeScript Generics");
console.log("Box chứa chuỗi:", stringBox.value);