


    const xhttp = new XMLHttpRequest();
    xhttp.addEventListener('load', onreadystatechange)
    xhttp.open('GET', 'https://thankz-api.herokuapp.com/api/get/tokensByHolder?pkh=tz1UTntWEAGVyNXKRSMsV8RjBwuHEVjHNPdy', true);

    xhttp.send();

    function onreadystatechange() {
        if (this.readyState == 4 && this.status == 200){
            let datos = JSON.parse(this.responseText);
            console.log(datos);
            let res = document.querySelector('#res');
            res.innerHTML = '';
            
            for(let item of datos){
                
                var url_img = item.artifact_uri;
                url_img = /^ipfs:/;
                console.log(url_img)
                
                res.innerHTML += `

                <div tabindex="0" class="card cardho" style="max-width: 13%;" onclick='document.getElementById("resToken").innerHTML = "${item.name}"; document.getElementById("resImg").innerHTML = "https://cloudflare-ipfs.com/ipfs/${item.artifact_uri}"; document.getElementById("toggle").style.display = "block";'>
                    <img class="card-img-top" style="max-height: 70%; min-height: 70%;" src="https://cloudflare-ipfs.com/ipfs/${url_img}" alt="Card image cap">
                    
                    <div class="card-body">
                        <p>${item.name}</p>
                    </div>
                </div> `
                
                
            }
            
        }
    }




