import { Injectable } from "@nestjs/common";

Injectable()
export class DoggService {
    //make a list named doggList
    private doggList: string[] = [];
    createDogg(dogg: string): void {
        this.doggList.push(dogg);
    }
    getDoggList(): string[] {
        return this.doggList;
    }
    solve(a: number, b: string): string {
        let result : string = "";
        for (let i = 0; i < a; i++) {
            result += b;
        }
        return result;
    }
//   getHello(): string {
//     return "Hello World!";
//   }
}