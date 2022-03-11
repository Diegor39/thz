const xhttp = new XMLHttpRequest();
xhttp.addEventListener('load', onreadystatechange)
wallet = document.getElementById('activeAccount').textContent;

link = 'https://thankz-api.herokuapp.com/api/get/tokensByHolder?pkh=';
var api = link + wallet;

xhttp.open('GET', 'https://thankz-api.herokuapp.com/contract-test/get/activeEvents', true);

xhttp.send();

function onreadystatechange() {
    if (this.readyState == 4 && this.status == 200){
        let datos = JSON.parse(this.responseText);
        
        let res = document.querySelector('#res');
        res.innerHTML = '';
        
        for(let item of datos){
            
            //var url_img = item.artifact_uri;
            //var url_img_b = /ipfs:/;
            //var resultado = url_img.replace(url_img_b, '');
            
            
            res.innerHTML += `
            <div >
                <div id="toggle" class="card cardho" style="width: 320px;" onclick="window.location.href='share.html?rafflesById=${item.id}'">
                    <img class="card-img-top"  src="https://cloudflare-ipfs.com/ipfs/" alt="Card image cap">
                    <div class="card-body">
                    <div class="row">
                    <div class="col">
                    <h5 class="card-title">${item.type}</h5>
                    </div>
                    <div class="col">
                    <p class="card-text" style="text-align: right;">${item.creator_name}</p>
                    </div>
                    </div> 
                    <p class="card-text">${item.tittle}</p>
                  </div>
                  <div class="card-footer">
                    <p class="card-text" style="text-align: right;">${item.available_tickets}/${item.total_tickets} tokens</p>
                  </div>
                </div>
            </div>
             `
            
            
        }
        
    }
}
