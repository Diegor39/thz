    const xhttp = new XMLHttpRequest();
    xhttp.addEventListener('load', onreadystatechange)
    wallet = document.getElementById('activeAccount').textContent;
    
    link = 'https://thankz-api.herokuapp.com/thankz/get/tokens?pkh=';
    var api = link + wallet;

    xhttp.open('GET', 'https://thankz-api.herokuapp.com/thankz/get/tokens?pkh=tz1QoBmGHY7K7w77GVZxRo1fyVKvJDgQsVFC', true);

    xhttp.send();

    function onreadystatechange() {
        if (this.readyState == 4 && this.status == 200){
            let datos = JSON.parse(this.responseText);
            
            let res = document.querySelector('#res');
            res.innerHTML = '';
            
            for(let item of datos){
                
                var url_img = item.artifact_uri;
                var url_img_b = /ipfs:/;
                var resultado = url_img.replace(url_img_b, '');
                
                
                res.innerHTML += `
                <div >
                    <div data-toggle="modal" data-target="#exampleModalCenter" id="toggle" class="card cardho" style="width: 250px;margin-top: 4%; margin-left: 5%; "  onclick='document.getElementById("resToken").innerHTML = "${item.name}"; document.getElementById("resImg").innerHTML = "https://cloudflare-ipfs.com/ipfs/${resultado}"; document.getElementById("toggle").style.display = "block";'>
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



