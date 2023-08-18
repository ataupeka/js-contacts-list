const addBtn = document.getElementById('submit-btn');
const deleteBtn = document.getElementById('cansel-btn');
const resetBtn = document.getElementById('reset-btn');
const recordContainer = document.querySelector('record-container');


const name = document.getElementById('name');
const address = document.getElementById('address');
const number = document.getElementById('contact-number');

let contactArray = [];
let id = 0;


function contact(id, name, address, number){
    this.id = id;
    this.name = name;
    this.address = address;
    this.number = number;

}


document.addEventListener('DOMContentLoaded', function(){

    if(localStorage.getItem('contacts') == null){
        contactArray = [];
    } else{
        contactArray = JSON.parse(localStorage.getItem('contacts'));
    }
  
   displayRecord();
});

function displayRecord(){
    contactArray.forEach(function(singleContact){
        addToList(singleContact);
    });

  
}

//add contact record


addBtn.addEventListener('click', function(){
    if(checkInputFields([name, address, number])){
        setMessage("success", "Record added successfully!");
    
    id++;

    const contact = new contact(id, name.value, address.value, number.value);
    contactArray.push(contact);

    //storing contact record in local storage
    localStorage.setItem('contacts', JSON.stringify(contactArray));
    clearInputFields();


    //add to list
    addToList(contact);
} else {
    setMessage("error", "Invalid input!")
}
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

    //delete record

    recordContainer.addEventListener('click', function(event){
        //console.log(event.target);
        if(event.target.id === 'delete-btn'){
            //removing from DOM
            let recordItem = event.target.parentElement;
            recordContainer.removeChild(recordItem);
            let tempContactList = contactArray.filter(function(record){
                return(record.id === parseInt(recordItem.firstElementChild.lastElementChild.textContent));

            });
            contactArray = tempContactList;
            //removing from localstorage

            localStorage.setItem('contacts', JSON.stringify(contactArray));
        }

    });

//resetting everything

resetBtn.addEventListener('click', function(){
    contactArray = [];
    localStorage.setItem('contacts', JSON.stringify(contactArray));
    location.reload();
})




    // displaying status

    function setMessage(status, message){
        let messageBox = document.querySelector('.message');
        if(status == "error"){
            messageBox.innerHTML = `${message}`;
            messageBox.classList.add('error');
            removeMessage(status, messageBox);
        }
         if(status == "success"){
            messageBox.innerHTML = `${message}`;
            messageBox.classList.add('success');
            removeMessage(status, messageBox);
        }
    }


    //clearing input

    deleteBtn.addEventListener('click', function(){
        clearInputFields();

    });

    function  clearInputFields(){
        name.value = "";
        address.value = "";
        number.value = "";
    }

    //removing status

    function removeMessage(status, messageBox){
        setTimeout(function(){
            messageBox.classList.remove(`${status}`);
        }, 2000);
        
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


    //phone number validation function

    function phoneNumberCheck(inputtext){
        let phoneNumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(inputtext.match(phoneNumber)){
            return true;

        } else{
            return false;
        }
    }





    
