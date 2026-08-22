export class Account {
    public accountName: string;
    private balance: number;
    readonly accountNumber: string;

    constructor(accountName: string, balance: number, accountNumber: string) {
        this.accountName = accountName;
        this.balance = balance;
        this.accountNumber = accountNumber;
    }
}

const account = new Account("Nguyễn Văn A", 5000000, "0123456789");
console.log(account.accountName, account.accountNumber);