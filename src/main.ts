import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import RecordsRoot from "./views/records/RecordsRoot.vue";
import TeamsRoot from "./views/teams/TeamsRoot.vue";
import NewRecordView from "./views/NewRecordView.vue";
import RecordEditView from "./views/records/RecordEditView.vue";
import RecordsListView from "./views/records/RecordsListView.vue";
import NewTeamView from "./views/teams/NewTeamView.vue";
import TeamEditView from "./views/teams/TeamEditView.vue";
import TeamsListView from "./views/teams/TeamsListView.vue";
import {createRouter, createWebHistory} from "vue-router";
import {VueQueryPlugin} from '@tanstack/vue-query'
import ReportView from "./views/ReportView.vue";

const routes = [
    {
        path: '',
        component: RecordsRoot,
        children: [
            {
                path: 'edit/:recordId',
                component: RecordEditView,
                name: 'record_editor'
            },
            {
                path: '',
                component: RecordsListView,
                name: 'record_list'
            }
        ]
    },
    {
        path: '/teams',
        component: TeamsRoot,
        children: [
            {
                path: 'new',
                component: NewTeamView,
                name: 'new_team'
            },
            {
                path: 'edit/:teamNumber',
                component: TeamEditView,
                name: 'team_editor',
            },
            {
                path: '',
                component: TeamsListView,
                name: 'team_list'
            }
        ]
    },
    {
        path: '/grade',
        component: NewRecordView,
        name: 'grade'
    },
    {
        path: '/report',
        component: ReportView,
        name: 'generate_report'
    },
    {
        path: '/help',
        component: ReportView,
        name: 'help'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App)
    .use(router)
    .use(VueQueryPlugin)
    .mount('#app')