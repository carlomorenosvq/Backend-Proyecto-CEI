form.addEventListener('submit', () =>{
    const login = {
        email: document.getElementById('email').value ,
        password: document.getElementById('password').value,
    }
    fetch('/api/login',{
        method: 'POST',
        body: JSON.stringify(login),
        headers:{
            'Content-Type': "application/json"
        }
    }).then(res=>res.json()).then(data =>{
        if(data.status == "error"){
            alert('Usuario o contraseña incorrecta');
            window.location.reload('./login.html');
        }else{
            alert('Dentro makina');
        }
    })
});