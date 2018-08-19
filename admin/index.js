var app = new Vue({
  el: "#app",
  data: {
    email: "",
    password: "",
    listAllItem: [],
    imgUrl: "",
    title: "",
    price: "",
    category: "",
    itemUpdate: [],
    image: ""
  },
  methods: {
    signin: function() {
      axios({
        method: "POST",
        url: "http://localhost:3030/api/customers/signin",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(result => {
          localStorage.setItem("token", result.data.token);
          swal({
            type: "success",
            title: "Signin success",
            text: "Congrats"
          });
          setTimeout(() => {
            window.location = "http://localhost:8080/index.html";
          }, 2000);
        })
        .catch(err => {
          swal({
            type: "error",
            title: "Email or password wrong",
            text: "Try again!",
            footer: "<a href>Why do I have this issue?</a>"
          });
        });
    },

    logout: function() {
      localStorage.removeItem("token");
      window.location = "http://localhost:8080/signin.html";
    },

    convertPrice: function(price) {
      return `Rp. ${Number(price).toLocaleString()}`;
    },

    addItem: function() {
      window.location = "http://localhost:8080/add_item.html";
    },

    processFile: function(data) {
      this.image = data.files[0];
    },

    addNewItem: function() {
      let formData = new FormData();
      formData.append("image", this.image);
      axios
        .post("http://localhost:3030/api/items/upload", formData)
        .then(result => {
          const imgUrl = result.data.link;
          axios({
            method: "POST",
            url: "http://localhost:3030/api/items/addItems",
            data: {
              imgUrl: imgUrl,
              title: this.title,
              price: this.price,
              category: this.category
            }
          })
            .then(() => {
              swal("Add item success", "Ristore, Inc", "success");
              setTimeout(() => {
                window.location = "http://localhost:8080/index.html";
              }, 2000);
            })
            .catch(err => {
              swal("Try again!", "Ristore, Inc", "error");
            })
            .catch(err => {
              console.log(err);
            });
        });
    },

    listAllDataItems() {
      axios
        .get("http://localhost:3030/api/items")
        .then(respon => {
          respon.data.dataAllItem.forEach(item => {
            this.listAllItem.push({
              id: item._id,
              imgUrl: item.imgUrl,
              title: item.title,
              price: item.price,
              category: item.category,
              stars: "5"
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },

    dataUpdate: function(id) {
      axios({
        method: "GET",
        url: `http://localhost:3030/api/items/${id}`
      })
        .then(result => {
          this.itemUpdate = {
            id: result.data.data._id,
            title: result.data.data.title,
            price: result.data.data.price,
            category: result.data.data.category
          };
        })
        .catch(err => {
          console.log(err);
        });
    },

    updateItem: function(id) {
      let formData = new FormData();
      formData.append("image", this.image);
      axios
        .post("http://localhost:3030/api/items/upload", formData)
        .then(result => {
          const imgUrl = result.data.link;
          axios({
            method: "PUT",
            url: `http://localhost:3030/api/items/updateItem/${id}`,
            data: {
              imgUrl: imgUrl,
              title: this.itemUpdate.title,
              price: this.itemUpdate.price,
              category: this.itemUpdate.category
            }
          })
            .then(result => {
              swal("Update item success", "Ristore, Inc", "success");
              setTimeout(() => {
                window.location = "http://localhost:8080/index.html";
              }, 2000);
            })
            .catch(err => {
              swal("Update item failed", "Try again", "error");
            });
        })
        .cacth(err => {
          console.log(err);
        });
    },

    deleteItem: function(id) {
      axios({
        method: "DELETE",
        url: `http://localhost:3030/api/items/deleteItem/${id}`
      })
        .then(result => {
          swal("Delete item success", "Ristore, Inc", "success");
          setTimeout(() => {
            window.location = "http://localhost:8080/index.html";
          }, 2000);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  mounted() {
    this.listAllDataItems();
  }
});
