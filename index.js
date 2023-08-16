const addBtn = document.getElementById('submit-btn');
const deleteBtn = document.getElementById('cansel-btn');
const resetBtn = document.getElementById('reset-btn');
const recordContainer = document.querySelector('record-container');


const name = document.getElementById('name');
const address = document.getElementById('address');
const number = document.getElementById('contact-number');

let contactArray = [];
let id = 0;


function Contact(id, name, address, number){
    this.id = id;
    this.name = name;
    this.address = address;
    this.number = number;

}


document.addEventListener('DOMContentLoaded', function(){
   contactArray = [
    {
        id: 10,
        name: "Ivan",
        address: "Montreal",
        number: "1514-298-9443"
    }
   ]
   displayRecord();
});

function displayRecord(){
    contactArray.forEach(function(singleContact){
        addToList(singleContact);
    });

  
}

//add contact record


addBtn.addEventListener('click', function(){
    id++;
    const contact = new Contact(id, name.value, address.value, number.value);
    contactArray.push(contact);


    //add to list
    addToList(contact);
});



//add to List(on the DOM)
    function addToList(item){
        const newRecordDiv = document.createElement('div');
        newRecordDiv.classList.add('record-item');
        newRecordDiv.innerHTML = `
        <div class="record-container">
        <div class="record-item">
           <div class="record-element">
    <span id="labelling"> Contact ID:</span>
    <span id="contact-id"> ${item.id}</span>
    </div>
    
    <div class="record-element">
        <span id="labelling">  Name:</span>
        <span id="name-content"> ${item.name}</span>
    </div>
    
    
    <div class="record-element">
        <span id="labelling">  Address:</span>
        <span id="address-content"> ${item.address}</span>
    </div>
    
    <div class="record-element">
        <span id="labelling">  Pnone Number:</span>
        <span id="address-content"> ${item.number} </span>
    </div>
    
    <button type="button" id="delete-btn"> 
        <span> <i class="fas fa-trash"></i></span> Delete </button>
        `;
        recordContainer.appendChild(newRecordDiv);
    }


    //input field validation

    function checkInputFields(inputArr){
        for( let i = 0; i < inputArr.legth; i++){
            if(inputArr[i].value === ""){
                return false;
            }
        }
        if(!phoneNumberCheck(inputArr[2].value)){
            return false;
        }

        return true;
    }




    
