function dragMaterial(user, event) {
    event.dataTransfer.setData('UserClass', user.className);
    event.dataTransfer.setData('UserId', user.id);
}
function dropPapel(target, event) {
    let userId = event.dataTransfer.getData('UserId');
    let userClass = event.dataTransfer.getData('UserClass');

    if (userClass == "almacen_papel") {
        target.appendChild(document.getElementById(userId));
    }
}
function dropCarton(target, event) {
    let userId = event.dataTransfer.getData('UserId');
    let userClass = event.dataTransfer.getData('UserClass');

    if (userClass == "almacen_carton") {
        target.appendChild(document.getElementById(userId));
    }
}
function dropAlmacen(target, event) {
    let userId = event.dataTransfer.getData('UserId');
    let userClass = event.dataTransfer.getData('UserClass');
    console.log(userId);
    console.log(userClass);

    target.appendChild(document.getElementById(userId));
}