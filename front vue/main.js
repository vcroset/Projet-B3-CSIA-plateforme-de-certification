let app = new Vue({
    el: "#app",
    data() {
        return {
            login: false,
            formationId: 0,
            posteState: {
                manager: 1,
                formateur: 0, // il fait l'appel, voir le calendrier
                coatch: 0 // voir si le travail marche bien
            }
        }
    },
    methods: {
        setPosteState(m, f, c) {
            this.posteState.manager = m
            this.posteState.formateur = f
            this.posteState.coatch = c
        },
        showRegisterForm(id) {
            this.formationId = id;
        }
    }
})
