window.sort_name =  true;
window.sort_artist = true;
window.sort_rate = true;

document.getElementById('link_name').addEventListener('click',sortName);

function sortName(){
    let t_body = document.getElementById('table_body');
    let t_rows = t_body.getElementsByTagName('TR');

    var arr = t_rows;
    let n = arr.length;
    for (let i = 0; i < n-1; i++){
        for (let j = 0; j < n-i-1; j++){
            console.log(arr[j],arr[j+1])
            var x = arr[j].getElementsByTagName('input')[0].value;
            var y = arr[j+1].getElementsByTagName('input')[0].value;
            if(sort_name){
                if (x > y){
                    arr[j].parentNode.insertBefore(arr[j+1], arr[j]);
                }
            }
            else{
                if (x < y){
                    arr[j].parentNode.insertBefore(arr[j+1], arr[j]);
                }       
            }
        }
    }    

    sort_name = sort_name ? false:true;
}

document.getElementById('link_artist').addEventListener('click',sortArtist);

function sortArtist(){
    let t_body = document.getElementById('table_body');
    let t_rows = t_body.getElementsByTagName('TR');

    var arr = t_rows;
    let n = arr.length;
    for (let i = 0; i < n-1; i++){
        for (let j = 0; j < n-i-1; j++){
            var x = arr[j].getElementsByTagName('input')[1].value;
            var y = arr[j+1].getElementsByTagName('input')[1].value;
            if(sort_artist){
                if (x > y){
                    arr[j].parentNode.insertBefore(arr[j+1], arr[j]);
                }
            }
            else{
                if (x < y){
                    arr[j].parentNode.insertBefore(arr[j+1], arr[j]);
                }   
            }
        }
    }    

    sort_artist = sort_artist ? false:true;

}


document.getElementById('link_rate').addEventListener('click',sortRate);

function sortRate(){
    let t_body = document.getElementById('table_body');
    let t_rows = t_body.getElementsByTagName('TR');

    var arr = t_rows;
    let n = arr.length;
    for (let i = 0; i < n-1; i++){
        for (let j = 0; j < n-i-1; j++){
            var x = arr[j].getElementsByTagName('input')[2].value;
            var y = arr[j+1].getElementsByTagName('input')[2].value;
            if(sort_rate){
                if (parseFloat(x) > parseFloat(y)){
                    arr[j].parentNode.insertBefore(arr[j+1], arr[j]);
                }
            }
            else{
                if (parseFloat(x) < parseFloat(y)){
                    arr[j].parentNode.insertBefore(arr[j+1], arr[j]);
                }     
            }
        }
    }    
    sort_rate = sort_rate ? false:true;
}