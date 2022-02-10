const xhttp1 = new XMLHttpRequest();
xhttp1.addEventListener('load', getfans)
wallet = document.getElementById('activeAccount').textContent;
link = 'https://thankz-api.herokuapp.com/api/get/fansByArtist?pkh=';
var api = link + wallet;
console.log(api);
xhttp1.open('GET', 'https://thankz-api.herokuapp.com/api/get/fansByArtist?pkh=tz1LpQs9b1QXsw57jdkfvEdg31p4WTBVAUmd', true);

xhttp1.send();

function getfans() {
    if (this.readyState == 4 && this.status == 200){
        let datos = JSON.parse(this.responseText);
        console.log(datos);
        let res = document.querySelector('#resfans');
        res.innerHTML = '';
        
        for(let item of datos){
            
            res.innerHTML += `
            <tr >
                <td>${item.address}</td>
                <td>${item.alias}</td>
                <td>${item.tzdomain}</td>
                <td>${item.twitter}</td>
                <td>0</td>
            </tr>
                  

                  
                `
            
            
        }
        
    }
}