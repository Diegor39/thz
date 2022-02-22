const xhttp = new XMLHttpRequest();
xhttp.addEventListener('load', onreadystatechange)
wallet = document.getElementById('activeAccount').textContent;

link = 'https://thankz-api.herokuapp.com/api/get/tokensByHolder?pkh=';
var api = link + wallet;

xhttp.open('GET', 'up_run.json', true);

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
                <div id="toggle" class="card cardho" style="width: 320px;" onclick="window.location.href='share.html?rafflesById?id==${resultado}'">
                    <img class="card-img-top"  src="https://cloudflare-ipfs.com/ipfs/${resultado}" alt="Card image cap">
                    <div class="card-body">
                    <div class="row">
                    <div class="col">
                    <h5 class="card-title">${item.event12}</h5>
                    </div>
                    <div class="col">
                    <p class="card-text" style="text-align: right;">Jupiter</p>
                    </div>
                    </div> 
                    <center><p class="card-text">1k subscribers celebration</p></center>
                  </div>
                  <div class="card-footer">
                    <p class="card-text" style="text-align: right;">${item.amount} tokens</p>
                  </div>
                </div>
            </div>
             `
            
            
        }
        
    }
}
