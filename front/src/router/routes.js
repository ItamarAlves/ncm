const routes = [{
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: [{
      path: '',
      component: () => import('pages/Index.vue')
    },

    {
      name: 'Produtos',
      path: '/produtos',
      component: () => import('layouts/Produtos.vue'),
      children: [{
          path: 'produtos-consulta',
          component: () => import('pages/produtos/consultarNCM.vue'),
        }
      ]
    },
  ]
}, ]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
