import { LightningElement,wire,api } from 'lwc';
// imports
 import getSimilarBoats from '@salesforce/apex/BoatDataService.getSimilarBoats'
 import {NavigationMixin} from 'lightning/navigation'
export default class SimilarBoats extends NavigationMixin(LightningElement) {
    // Private
    currentBoat;
    relatedBoats;
    boatId;
    error;
    
    // public
    get recordId() {
        // returns the boatId
        return this.boatId;
      }
      @api
      set recordId(value) {
          // sets the boatId value
          // sets the boatId attribute
          this.setAttribute('boatId',value)
          this.boatId=value;
      }
    
    // public
    @api
    similarBy;
    
    // Wire custom Apex call, using the import named getSimilarBoats
    // Populates the relatedBoats list
    @wire(getSimilarBoats,{boatId:'$boatId', similarBy:'$similarBy'})
    similarBoats({ error, data }) {
        if(error)
        {
            this.error=error;
        }
        else if(data){
            this.relatedBoats=data;
        }
     }
    get getTitle() {
      return 'Similar boats by ' + this.similarBy;
    }
    get noBoats() {
      return !(this.relatedBoats && this.relatedBoats.length > 0);
    }
    
    // Navigate to record page
    openBoatDetailPage(event) { 
       this.currentBoat=event.detail.boatId;
        this[NavigationMixin.Navigate]({
            type:'standard__recordPage',
            attributes:{
                objectApiName:'Boat__c',
                actionName:'view',
                recordId:this.currentBoat
        },
    });
    }
  }
  
