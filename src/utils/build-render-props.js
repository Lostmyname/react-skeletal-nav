const isVisible = (id, route) => id === route[route.length - 1];

const isPast = (id, route) => route.indexOf(id) >= 0;

export default ({ route, setRoute, activeRoute, setActiveRoute }, { navId, isInline, absoluteRoute, itemId }) => ({
  goBack: () => {
    const lastItemInRoute = route[route.length - 1];

    if (navId === lastItemInRoute && navId !== 'root') {
      setRoute(route.slice(0, route.length - 1));
    }
  },
  route: navId,
  depth: route.indexOf(navId) + 1,
  isVisible: isInline ? isPast(navId, route) : isVisible(navId, route),
  isInline,
  isStack: !isInline,
  isPast: isPast(navId, route),
  isActive: isPast(itemId || navId, activeRoute.slice(1, activeRoute.length - 1)),
  setActiveRoute: () => {
    setActiveRoute(absoluteRoute);
  }
});
