    const xhttp = new XMLHttpRequest();
    xhttp.addEventListener('load', onreadystatechange)
    xhttp.open('GET', 'https://thankz-api.herokuapp.com/api/get/tokensByHolder?pkh=tz1ZLedXnXnPbk43LD1sHHG3NMXG7ZveZ1jr', true);

    xhttp.send();

    function onreadystatechange() {
        if (this.readyState == 4 && this.status == 200){
            let datos = JSON.parse(this.responseText);
            console.log(datos);
            let res = document.querySelector('#res');
            res.innerHTML = '';
            
            for(let item of datos){
                
                var url_img = item.artifact_uri;
                var url_img_b = /ipfs:/;
                var resultado = url_img.replace(url_img_b, '');
                console.log(resultado)
                
                res.innerHTML += `

                <div tabindex="0" class="card cardho" style="max-width: 13%;" onclick='document.getElementById("resToken").innerHTML = "${item.name}"; document.getElementById("resImg").innerHTML = "https://cloudflare-ipfs.com/ipfs/${resultado}"; document.getElementById("toggle").style.display = "block";'>
                    <img class="card-img-top" style="max-height: 70%; min-height: 70%;" src="https://cloudflare-ipfs.com/ipfs/${resultado}" alt="Card image cap">
                    
                    <div class="card-body">
                        <p>${item.name}</p>
                    </div>
                </div> `
                
                
            }
            
        }
    }



