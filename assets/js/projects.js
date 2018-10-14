window.Event = new Vue();

Vue.component('project-nav-item', {

    props: {
        project: { type: Number, required: true }
    },

    computed: {
        url: function() {
            return '#' + this.project;
        }
    },

    template: '<li><a href="#" @click="broadcastProject"><slot></slot></a></li>',

    methods: {
        broadcastProject: function() {
            Event.$emit('display-project', { project: this.project });
        }
    }

});

Vue.component('project-nav', {

    template: '<ul><slot></slot></ul>'
});

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
        id: { type: Number, required: true },
        imageUrl: String,
        siteUrl: { type: String, required: true },
        repoUrl: { type: String, required: true },
    },

    data: function() {
        return {
            isVisible: false
        }
    },

    mounted: function() {
        let vm = this;
        Event.$on('display-project', function(event) {

            vm.isVisible = (event.project == vm.id);
            console.log(vm.id, vm.isVisible);
        });
    },

    template: `
        <div v-if="this.isVisible" :id="this.id" class="card">

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

Vue.component('project-collection', {
    template: `
        <div class="portfolio-list">
            <slot></slot>
        </div>`
});

new Vue({

    el: "main",

});
