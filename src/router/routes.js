import AuthGuard from './auth-guard';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('pages/PageTodo.vue'),
        beforeEnter: AuthGuard,
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('pages/PageSettings.vue'),
        beforeEnter: AuthGuard,
      },
      {
        path: 'settings/help',
        name: 'Help',
        component: () => import('pages/PageHelp.vue'),
        beforeEnter: AuthGuard,
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/PageAuth.vue'),
      },
    ],
  },
];

// Always leave this as last one
if ( process.env.MODE !== 'ssr' ) {
  // noinspection JSCheckFunctionSignatures
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
