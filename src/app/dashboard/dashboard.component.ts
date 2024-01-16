import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/common/dataService';
import { trigger, keyframes, animate, transition } from "@angular/animations";
import * as kf from './keyframes';
// import { flush } from '@angular/core/testing';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('Animator', [
      transition('* => right', animate(750, keyframes(kf.right))),
      transition('* => left', animate(750, keyframes(kf.left)))
    ])
  ]
})
export class DashboardComponent implements OnInit {
  name: any;
  dataArray:any;
  ListView: boolean = true;
  detailsarray:any;
  count: any;
  userDataArray: any;
  currentUser: any;
  animationState:any;
  currentIndex = 0;
  recomendation: boolean = false;
  TotalRecomendation: number = 0;
  Rejected: number = 0;
  Accepted: number = 0;
  noRecomendation: boolean = false;
  password: any;
 
  constructor(private router :Router,private dataService:DataService){
    
  }
  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.password = localStorage.getItem('password');

    this.dataService.getData().subscribe(data =>{
      this.dataArray = data;
    })
    // Get number of approved and rejected
    this.getAnalytics()
  }
  getAnalytics(){
    this.dataService.getUserData().subscribe(data =>{
      this.userDataArray = data;
      this.GetCount();
    })
  }

  GetCount(){
    this.TotalRecomendation = this.userDataArray.length;
    this.Rejected = this.userDataArray.filter((item: { Interested: boolean; }) => item.Interested === false).length
    this.Accepted = this.userDataArray.filter((item: { Interested: boolean; }) => item.Interested === true).length
  }

  newPage(){
    this.currentIndex = 0;
    this.recomendation = true;
    this.noRecomendation = this.userDataArray.filter((ele: { Interested: any; })=>ele.Interested==="").length > 0 ? false : true;
    this.currentUser = this.userDataArray.filter((ele: { Interested: any; })=>ele.Interested==="")[this.currentIndex];
  }
  help(){
    alert("our team will reach you....")
  }
  back(){
    this.ListView =  true;
    this.recomendation = false;
    this.GetCount();
  }
  goToProfileDetails(value:any): void {
    this.ListView = false;
    this.detailsarray = value;

  }
  skipProfile(value:any){
    const index = this.dataArray.indexOf(value);
    
    if (index !== -1) {
      this.dataArray.splice(index, 1);
    }
    alert("profile was skipped")

  }
  Logout() {
    localStorage.removeItem(this.name);
    localStorage.removeItem(this.password)
    this.router.navigate([''])

  }
  profInterest(){
    this.showAlert('right');
    this.ListView = true;
  }
  Swipe(event:String){
    this.showAlert(event);
    this.addInterest(event);
    this.animationState = event;
  }

  startAnimation(state:any) {
    this.showAlert(state);
    if (!this.animationState) {
      this.animationState = state;
    }
    this.addInterest(state);
  }

  resetAnimationState(state:any) {
    if(state.toState){
      this.animationState = '';
      // this.currentIndex++;
      if(this.userDataArray.filter((ele: { Interested: any; })=>ele.Interested==="").length > 0){
        this.currentUser = this.userDataArray.filter((ele: { Interested: any; })=>ele.Interested==="")[0];
      }else{
        this.noRecomendation = true;
      }
      this.GetCount()
    }
  }
  showAlert(event:any){
    if(event == "left"){
      alert("Not Interested")
    }else{ 
      alert("Interested")
    }
  }
  shortList(msg:string){
    alert(msg);
    this.addInterest('right');
    this.animationState = 'right';

  }
  
  addInterest(event:any){
    let IsIntersted: boolean = true;
    if(event == "left"){
      IsIntersted = false;
    }
    let ind  = this.userDataArray.findIndex((ele: { id: any; }) => ele.id === this.currentUser.id)
    this.userDataArray[ind].Interested = IsIntersted;
  }
}
