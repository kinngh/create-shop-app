import routes from "../../Routes";
import { useRoutes } from "raviger";

const RouteProvider = () => {
  const routeComponents = useRoutes(routes);
  return routeComponents;
};

export default RouteProvider;
