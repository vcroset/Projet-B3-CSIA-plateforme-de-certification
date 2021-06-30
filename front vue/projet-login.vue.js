Vue.component('projet-login', {
    data: function () {
        return {
            mail : '',
            password : ''
        }
    },
    mounted: async function() {
        console.log("start login component");
    },
    methods: {
        async loginRequest() {
            if(this.mail && this.password) {
                var user = {
                    'mail': this.mail,
                    'password': this.password,
                };
                await fetch('http://localhost:3000/users/login', {
                  method: 'GET',
                  headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000/',
                  }
                }).then(res => {
                    if(res.status === 200) {
                        this.$emit('loginok')
                    }
                }).catch(err => {
                    console.log(err)
                });
            }            
        }
    },
    template: `
    <div class="mt-2">
    <div class="card">
  <div class="card-body">

        <h6 class="text-center">Connectez vous à votre compte</h6>
        
        <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Adresse mail</label>
        <input type="email" v-model="mail" class="form-control">
        </div>
        <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Mot de passe</label>
        <input type="password" class="form-control" v-model="password">
        </div>
        <button class="btn btn-primary" @click="loginRequest()">Connexion</button>
          </div>
</div>
    </div>`
})
