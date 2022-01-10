
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
                console.log(item.creators);
                res.innerHTML += `
                <div class="card cardho" style="width: 190px;height: 300px;">
                    <img class="card-img-top" src="https://assets.objkt.media/file/assets-001/KT1LHHLso8zQWQWg1HUukajdxxbkGfNoHjh6/0/7/2507/artifact.png" alt="Card image cap">
                    <div class="card-body">
                        <p>${item.name}</p>
                    </div>
                </div> `
            }
            
        }
    }
}