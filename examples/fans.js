const xhttp1 = new XMLHttpRequest();
xhttp1.addEventListener('load', getfans)
wallet = document.getElementById('activeAccount').textContent;
link = 'https://thankz-api.herokuapp.com/api/get/fansByArtist?pkh=';
var api = link + wallet;
console.log(api);
xhttp1.open('GET', 'https://thankz-api.herokuapp.com/thankz/get/fans?pkh=tz1LpQs9b1QXsw57jdkfvEdg31p4WTBVAUmd', true);

xhttp1.send();

function getfans() {
    if (this.readyState == 4 && this.status == 200){
        let datos = JSON.parse(this.responseText);
        console.log(datos);
        let res = document.querySelector('#resfans');
        res.innerHTML = '';
        
        for(let item of datos){
            if (item.holder.name == null) {
                item.holder.name = ''
            }
            if (item.holder.tzdomain == null) {
                item.holder.tzdomain = ''
            }
            if (item.holder.twitter == null) {
                item.holder.twitter = ''
            }
            res.innerHTML += `
            <tr >
                <td>${item.holder.address}</td>
                <td>${item.holder.name}</td>
                <td>${item.holder.tzdomain}</td>
                <td>${item.holder.twitter}</td>
                <td>${item.quantity}</td>
            </tr>
                  

                  
                `
            
            
        }
        
    }
}