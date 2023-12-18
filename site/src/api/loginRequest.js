async function loginRequest(_email, _password) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": _email,
        "password": _password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return await fetch(process.env.REACT_APP_API_URL + "/user/login", requestOptions)
        .then(response => response.json())
        .catch(error => console.log('login request error : ', error));
}

export default loginRequest;