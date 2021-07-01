Vue.component('projet-formulaire-inscription', {
    data: function () {
        return {
            prenom: '',
            nom : '',
            mail : '',
            numero : '',
            date : '',
            superieur : '',
            inferieur : ''
         
        }
    },
    mounted: async function() {


    },
    methods: {
        async saveFormulaire() {
            console.log(this.prenom, this.nom, this.mail, this.mail, this.numero, this.date, this.superieur, this.inferieur)
            
        }
    },
    template: `
        <div class="container">
        <form class="form-horizontal" role="form">
            <div class="form-group">
                <label for="firstName" class="col-sm-3 control-label">Prénom *</label>
                <div class="col-sm-12">
                    <input type="text" v-model="prenom" id="firstName" placeholder="Prénom" class="form-control" autofocus>
                </div>
            </div>
            <div class="form-group">
                <label for="lastName" class="col-sm-3 control-label">Nom *</label>
                <div class="col-sm-12">
                    <input type="text" v-model="nom" id="lastName" placeholder="Nom" class="form-control" autofocus>
                </div>
            </div>
            <div class="form-group">
                <label for="email" class="col-sm-3 control-label">Email* </label>
                <div class="col-sm-12">
                    <input type="email" v-model="mail" id="email" placeholder="Email" class="form-control" name= "email">
                </div>
            </div>
            <div class="form-group">
                <label for="phoneNumber" class="col-sm-9 control-label">Numéro de téléphone </label>
                <div class="col-sm-12">
                    <input type="phoneNumber" v-model="numero" id="phoneNumber" placeholder="Numéro de téléphone" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="birthDate" class="col-sm-6 control-label">Date de naissance *</label>
                <div class="col-sm-12">
                    <input type="date" v-model="date" id="birthDate" class="form-control">
                </div>
            </div>
            <!--<div class="form-group">
                <label for="password" class="col-sm-3 control-label">Mot de passe*</label>
                <div class="col-sm-9">
                    <input type="password"  id="password" placeholder="Mot de passe" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="password" class="col-sm-3 control-label">Confirmer mot de passe*</label>
                <div class="col-sm-9">
                    <input type="password" id="password" placeholder="Mot de passe" class="form-control">
                </div>
            </div>-->
            
            <div class="form-group">
            <div class="maxl">
                <label class="radio inline"> 
                    <input type="radio"  v-model="superieur" name="gender" value="male" checked>
                    <span> Homme </span> 
                </label>
                <label class="radio inline"> 
                    <input type="radio" v-model="inferieur" name="gender" value="female">
                    <span>Femme </span> 
                </label>
            </div>
       
            </div> <!-- /.form-group -->
            <div class="form-group">
                <div class="col-sm-12 col-sm-offset-3">
                    <span class="help-block">* Champs requis</span>
                </div>
            </div>
            <button type="submit" class="btn btn-success btn-sm btn-block">Postuler</button>
        </form> <!-- /form -->
    </div> <!-- ./container -->
    `
})
