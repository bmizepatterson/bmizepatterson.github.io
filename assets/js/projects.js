window.Event = new Vue();

Vue.component('project-nav-item', {

    props: {
        project: { type: Number, required: true },
    },

    data: function() {
        return {
            isSelected: false
        }
    },

    created: function() {
        if (this.project == 1) this.isSelected = true;
        let vm = this;
        Event.$on('display-project', function(event) {
            vm.isSelected = (event.project == vm.project);
        });
    },

    computed: {
        url: function() {
            return '#' + this.project;
        }
    },

    template: `
        <a :href="this.url" :class="{ active: this.isSelected }" @click="broadcastProject">
            <slot></slot>
        </a>`,

    methods: {
        broadcastProject: function() {
            Event.$emit('display-project', { project: this.project });
        }
    }

});

Vue.component('project-nav', {

    template: '<nav class="project-nav"><slot></slot></nav>'
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

    created: function() {
        if (this.id == 1) this.isVisible = true;
        let vm = this;
        Event.$on('display-project', function(event) {
            vm.isVisible = (event.project == vm.id);
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

    props: {
        projectCount: { type: Number, required: true }
    },

    data: function() {
        return {
            currentProject: 1
        }
    },

    created: function() {
        let vm = this;
        Event.$on('display-project', function(event) {
            vm.currentProject = event.project;
        });
    },

    computed: {
        canGoPrevious: function() {
            return (this.currentProject > 1);
        },
        canGoNext: function() {
            return (this.currentProject < this.projectCount);
        }
    },

    template: `
        <div class="portfolio-list">
            <div class="pagination">
                <button type="button" class="left" v-if="this.canGoPrevious" @click="prevProject">&lt;</button>
                <button type="button" class="right" v-if="this.canGoNext" @click="nextProject">&gt;</button>
            </div>
            <slot></slot>
        </div>`,

    methods: {
        prevProject: function() {
            Event.$emit('display-project', { project: this.currentProject - 1 });
        },

        nextProject: function() {
            Event.$emit('display-project', { project: this.currentProject + 1 });
        }
    }
});

new Vue({

    el: "main",

});
