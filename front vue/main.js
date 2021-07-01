let app = new Vue({
    el: "#app",
    data() {
        return {
            mail: '',
            login: false,
            formationId: 0,
            posteState: {
                manager: 0,
                formateur: 0, // il fait l'appel, voir le calendrier
                coatch: 0 // voir si le travail marche bien
            }
        }
    },
    methods: {
        async getPerm(mail) {
            this.mail = mail;
            this.login = true;
            await fetch('http://localhost:3000/formation/user/' + mail, {
                method: 'GET',
            }).then(res => {
                if (res.status === 200) {
                    return res.json().then(function (json) {
                        let perm = json[0]
                        if(json.length == 0 || !perm) {
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
        showRegisterForm(id) {
            this.formationId = id;
        }
    }
})
