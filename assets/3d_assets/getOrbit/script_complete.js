const model = document.querySelector('#jordan1');

// ${variable}: When you enclose a variable or an expression in ${ } within a string, the value of that variable or the result of that expression is inserted into the string.

function getOrbit(){
    console.log(`${model.getCameraOrbit()}`);
}

function setOrbit(orbit){
    model.cameraOrbit = orbit;
    console.log(orbit);
}


