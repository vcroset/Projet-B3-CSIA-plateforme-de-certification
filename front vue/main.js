let app = new Vue({
    el: "#app",
    data() {
        return {
            login: false,
            formationId: 0,
            posteState: {

            }
        }
    },
    methods: {
        showRegisterForm(id) {
            this.formationId = id;
        }
    }
})
