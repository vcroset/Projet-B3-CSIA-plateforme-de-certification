Vue.component('projet-login', {
    data: function () {
        return {
            mail: 'valentin.croset@gmail.com',
            password: 'test'
        }
    },
    mounted: async function () {
        console.log("start login component");
    },
    methods: {
        async loginRequest() {
            if (this.mail && this.password) {
                await fetch('http://localhost:3000/users/login/' + this.mail + "/" + this.password, {
                    method: 'GET',
                }).then(res => {
                    return res.json()
                }).then(json => {
                    if (!json || json.length == 0) {
                        alert("Le mot de passe il est pas bon (alors qu'il est en claire dans la bdd :/)")
                        return
                    }
                    this.$emit('loginok', this.mail)
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
        <button class="btn text-white" style="background: #00529F" @click="loginRequest()">Connexion</button>
          </div>
</div>
    </div>`
})
