const logout = async() => {

    const response = await fetch('/api/users/logout', {

        method: 'GET',
        headers: { 'Content-Type': 'application/json' }

    })

    if (response.ok) {

        document.location.replace('/');

    } else {

        alert(response.statusText);

    }

};

document.querySelectory('#logout').addEventListener('click', logout);