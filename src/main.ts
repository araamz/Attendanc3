import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import RecordsRoot from "./views/records/RecordsRoot.vue";
import TeamsRoot from "./views/teams/TeamsRoot.vue";
import NewRecordView from "./views/NewRecordView.vue";
import FloaterView from "./views/records/FloaterView.vue";
import RecordEditView from "./views/records/RecordEditView.vue";
import RecordsListView from "./views/records/RecordsListView.vue";
import NewTeamView from "./views/teams/NewTeamView.vue";
import TeamEditView from "./views/teams/TeamEditView.vue";
import TeamsListView from "./views/teams/TeamsListView.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: App,
        redirect: '/records/list',
        children: [
            {
                path: 'records',
                component: RecordsRoot,
                redirect: '/records/list',
                children: [
                    {
                        path: 'floater',
                        component: FloaterView,
                        name: 'floater_viewer'
                    },
                    {
                        path: 'edit/:recordId',
                        component: RecordEditView,
                        name: 'record_editor'
                    },
                    {
                        path: 'list',
                        component: RecordsListView,
                        name: 'record_list'
                    }
                ]
            },
            {
                path: 'teams',
                component: TeamsRoot,
                redirect: '/teams/list',
                children: [
                    {
                        path: 'new',
                        component: NewTeamView,
                        name: 'team_creator'
                    },
                    {
                        path: 'edit/:teamId',
                        component: TeamEditView,
                        name: 'team_editor'
                    },
                    {
                        path: 'list',
                        component: TeamsListView,
                        name: 'team_list'
                    }
                ]
            },
            {
                path: 'new_record',
                component: NewRecordView
            }
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App)
    .use(router)
    .mount('#app')