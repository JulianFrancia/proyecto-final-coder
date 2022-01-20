function signUp() {
    const name = document.getElementById("registerName");
    const password = document.getElementById("registerPassword");
    const email = document.getElementById("registerEmail");

    const dataSignUp = {
        name: name.value,
        password: password.value,
        email: email.value
    }
    fetch("http://localhost:8080/register", {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(dataSignUp)
    })
}