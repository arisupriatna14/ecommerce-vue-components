Vue.component('form-signin', {
  template: `
    <div class="row">
      <div class="offset-lg-3"></div>
      <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12">
        <div class="center">
          <h1>Sign In</h1>
        </div>
        <form @submit.prevent="signin">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div class="offset-lg-3"></div>
    </div>
  `,

  data: function() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    signin: function() {
      axios({
        method: 'POST',
        url: 'http://localhost:3030/api/customers/signin',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(result => {
          localStorage.setItem('token', result.data.token)
          swal({
            type: 'success',
            title: 'Signin success',
            text: 'Congrats',
          })
          setTimeout(() => {
            window.location = 'http://localhost:8080/home.html'
          }, 2000)
        })
        .catch(err => {
          swal({
            type: 'error',
            title: 'Email or password wrong',
            text: 'Try again!',
            footer: '<a href>Why do I have this issue?</a>'
          })
        })
    },
  }
})