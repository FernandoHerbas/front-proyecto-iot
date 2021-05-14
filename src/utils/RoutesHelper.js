export default {
    recursiveChildrenRouteSearch(routes, name, result) {
        for (let route of routes) {
          if(route.meta)
            //console.log(`${route.meta.name} == ${name}`);
  
          if (route.meta && route.meta.name === name) {
            result.children = route.children;
            break;
          }
          if (route.children && route.children.length > 0) {
            this.recursiveChildrenRouteSearch(route.children, name, result);
          }
        }
      }
}