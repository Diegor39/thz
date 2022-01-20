


const xhttp = new XMLHttpRequest();
xhttp.addEventListener("load", onreadystatechange);
xhttp.open('GET', 'https://thankz-api.herokuapp.com/api/tokens?pkh=tz1ZLedXnXnPbk43LD1sHHG3NMXG7ZveZ1jr');
xhttp.send();

function onreadystatechange(){
    if (this.readyState == 4 && this.status == 200){
        let datos = JSON.parse(this.responseText);
        console.log(datos);
        let res = document.querySelector('#res');
        res.innerHTML = '';
            
        for(let item of datos){
                
                
            res.innerHTML += `

            <div tabindex="0" class="card cardho" style="max-width: 13%;" onclick='document.getElementById("resToken").innerHTML = "${item.name}"; document.getElementById("resImg").innerHTML = "https://cloudflare-ipfs.com/ipfs/${item.artifact_uri}"; document.getElementById("toggle").style.display = "block";'>
                <img class="card-img-top" src="https://cloudflare-ipfs.com/ipfs/${item.artifact_uri}" alt="Card image cap">
                    
                <div class="card-body">
                    <p>${item.name}</p>
                </div>
            </div> `
                
                
        }
            
    }
}




