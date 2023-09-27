//
//Eliminar
//
//Opcion 1 : Con el evento click (javascript obstrusive / intrusivo)
function eliminarTarea(event) {
    //alert(event); //Chequeo que llegue el parametro
    //alert(event.constructor.name); //Quiero saber de que tipo es el parametro event
    //alert(event.target); //El objeto sobre el que hicieron click
    //console.dir(event.target);
    Swal.fire({
        title: "Eliminar",
        icon: 'warning',
        text: "Desea eliminar la tarea?",
        showCancelButton: true
    }).then((resp) => {
        if (resp.isConfirmed) {
            const li = event.target.parentElement;
            const ul = event.target.parentElement.parentElement; //const ul = document.querySelector("ul");
            ul.removeChild(li);
        }
    });
}

//Opcion 2 : Javascript unostrusive (javavascript no intrusivo)
//alert(document.querySelector("ul")); //dice null 
window.addEventListener("load", () => {
    //alert(document.querySelector("ul")); //Ahora no dice mas null 
    let botones = document.querySelectorAll("li>button");
    botones.forEach((boton) => {
        boton.addEventListener("click", eliminarTarea);
    })
});

//
// Agregar tarea
//
function agregarTarea() {
    let tareaNueva = document.querySelector("input").value;
    if (tareaNueva.length > 0) {

        /*
        <li class="list-group-item">
            Lavar los platos
            <button class="btn btn-danger float-end">-</button>
        </li>
        */
        //
        //Opcion 1 : createElement()
        //
        /*let li = document.createElement("li");
        li.className = "list-group-item";
        li.innerText = tareaNueva;

        let button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-danger");
        button.classList.add("float-end");
        button.onclick = eliminarTarea;
        button.innerText = "-";

        li.appendChild(button);
        document.querySelector("ul").appendChild(li);*/

        //
        //Opcion 2 : Strings Interpolados (OJO que pierdo los eventos)
        //
        let componente =
            `<li class="list-group-item">
                            ${tareaNueva}
                            <button class="btn btn-danger float-end">&#128465;&#65039;</button>
                        </li>`;
        document.querySelector("ul").innerHTML += componente;  //Pierdo los eventos que tenia antes
        document.querySelectorAll("li>button").forEach((boton) => {
            boton.addEventListener("click", eliminarTarea);
        });
        document.querySelector("button.btn-outline-primary").onclick = agregarTarea;

        document.querySelector("input").value = "";
    }
}

window.addEventListener("load", () => {
    const botonAdd = document.querySelector("button.btn-outline-primary");
    botonAdd.addEventListener("click", agregarTarea)  // botonAdd.onclick = () => { ...}     
});

