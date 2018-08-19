Vue.component('form-signup', {
  template:  `
    <div class="row">
      <div class="offset-lg-3"></div>
      <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <div class="center">
          <h1>Sign Up</h1>
        </div>
        <form @submit.prevent="signup">
          <div class="form-group">
            <label>Fullname</label>
            <input type="text" class="form-control" v-model="fullname" placeholder="Enter fullname">
          </div>
          <div class="form-group">
            <label>Email address</label>
            <input type="email" class="form-control" v-model="email" placeholder="Enter email">
            <small class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div class="offset-lg-3"></div>
    </div>
  `,

  data: function() {
    return {
      fullname: '',
      email: '',
      password: ''
    }
  },

  methods: {
    signup: function() {
      axios({
        method: 'POST',
        url: 'http://localhost:3030/api/customers',
        data: {
          fullname: this.fullname,
          email: this.email,
          password: this.password
        }
      })
        .then(result => {
          localStorage.setItem('token', result.data.token)
          swal({
            type: 'success',
            title: 'Signup success',
            text: 'Congratulations 🎉',
          })
          setTimeout(() => {
            window.location = 'http://localhost:8080/home.html'
          }, 2000)
        })
        .catch(err => {
          swal({
            type: 'error',
            title: 'Email already exists, or Password must have one uppercase, lowercase, number, and a minimum length of 6 characters',
            text: 'Try again!',
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
    }
  }
})