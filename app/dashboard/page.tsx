import { isAuthentic } from "@/server/modules/auth";

const DashboardPage = async () => {
  await isAuthentic();

  return <div>DashboardPage</div>;
};

export default DashboardPage;
