const xhttp1 = new XMLHttpRequest();
xhttp1.addEventListener('load', getfans)
wallet = document.getElementById('activeAccount').textContent;
link = 'https://thankz-api.herokuapp.com/api/get/collectionsByHolder?pkh=';
var api = link + wallet;
console.log(api);
xhttp1.open('GET', 'https://thankz-api.herokuapp.com/api/get/infoCollectionsByHolder?pkh=tz1LpQs9b1QXsw57jdkfvEdg31p4WTBVAUmd', true);

xhttp1.send();

function getfans() {
    if (this.readyState == 4 && this.status == 200){
        let datos = JSON.parse(this.responseText);
        
        let res = document.querySelector('#res');
        console.log(res);
        res.innerHTML = '';
        
        for(let item of datos){

            
            res.innerHTML += `
            <tr >
            <td>${item.address}</td>
            <td>${item.name}</td>
                <td>${item.website}</td>
                <td>${item.authors}</td>
                <td>${item.amount}</td>
            </tr>
                  

                  
                `
            
            
        }
        
    }
}