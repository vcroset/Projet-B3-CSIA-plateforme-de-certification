Vue.component('projet-list-formation', {
    data: function () {
        return {
            formation: [
                {
                    name: "Formation 1",
                    description: "cette formation est top !",
                    date1: "20/04/2021",
                    date2: "23/04/2021",
                    date3: "25/04/2021"
                },
                {
                    name: "Formation 2",
                    description: "cette formation est top !",
                    date1: "20/06/2021",
                    date2: "23/06/2021",
                    date3: "25/06/2021"
                },
                {
                    name: "Formation 3",
                    description: "cette formation est top !",
                    date: "20/08/2021",
                    date2: "23/08/2021",
                    date3: "25/08/2021"
                }
            ]
        }
    },
    mounted: async function() {
        console.log("start list-formation component");
    },
    methods: {
        
    },
    template: `
    <div class="container">
        <div class="row">
            <div v-for="item in formation" :key="item.name" class="col">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Jour 1: {{ item.date1 }} Jour 2: {{ item.date2 }} Jour 3: {{ item.date3 }}</h6>
                        <p class="card-text">{{ item.description }}</p>
                        <button type="button" class="btn btn-primary">S'inscrire</button>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    `
})