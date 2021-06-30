Vue.component('projet-list-certification', {
    data: function () {
        return {
            certifications: [
                {
                    id: 1,
                    name: "Les principes fondamentaux du marketing numérique",
                    subname: "Découvrez les principes fondamentaux du marketing numérique, et développez votre activité ou carrière.",
                    description: "Ce cours gratuit, agréé par l'IAB Europe (Interactive Advertising Bureau), vous permettra de maîtriser les fondamentaux du marketing numérique.",
                    img: './img/certifmarket.png',
                    displayMore: '',
                    more: 'L\'obtention de cette certification prouve que vous possédez de réelles compétences dans le domaine du numérique et que vous êtes désireux d\'apprendre. Or, il s\'agit de deux qualités essentielles dans le monde professionnel actuel. En démontrant vos aptitudes à ce sujet, vous aurez toutes les cartes en main pour décrocher l\'emploi recherché.'
                },
                {
                    id: 2,
                    name: "Les principes fondamentaux du marketing numérique",
                    subname: "Découvrez les principes fondamentaux du marketing numérique, et développez votre activité ou carrière.",
                    description: "Ce cours gratuit, agréé par l'IAB Europe (Interactive Advertising Bureau), vous permettra de maîtriser les fondamentaux du marketing numérique.",
                    img: './img/certifmarket.png',
                    displayMore: '',
                    more: 'L\'obtention de cette certification prouve que vous possédez de réelles compétences dans le domaine du numérique et que vous êtes désireux d\'apprendre. Or, il s\'agit de deux qualités essentielles dans le monde professionnel actuel. En démontrant vos aptitudes à ce sujet, vous aurez toutes les cartes en main pour décrocher l\'emploi recherché.'
                },
                {
                    id: 3,
                    name: "Les principes fondamentaux du marketing numérique",
                    subname: "Découvrez les principes fondamentaux du marketing numérique, et développez votre activité ou carrière.",
                    description: "Ce cours gratuit, agréé par l'IAB Europe (Interactive Advertising Bureau), vous permettra de maîtriser les fondamentaux du marketing numérique.",
                    img: './img/certifmarket.png',
                    displayMore: '',
                    more: 'L\'obtention de cette certification prouve que vous possédez de réelles compétences dans le domaine du numérique et que vous êtes désireux d\'apprendre. Or, il s\'agit de deux qualités essentielles dans le monde professionnel actuel. En démontrant vos aptitudes à ce sujet, vous aurez toutes les cartes en main pour décrocher l\'emploi recherché.'
                }
            ]
        }
    },
    mounted: async function () {
    },
    methods: {
        moreInfo(id) {
            let item = this.certifications.filter(e => e.id == id)[0]
            if (item.displayMore != '') {
                item.displayMore = ''
            } else {
                item.displayMore = item.more
            }
        }
    },
    template: `
        <div class="container">
            <div class="row">
              <div v-for="item in certifications" :key="item.id" class="col">
                <div class="card" style="">
                  <div class="card-body">
                    <h5 class="card-title">{{ item.name }}</h5>
                    <img :src=item.img class="img-fluid">
                    <h6 class="card-subtitle mb-2 text-muted">{{ item.subname }}</h6>
                    <p class="card-text">{{item.description}}</p>
                    <button class="btn btn-success btn-sm" @click="moreInfo(item.id)">Plus d'info</button>
                    <button class="btn btn-success btn-sm">Formations</button>
                    <p class="mt-1" v-if="item.displayMore != ''">{{item.displayMore}}</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
    `
})
