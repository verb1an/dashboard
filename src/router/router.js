import MainPage from '@/pages/MainPage';

import LinksPage from '@/pages/LinksPage';
import AddLinkPage from '@/pages/AddLinkPage';
import ViewLinkPage from '@/pages/ViewLinkPage';

import PostsPage from '@/pages/PostsPage';
import PostPage from '@/pages/PostPage';
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/links',
        component: LinksPage
    },
    {
        path: '/links/add',
        component: AddLinkPage
    },
    {
        path: '/links/:id',
        component: ViewLinkPage
    },
    {
        path: '/posts',
        component: PostsPage
    },
    {
        path: '/posts/:id',
        component: PostPage
    }
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;