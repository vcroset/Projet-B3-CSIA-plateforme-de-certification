//pour créer des modales
//data-bs-toggle="modal" data-bs-target="#staticBackdrop"

Vue.component('projet-list-appel', {
    data: function () {
        return {

         
        }
    },
    mounted: async function() {


    },
    methods: {
        async getData() {
            //console.log(this.prenom, this.nom, this.mail, this.mail, this.numero, this.date, this.superieur, this.inferieur)
            fetch('http://localhost:3000/formation/')
            .get('http://localhost:3000/formation/')
            .then(response => (this.info = response))
        }
    },

    created() {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "Vue POST Request Example" })
        };
        fetch("http://localhost:3000/formation", requestOptions)
          .then(response => response.json())
          .then(data => (this.postId = data.id));

      },

    template: `
    <div class="container">
            <div class="row">
              <div v-for="item in formation" :key="item.id" class="col">
                <div class="card" style="">
                  <div class="card-body">
                    <h5 class="card-title">{{ data.id }}</h5>

                  </div>
                </div>
              </div>
            </div>
        </div>
    `
})
