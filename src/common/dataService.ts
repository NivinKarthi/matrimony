import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";


@Injectable({
    providedIn:'root'
})

export class DataService{
    private profileUrl = 'assets/user.json';
    private detailUrl = 'assets/highlightUser.json';
   
    constructor(private http:HttpClient){}
    
    getData():Observable<any>{
        return this.http.get<any>(this.profileUrl);
    }
    getUserData():Observable<any>{
        return this.http.get<any>(this.detailUrl);
    }
 
}