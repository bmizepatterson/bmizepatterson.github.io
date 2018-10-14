Vue.component('highlight', {

    template: '<li><slot></slot></li>'
});

Vue.component('highlight-list', {

    template: `
        <div>
            <p>Highlights:</p>
            <ul>
                <slot></slot>
            </ul>
        </div>`
});

Vue.component('project-card', {

    props: {

        imageUrl: String,
        siteUrl: { type: String, required: true },
        repoUrl: { type: String, required: true },
    },

    template: `
        <div class="card">

            <div v-if="this.imageUrl" class="card-img-header" :style="{ backgroundImage: 'url(' + this.imageUrl + ')' }">
                <a :href="this.siteUrl" target="_blank"></a>
            </div>

            <div class="card-body">
                <div class="card-text">
                    <h2>
                        <a :href="this.siteUrl" target="_blank">
                            <slot name="title"></slot>
                        </a>
                    </h2>

                    <p>
                        <slot name="description"></slot>
                    </p>

                    <slot name="highlights"></slot>
                </div>
            </div>

            <div class="card-footer">
                <span class="project-date">Posted <slot name="date"></slot></span>
                <p class="project-repo-link"><a :href="this.repoUrl" target="_blank">View on GitHub</a></p>
            </div>

        </div>`

});

Vue.component('project-list', {
    template: '<div class="portfolio-list"><slot></slot></div>'
});

new Vue({

    el: "#root",

    data: {

    }
});
