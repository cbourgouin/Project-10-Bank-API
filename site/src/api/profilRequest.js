async function profilRequest(_token) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + _token);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };

    return await fetch("http://localhost:3001/api/v1/user/profile", requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
}

export default profilRequest;