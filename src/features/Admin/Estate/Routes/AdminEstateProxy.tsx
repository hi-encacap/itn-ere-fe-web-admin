import { useSearchParams } from "react-router-dom";

import { EstateProxyActionEnum } from "@constants/enums";

import AdminEstateList from "../AdminEstateList";
import AdminEstateModification from "../EstateModification/AdminEstateModification";

const AdminEstateProxy = () => {
  const [searchParams] = useSearchParams();

  const action = searchParams.get("action");
  const id = searchParams.get("id");

  if (action === EstateProxyActionEnum.CREATE) {
    return <AdminEstateModification />;
  }

  if (action === EstateProxyActionEnum.MODIFY && id) {
    return <AdminEstateModification id={Number(id)} />;
  }

  return <AdminEstateList />;
};

export default AdminEstateProxy;
