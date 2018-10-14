Vue.component('project-list', {
    template: '<div class="portfolio-list"><slot></slot></div>'
});

Vue.component('project-card', {

    delimiters: ["((", "))"],

    props: {
        imageUrl: String,

        siteUrl: { type: String, required: true },

        repoUrl: { type: String, required: true },

        name: { type: String, required: true },

        description: { type: String, required: true },

        // Comma-separated string of highlights
        highlights: String,

        date: { type: String, required: true }
    },

    computed: {
        highlightArray: function() {
            return this.highlights.split(",");
        }
    },

    template: `
        <div class="card">
            <div v-if="this.imageUrl" class="card-img-header" :style="{ backgroundImage: 'url(' + this.imageUrl + ')' }"><a :href="this.siteUrl" target="_blank"></a></div>
            <div class="card-body">
                <div class="card-text">
                    <h2><a :href="this.siteUrl" target="_blank" v-text="this.name"></a></h2>
                    <p v-text="this.description"></p>
                    <template v-if="this.highlights">
                        <p>Highlights:</p>
                        <ul>
                            <li v-for="highlight in this.highlightArray" v-text="highlight"></li>
                        </ul>
                    </template>
                </div>
            </div>
            <div class="card-footer">
                <span class="project-date">Posted (( this.date ))</span>
                <p class="project-repo-link"><a :href="this.repoUrl" target="_blank">View on GitHub</a></p>
            </div>
        </div>`



});

new Vue({

    el: "#root",

    data: {

    }
});
