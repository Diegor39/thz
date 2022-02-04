    const xhttp = new XMLHttpRequest();
    xhttp.addEventListener('load', onreadystatechange)
    wallet = document.getElementById('activeAccount').textContent;
    console.log(wallet);
    link = 'https://thankz-api.herokuapp.com/api/get/tokensByHolder?pkh=';
    var api = link + wallet;
    console.log(api);
    xhttp.open('GET', 'https://thankz-api.herokuapp.com/api/get/tokensByHolder?pkh=tz1UUSrrxHq647suLgAngWE481UTbzUonf9G', true);

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
                <div >
                    <div id="toggle" class="card cardho" style="width: 250px;margin-top: 4%; margin-left: 5%; "  onclick='document.getElementById("resToken").innerHTML = "${item.name}"; document.getElementById("resImg").innerHTML = "https://cloudflare-ipfs.com/ipfs/${resultado}"; document.getElementById("toggle").style.display = "block";'>
                        <img class="card-img-top" style="max-height: 300px; min-height: 300px;" src="https://cloudflare-ipfs.com/ipfs/${resultado}" alt="Card image cap">
                
                        <div class="card-body">
                            <p>${item.name}</p>
                        </div>
                    </div>
                </div>
                 `
                
                
            }
            
        }
    }



