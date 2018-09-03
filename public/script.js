let btnCreate = document.getElementById("btn_create");
btnCreate.addEventListener('click',createRow);

var iName = document.getElementById("name");
var iArtist = document.getElementById("artist");
var iRate = document.getElementById("rate");

//Create Row
function createRow(e){
    e.preventDefault();

    let b1 = iName.checkValidity();
    let b2 = iArtist.checkValidity();
    let b3 = iRate.checkValidity();
    if(b1&&b2&&b3){
    var temp = document.getElementById("temp_songs");
    var cloned = temp.content.cloneNode(true);
    
    let tb = document.getElementById("table_body")
    tb.appendChild(cloned);

    let newRow = document.getElementById('new-row');
    let inputArr = newRow.getElementsByTagName('INPUT');
    newRow.id='';
    console.log(inputArr);

    inputArr[0].value = iName.value;
    inputArr[1].value = iArtist.value;
    inputArr[2].value = iRate.value;

    //Save data to the databse
    saveData(iName.value, iArtist.value, iRate.value);

    iName.value='';
    iArtist.value='';
    iRate.value='';
    }
    else{alert("Not valid input");}
}

//Remove Row
document.addEventListener('click',function(e){
    if(e.target && e.target.id == 'btn_remove'){
        let inputArr = e.target.parentNode.parentNode.getElementsByTagName('INPUT');
        console.log(inputArr);
        let name = inputArr[0].value;
        let artist = inputArr[1].value;
        let rate = inputArr[2].value;
        deleteData(name,artist,rate);
        e.target.parentNode.parentNode.remove();
    }
 });


 //Update Row
 document.addEventListener('click',function(e){
    if(e.target && e.target.id == 'btn_update'){
        let inputArr=e.target.parentNode.parentNode.getElementsByTagName('INPUT');
        let name;
        let artist;
        let rate;
        let name1;
        let artist1;
        let rate1;

        if(inputArr[0].readOnly){
            e.target.innerHTML = 'Update';
            Array.from(inputArr).forEach(function (child) {
                child.readOnly = false;
                child.style.backgroundColor = "rgba(110, 169, 245, 0.7)";
            });
            name1 = inputArr[0].value;
            artist1 = inputArr[1].value;
            rate1 = inputArr[2].value;
        }
        else{
            e.target.innerHTML= 'Edit';
            Array.from(inputArr).forEach(function (child) {
                child.readOnly = true;
                child.style.backgroundColor = 'white';
            }); 
            name = inputArr[0].value;
            artist = inputArr[1].value;
            rate = inputArr[2].value;
            updateData(name,artist,rate,name1,artist1,rate1);
        }

    }
 });

 function saveData(name, artist, rate){
    console.log('button was clicked');
    fetch('/add', {
        method: 'POST', 
        body: JSON.stringify({name, artist, rate}),
        headers: {"Content-Type": "application/json"}})
      .then(function(response) {
        if(response.ok) {
          console.log('song was recorded');
          return;
        }
        throw new Error('Request failed.');
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function deleteData(name, artist, rate){
    console.log('button was clicked');
    fetch('/delete', {
        method: 'DELETE', 
        body: JSON.stringify({name, artist, rate}),
        headers: {"Content-Type": "application/json"}})
      .then(function(response) {
        if(response.ok) {
          console.log('song was remove');
          return;
        }
        throw new Error('Request failed.');
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function updateData(name, artist, rate,name1, artist1, rate1){
    fetch('/update', {
        method: 'PUT', 
        body: JSON.stringify({name, artist, rate,name1, artist1, rate1}),
        headers: {"Content-Type": "application/json"}})
      .then(function(response) {
        if(response.ok) {
          console.log('song was update');
          return;
        }
        throw new Error('Request failed.');
      })
      .catch(function(error) {
        console.log(error);
      });
  }