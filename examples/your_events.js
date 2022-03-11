const xhttp1 = new XMLHttpRequest();
xhttp1.addEventListener('load', getfans)
wallet = document.getElementById('activeAccount').textContent;
link = 'https://thankz-api.herokuapp.com/api/get/fansByArtist?pkh=';
var api = link + wallet;
console.log(api);
xhttp1.open('GET', 'https://thankz-api.herokuapp.com/contract-test/get/eventsByUser?pkh=tz1QoBmGHY7K7w77GVZxRo1fyVKvJDgQsVFC', true);

xhttp1.send();

function getfans() {
    if (this.readyState == 4 && this.status == 200){
        let datos = JSON.parse(this.responseText);
        console.log(datos);
        let res = document.querySelector('#resfans');
        res.innerHTML = '';
        
        for(let item of datos){
            if (item.tittle == null) {
                item.tittle = ''
            }
            if (item.tittle == null) {
                item.tittle = ''
            }
            if (item.tittle == null) {
                item.tittle = ''
            }
        

            res.innerHTML += `
            <tr >
                <td>${item.tittle}</td>
                <td>${item.type}</td>
                <td>${item.available_tickets}</td>
                <td>${item.total_tickets}</td>
                <td>${item.id}</td>
                <td>${item.price}</td>
                <td><button class="btn btn-outline-primary my-2 my-sm-0" onclick="window.location.href='share.html?rafflesById=${item.id}'">Open</button></td>
            </tr>
                  

                  
                `
            
            
        }
        
    }
}
