const token = localStorage.getItem('token')

if (!token) {
  window.location = 'http://localhost:8080/signin.html'
}