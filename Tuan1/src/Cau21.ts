export class Repository<T> {
    private items: T[] = [];
  
    add(item: T): void {
      this.items.push(item);
    }
  
    getAll(): T[] {
      return this.items;
    }
}

const stringRepo = new Repository<string>();
stringRepo.add("TypeScript Programming Book");
stringRepo.add("Java OOP Book");
console.log("String list:", stringRepo.getAll());
  
const numberRepo = new Repository<number>();
numberRepo.add(23681361); 
numberRepo.add(10);
console.log("Number list:", numberRepo.getAll());