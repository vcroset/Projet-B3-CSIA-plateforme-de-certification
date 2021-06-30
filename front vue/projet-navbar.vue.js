Vue.component('projet-navbar', {
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
    <nav class="navbar" style="background: #00529F">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1 text-white">Plateforme de certification</span>
        </div>
    </nav>
    `
})
