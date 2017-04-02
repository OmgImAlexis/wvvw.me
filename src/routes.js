import HomeComponent from './views/Home.vue';
import AboutComponent from './views/About.vue';
import ContactComponent from './views/Contact.vue';
import NotFoundComponent from './views/NotFound.vue';

export default [{
    name: 'home',
    path: '/',
    component: HomeComponent
}, {
    name: 'about',
    path: '/about',
    component: AboutComponent
}, {
    name: 'contact',
    path: '/contact',
    component: ContactComponent
}, {
    name: 'notFound',
    path: '*',
    component: NotFoundComponent
}];
