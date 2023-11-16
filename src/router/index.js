import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Start',
      component: () => import('@/views/Start/StartView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Start/LoginView.vue')
    },
    {
      path: '/recovery',
      name: 'Recovery',
      component: () => import('@/views/Start/RecoveryView.vue')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/Start/HomeView.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Start/RegisterView.vue')
    },
    {
      path: '/teste',
      name: 'teste',
      component: () => import('@/views/TesteView.vue')
    },
    {
      path: '/championships',
      name: 'Chanpionships',
      component: () => import('@/views/championship/ChampionshipsView.vue')
    },
    {
      path: '/requests',
      name: 'Requests',
      component: () => import('@/views/profile/RequestsView.vue')
    },
    {
      path: '/teams',
      name: 'Teams',
      component: () => import('@/views/Team/TeamsView.vue')
    },
    {
      path: '/teams/create',
      name: 'TeamsCreate',
      component: () => import('@/views/Team/TeamCreateView.vue')
    },
    {
      path: '/teams/editar/:id',
      name: 'TeamEdit',
      component: () => import('@/views/Team/EditTeamView.vue')
    },
    {
      path: '/teams/:id',
      name: 'Team',
      component: () => import('@/views/Team/ProfileTeamView.vue')
    },
    {
      path: '/myorg',
      name: 'MyOrg',
      redirect: '/org/' + localStorage.getItem('id'),
    },
    {
      path: '/org/:id',
      name: 'Org',
      component: () => import('@/views/org/ProfileOrgView.vue')
    },
    {
      path: '/org/editar',
      name: 'OrgEdit',
      redirect: '/edit',
    },
    {
      path: '/premium',
      name: 'Premium',
      component: () => import('@/views/PremiumView.vue')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('@/views/Team/SearchView.vue')
    },
    {
      path: '/offers',
      name: 'Offers',
      component: () => import('@/views/Team/SearchTeamView.vue')
    },
    {
      path: '/perfil/editar',
      name: 'EditarPerfil',
      component: () => import('@/views/profile/EditarUsuarioView.vue')
    },
    {
      path: '/edit',
      name: 'Editar',
      component: () => import('@/views/profile/EditPrefsView.vue')
    },
    {
      path: '/notifications',
      name: 'Notifications',
      component: () => import('@/views/profile/NotificationsView.vue')
    },
    {
      path: '/perfil/:id',
      name: 'Perfil',
      component: () => import('@/views/profile/PerfilView.vue'),
    },
    {
      path: '/perfil',
      name: 'PerfilDefault',
      redirect: '/perfil/' + localStorage.getItem('id'),
    },
    {
      path: '/players',
      name: 'Players',
      component: () => import('@/views/profile/PlayersView.vue'),
    },
    {
      path: '/:notFound(.*)',
      name: 'Not_Found',
      component: () => import('@/views/Start/NotFoundView.vue')
    }

  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
  

})

export default router
