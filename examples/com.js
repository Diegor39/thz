const xhttp1 = new XMLHttpRequest();
xhttp1.addEventListener('load', getfans)
xhttp1.open('GET', 'testco.json', true);

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
                <td>${item.network}</td>
                <td>${item.count}</td>
            </tr>
                  

                  
                `
            
            
        }
        
    }
}