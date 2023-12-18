async function profilUpdateRequest(_token, _firstName, _lastName) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + _token);

    var raw = JSON.stringify({
        "firstName": _firstName, 
        "lastName": _lastName
    });

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return await fetch("http://localhost:3001/api/v1/user/profile", requestOptions)
        .then(response => response.json())
        .catch(error => {
            console.log('error', error);
            return error.json();
        });
}

export default profilUpdateRequest;

