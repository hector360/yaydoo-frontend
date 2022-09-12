import { lazy } from "react";

const BuyerView = lazy(() =>
  import("../components/BuyerView")
);

const SellerView = lazy(() =>
  import("../components/SellerView")
);
const CreateProduct = lazy(() =>
  import("../components/CreateProduct")
);
const AdminView = lazy(() =>
  import("../components/AdminView")
);

const routes = [
    {
        path: "/buyer-view",
        exact: true,
        name: "buyerview",
        component: <BuyerView />,
    },
    {
        path: "/seller-view",
        exact: true,
        name: "sellerview",
        component: <SellerView />,
    },
    {
      path: "/admin-view",
      exact: true,
      name: "adminview",
      component: <AdminView />,
  },
    {
      path: "/create-product",
      exact: true,
      name: "createproduct",
      component: <CreateProduct />,
  },

];

export default routes;
