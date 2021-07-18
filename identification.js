// localStorage.clear()
const signin = document.getElementById('signinForm')
const signout = document.getElementById('signout')

signin.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log({e})

    const password = document.getElementById('password').value 
    if (password == "magic") {
        localStorage.setItem('admin', true)
    }
})


signout.addEventListener('click', (e) => {
   e.preventDefault();
   
   localStorage.setItem('admin', false)
   console.log('sign out')
})

