Vue.component('projet-list-formation', {
    props: ['manager', 'mail'],
    data: function () {
        return {
            formation: [],
            intervenant: [],
            intervenantData: {
                date: '',
                value: ''
            }
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
                return Object.assign(e, {dates: "", selectDate: false})
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

        fetch('http://localhost:3000/formation/v2/prof', {
            method: 'GET',
        }).then(res => {
            return res.json()
        }).then(json => {
            if (json && json.length > 0) {
                json.forEach(prof => {
                    if(this.intervenant.filter(e => e.nom == prof.nom && e.prenom == prof.prenom).length == 0) {
                        this.intervenant.push({'intervenant_id': prof.intervenant_id,
                            'nom': prof.nom,
                            'prenom': prof.prenom,
                            date: [prof.dateOccupe]})
                    } else {
                        this.intervenant.find(e => e.intervenant_id == prof.intervenant_id).date.push(prof.dateOccupe)
                    }
                })
            }
        })
        console.log("profs : ", this.intervenant)

    },
    methods: {
        addIntervenant(formation_id) {
            console.log(this.intervenantData)
            if(this.formation.find(e => e.formation_id == formation_id).dates.trim().split(" ").length == 3) {
                alert("Il y a deja trois dates sur la formation !")
                return
            }
            if(this.intervenantData.date == '') {
                alert("Il faut definir une date")
                return
            }
            let intervenant = this.intervenant.find(e => e.intervenant_id == this.intervenantData.value)
            let dispo = intervenant.date.filter(e => new Date(e).toLocaleDateString() ==
                new Date(this.intervenantData.date).toLocaleDateString()).length == 0
            if(dispo) {
                // date, intervenant id , formation id ,    responsable id (mail)
                fetch('http://localhost:3000/formation/v2/addDate/' + formation_id +
                    '/' + this.mail + '/' + this.intervenantData.value + '/' + this.intervenantData.date, {
                    method: 'GET'
                }).then(res => {
                    return res.json()
                }).then(json => {
                    console.log("ok")
                    this.$emit('reload')
                })
            } else {
                alert("L'intervenant n'est pas disponible a cette date !")
            }
            console.log(intervenant)
        },
        removeFormation(id) {
            fetch('http://localhost:3000/formation/v2/' + id + '/remove', {
                method: 'GET',
            }).then(res => {
                return res.json()
            }).then(json => {
                this.formation = this.formation.filter(e => e.formation_id != id)
                console.log("remove: ", id)
            })
        }
    },
    template: `
    
    <div class="container">
            <div class="row">
              
              <div v-for="item in formation" :key="item.formation_id" class="col-4">
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
                    <template v-if="manager == 1">
                        <button class="btn btn-sm btn-info" @click="item.selectDate = !item.selectDate">Ajouter des dates</button>
                        <button class="btn btn-danger btn-sm" @click="removeFormation(item.formation_id)">Supprimer</button>
                    </template>
                    <template v-else>
                        <button class="btn btn-success btn-sm" @click="$emit('register', item.id)" data-bs-toggle="modal" data-bs-target="#staticBackdrop">S'inscrire</button>
                    </template>
                    <template v-if="item.selectDate">
                        <div class="mt-3">
                            <select class="form-select" aria-label="Choisir un intervenant" v-model="intervenantData.value">
                              <option selected>Choisir un intervenant</option>
                              <option v-for="prof in intervenant" :value="prof.intervenant_id">{{prof.prenom}} {{prof.nom}}</option>
                            </select>
                            <input type="date" v-model="intervenantData.date" class="form-control mt-2" aria-label="Large">
                            <button class="form-control btn btn-success mt-2" aria-label="Large" @click="addIntervenant(item.formation_id)">Ajouter l'intervenant</button>
                        </div>
                    </template>
                    </div>
                </div>
         
              </div>
            </div>
        </div>
    `
})
