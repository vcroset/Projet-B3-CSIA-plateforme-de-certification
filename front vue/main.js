let app = new Vue({
    el: "#app",
    data() {
        return {
            login: false,
            formationId: 0
        }
    },
    methods: {
        showRegisterForm(id) {
            this.formationId = id;
        }
    }
})
