let app = new Vue({
    el: "#app",
    data() {
        return {
            mail: '',
            login: false,
            formationId: 0,
            updateFormation: true,
            posteState: {
                manager: 0,
                formateur: 0, // il fait l'appel, voir le calendrier
                coatch: 0 // voir si le travail marche bien
            },
            modalAddFormation: {
                titre: '',
                description: '',
                more: '',
                imgUri: ''
            },
            entretien: null,
            appel: null
        }
    },
    methods: {
        async sendModalFormation() {
            await this.addFormation(this.modalAddFormation.titre, this.modalAddFormation.description,
                this.modalAddFormation.more, this.modalAddFormation.imgUri)
            this.modalAddFormation = {
                titre: '',
                description: '',
                more: '',
                imgUri: ''
            }
            alert("Ajout de la formation !")
        },
        async addFormation(nom, desc, descm, img) {
            let formation = {
                "nom": nom,
                "description": desc,
                "descriptionMore": descm,
                "imageUri": img
            }
            let formBody = [];
            for (let property in formation) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(formation[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            fetch('http://localhost:3000/formation/v2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
            }).then(res => {
                if (res.status == 200) {
                    this.reloadFormation()
                }
            })
        },
        reloadFormation() {
            this.updateFormation = false
            this.$nextTick(() => {
                this.updateFormation = true
            })
        },
        async getPerm(mail) {
            this.mail = mail;
            this.login = true;
            await fetch('http://localhost:3000/formation/user/' + mail, {
                method: 'GET',
            }).then(res => {
                if (res.status === 200) {
                    return res.json().then(function (json) {
                        let perm = json[0]
                        if (json.length == 0 || !perm) {
                            return
                        }
                        app.posteState.manager = perm.isResponsable == null ? 0 : 1
                        app.posteState.formateur = perm.isIntervenant == null ? 0 : 1
                        app.posteState.coatch = perm.isCoach == null ? 0 : 1
                    });
                }
            }).catch(err => {
                console.log(err)
            });
            
        },
        async getFicheAppel() {
            await fetch('http://localhost:3000/formation/v2/present', {
                method: 'GET',
            }).then(res => {
                return res.json()
            }).then(json => {
                this.appel = json
            }).catch(err => {
                console.log(err)
            });
        },
        async getEntretien(){
            await fetch('http://localhost:3000/formation/v2/entretien', {
                method: 'GET',
            }).then(res => {
                return res.json()
            }).then(json => {
                this.entretien = json
            }).catch(err => {
                console.log(err)
            });
        },
        showRegisterForm(id) {
            this.formationId = id;
        },
        displayContact(mail) {
            alert("Mail : " + mail)
        },
        validEleve(eleve) {
            fetch("http://localhost:3000/formation/v2/valideleve/" + eleve.eleve_id + "/" + this.mail, {
                method: 'GET',
            }).then(res => {
                return res.json()
            }).then(json => {
                alert("Entretien ok ")
            }).catch(err => {
                console.log(err)
            });
            this.entretien = null
            this.$nextTick(() => {
                this.getEntretien()
            })
        }
    }
})
