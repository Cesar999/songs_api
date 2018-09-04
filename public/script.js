//GET DATA
function getData(){
    fetch('/x', {method: 'GET'})
      .then(function(res) {
        if(res.ok) {
          return res.text();
        }
        throw new Error('Request failed.');
      })
      .then(res=>{
        fillTable(res);
        })
      .catch(function(error) {
        console.log(error);
      });
  }

//document.getElementById('btn_test').addEventListener('click',getData);
window.onload=getData();

function fillTable(data){
    let songs = JSON.parse(data);
    for(song of songs){
        var temp = document.getElementById("temp_songs");
        var cloned = temp.content.cloneNode(true);
        
        let tb = document.getElementById("table_body")
        tb.appendChild(cloned);
    
        let newRow = document.getElementById('new-row');
        let inputArr = newRow.getElementsByTagName('INPUT');
        newRow.id='';
    
        inputArr[0].value = song.name;
        inputArr[1].value = song.artist;
        inputArr[2].value = song.rate;
    }
}

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
        if(inputArr[0].readOnly){
            e.target.innerHTML = 'Update';
            Array.from(inputArr).forEach(function (child) {
                child.readOnly = false;
                child.style.backgroundColor = "rgba(110, 169, 245, 0.7)";
            });
            window.old_name = inputArr[0].value;
            window.old_artist = inputArr[1].value;
            window.old_rate = inputArr[2].value;
        }
        else{
            e.target.innerHTML= 'Edit';
            Array.from(inputArr).forEach(function (child) {
                child.readOnly = true;
                child.style.backgroundColor = 'white';
            }); 
            let new_name = inputArr[0].value;
            let new_artist = inputArr[1].value;
            let new_rate = inputArr[2].value;
            updateData(old_name,old_artist,old_rate,new_name,new_artist,new_rate);
            window.old_name = null;
            window.old_artist = null;
            window.old_rate = null;
        }
    }
 });

 function saveData(name, artist, rate){
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

  function updateData(old_name,old_artist,old_rate,new_name,new_artist,new_rate){
    fetch('/update', {
        method: 'PUT', 
        body: JSON.stringify({old_name,old_artist,old_rate,new_name,new_artist,new_rate}),
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
