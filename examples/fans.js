const xhttp1 = new XMLHttpRequest();
xhttp1.addEventListener('load', getfans)
xhttp1.open('GET', 'testfans.json', true);

xhttp1.send();

function getfans() {
    if (this.readyState == 4 && this.status == 200){
        let datos = JSON.parse(this.responseText);
        console.log(datos);
        let res = document.querySelector('#res');
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