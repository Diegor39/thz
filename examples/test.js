
document.querySelector('#boton').addEventListener('click',traerDatos());

function traerDatos(){
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'test.json', true);

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            let datos = JSON.parse(this.responseText);
            console.log(datos);
            let res = document.querySelector('#res');
            res.innerHTML = '';
            
            for(let item of datos){
                
                
                res.innerHTML += `

                <div tabindex="0" class="card cardho" style="width: auto;height: auto;" onclick='document.getElementById("resToken").innerHTML = "${item.name}";'>
                    <img  class="card-img-top" src="https://cloudflare-ipfs.com/ipfs/${item.artifact_uri}" alt="Card image cap">
                    <div class="card-body">
                        <p>${item.name}</p>
                    </div>
                </div> `
                var nombre = document.getElementById("resToken").value;
                document.getElementById("resToken2").innerHTML = nombre;
                document.getElementById("resToken3").innerHTML = nombre;
                
            }
            
            
        }
    }
}

