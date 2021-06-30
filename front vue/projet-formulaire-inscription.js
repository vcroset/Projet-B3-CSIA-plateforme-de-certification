Vue.component('projet-formulaire-inscription', {
    data: function () {
        return {
            mail : '',
            password : ''
        }
    },
    mounted: async function() {
    },
    methods: {
    },
    template: `
        <div class="container">
        <form class="form-horizontal" role="form">
            <h2>Formulaire d'inscription</h2>
            <div class="form-group">
                <label for="firstName" class="col-sm-3 control-label">Prénom</label>
                <div class="col-sm-9">
                    <input type="text" id="firstName" placeholder="Prénom" class="form-control" autofocus>
                </div>
            </div>
            <div class="form-group">
                <label for="lastName" class="col-sm-3 control-label">Nom</label>
                <div class="col-sm-9">
                    <input type="text" id="lastName" placeholder="Nom" class="form-control" autofocus>
                </div>
            </div>
            <div class="form-group">
                <label for="email" class="col-sm-3 control-label">Email* </label>
                <div class="col-sm-9">
                    <input type="email" id="email" placeholder="Email" class="form-control" name= "email">
                </div>
            </div>
            <div class="form-group">
                <label for="password" class="col-sm-3 control-label">Mot de passe*</label>
                <div class="col-sm-9">
                    <input type="password" id="password" placeholder="Mot de passe" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="password" class="col-sm-3 control-label">Confirmer mot de passe*</label>
                <div class="col-sm-9">
                    <input type="password" id="password" placeholder="Mot de passe" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="birthDate" class="col-sm-3 control-label">Date de naissance*</label>
                <div class="col-sm-9">
                    <input type="date" id="birthDate" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="phoneNumber" class="col-sm-3 control-label">Numéro de téléphone </label>
                <div class="col-sm-9">
                    <input type="phoneNumber" id="phoneNumber" placeholder="Numéro de téléphone" class="form-control">
                </div>
            </div>
            <div class="form-group">
                    <label for="Height" class="col-sm-3 control-label">Taille* </label>
                <div class="col-sm-9">
                    <input type="number" id="height" placeholder="En centimètre" class="form-control">
                </div>
            </div>
            <div class="form-group">
                    <label for="weight" class="col-sm-3 control-label">Poids* </label>
                <div class="col-sm-9">
                    <input type="number" id="weight" placeholder="En Kg" class="form-control">
                </div>
            </div>
            <div class="form-group">
            <div class="maxl">
                <label class="radio inline"> 
                    <input type="radio" name="gender" value="male" checked>
                    <span> Homme </span> 
                </label>
                <label class="radio inline"> 
                    <input type="radio" name="gender" value="female">
                    <span>Femme </span> 
                </label>
            </div>
       
            </div> <!-- /.form-group -->
            <div class="form-group">
                <div class="col-sm-9 col-sm-offset-3">
                    <span class="help-block">*Champs requis</span>
                </div>
            </div>
            <button type="submit" class="btn btn-primary btn-block">S'enregistrer</button>
        </form> <!-- /form -->
    </div> <!-- ./container -->
    `
})
