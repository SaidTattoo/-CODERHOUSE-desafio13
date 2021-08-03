

// inicializamos la conexion
const socket = io.connect();
socket.on("products list", (data) => {
  console.log("products list", data);
});

const $titleData = document.getElementById("title");
const $priceData = document.getElementById("price");
const $thumbnailData = document.getElementById("thumbnail");
const $addList = document.getElementById("addList");
const $table = document.getElementById("table");
const $mensaje  = document.getElementById("txtmessage"); 
const $username = document.getElementById("username")
const $enviarMsj = document.getElementById("enviarMsj");
/**
 * Productos
 */

const template = Handlebars.compile(`
<div class="table-responsive">
    <table class="table table-dark">
        <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Foto</th>
        </tr>
        {{#each products}}
        <tr>
            <td>{{this.title}}</td>
            <td>$ {{this.price}}</td>
            <td><img width="50" src={{this.thumbnail}} alt="sin imagen"></td>
        </tr>
        {{/each}}
    </table>
</div>

`);


const templateMensajes =  Handlebars.compile(`
<ul>
  {{#each mensajes }}
  <li> <p class="usuario">{{this.usuario}}:</p><p class="mensaje">{{this.mensaje}}</p></li>
  <span>{{this.fecha}}</span>
  {{/each}}
</ul>
`)

socket.on("productData", (data) => {
    console.log("--->",data)
  $("#table").html(
    template({  products: data.products })
  );
});
socket.on("disconnect",  socket => {
  console.log("un usuario se desconecto")
})



// Cuando el usuario haga click en el boton se envia el socket con el mensaje del input
const addProduct = () => {
  const data = {
    title: $titleData.value,
    price: $priceData.value,
    thumbnail: $thumbnailData.value
  };
  socket.emit("addNewProduct", data);
};

$addList.addEventListener("click", addProduct);

/**
 *
 * Chat
 *  
 */
const enviarmensajes = () => {
    if(username.value !== ""){
      socket.emit("crearMensaje",{
        usuario: $username.value,
        mensaje: $mensaje.value,
        fecha: moment().format('LLL')
      }, (mensajes) => {
        console.log("callback", mensajes)
      })
    }else{
      alert("agregar email")
      username.focus();
    }
  
}

socket.on("crearMensaje",  (mensajes) => {
  console.log(mensajes)
  $("#mensajes").html(
    templateMensajes({  mensajes: mensajes })
  );
});


$enviarMsj.addEventListener("click",enviarmensajes);


