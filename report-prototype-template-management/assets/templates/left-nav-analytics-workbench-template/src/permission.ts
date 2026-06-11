import router from './router';

router.beforeEach((to, _from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const haierToken = localStorage.getItem('haierToken');

  if (haierToken) {
    next();
    return;
  }

  next({
    path: '/no-access',
    replace: true,
  });
});
