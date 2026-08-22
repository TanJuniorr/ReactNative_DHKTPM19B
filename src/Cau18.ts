export class MathUtil {
    static add(a: number, b: number): number {
        return a + b;
    }

    static subtract(a: number, b: number): number {
        return a - b;
    }

    static multiply(a: number, b: number): number {
        return a * b;
    }

    static divide(a: number, b: number): number {
        if (b === 0) {
            throw new Error("Cannot divide by zero");
        }
        return a / b;
    }
}

console.log("Phép cộng (10 + 5):", MathUtil.add(10, 5));
console.log("Phép trừ (10 - 5):", MathUtil.subtract(10, 5));
console.log("Phép nhân (10 * 5):", MathUtil.multiply(10, 5));
console.log("Phép chia (10 / 5):", MathUtil.divide(10, 5));