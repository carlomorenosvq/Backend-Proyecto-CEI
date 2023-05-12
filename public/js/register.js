form.addEventListener('submit', () =>{
    const register = {
        email: document.getElementById('email').value ,
        password: document.getElementById('password').value
    }
    fetch('api/register',{
        method: 'POST',
        body: JSON.stringify(register),
        headers: {
            'Content-Type': "application/json"
        }
    }).then(res=>res.json()).then(data =>{
        if(data.status == "error"){
            alert('El correo ya existe');
        }else{
            alert('Registrado');
        }
    })
});