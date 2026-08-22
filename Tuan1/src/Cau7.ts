
export class User {
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    set name(newName: string) {
        if (newName && newName.trim().length > 0) {
            this._name = newName;
        } else {
            console.log("Name cannot be empty.");
        }
    }
}

const user1 = new User("John Doe");
console.log(user1.name);

user1.name = "Jane Smith";
console.log(user1.name);

user1.name = "";