Vue.component('projet-list-formation', {
    data: function () {
        return {
            formation: []
        }
    },
    mounted: async function () {
        fetch('http://localhost:3000/formation/v2', {
            method: 'GET',
        }).then(res => {
            return res.json()
        }).then(json => {
            let formation = json
            formation.map(e => {
                return Object.assign(e, {dates: ""})
            })
            formation.forEach(e => {
                fetch('http://localhost:3000/formation/v2/' + e.formation_id + '/dates', {
                    method: 'GET',
                }).then(res => {
                    return res.json()
                }).then(json => {
                    if (!json || json.length == 0) {
                        // day date
                    } else {
                        json.forEach(date => {
                            e.dates += (new Date(date.date).toLocaleDateString()) + " "
                        })
                    }
                })
            })
            this.formation = formation
        }).catch(err => {
            console.log(err)
        });
    },
    methods: {},
    template: `


    <div class="container">
            <div class="row">
              
              <div v-for="item in formation" :key="item.id" class="col-4">
                <div class="card" style="">
                  <div class="card-body">
                    <h5 class="card-title">{{ item.nom }}</h5>
                    <img :src=item.imageUri class="img-fluid">
                    <!--<h6 class="card-subtitle mb-2 text-muted">Jour 1: {{ item.date1 }} Jour 2: {{ item.date2 }} Jour 3: {{ item.date3 }}</h6>-->
                    <h6 class="card-subtitle mb-2 text-muted">
                        {{item.dates}}
                    </h6>
                    <p class="card-text">{{item.description}}</p>
                    <p class="card-text">{{item.descriptionMore}}</p>
                    <button class="btn btn-success btn-sm" @click="$emit('register', item.id)" data-bs-toggle="modal" data-bs-target="#staticBackdrop">S'inscrire</button>
                    <button class="btn btn-danger btn-sm">Supprimer</button>
                    </div>
                </div>
         
              </div>
            </div>
        </div>
    `
})
