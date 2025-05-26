import Card from "@/app/components/Card";
import { FaDonate, FaPlaceOfWorship, FaUsers } from "react-icons/fa";

export default function Page() {
  return (
    <div className="home-container">
      <h1 className="dashboard-title">Welcome Super Admin. What would you like to do today?</h1>
      <div className="dashboard-grid ">
        <Card
          title="Total Donations"
          value="39,500"
          icon={<FaDonate />}
        />
        <Card
          title="Temples Registered"
          value={12}
          icon={<FaPlaceOfWorship />}
        />
        <Card
          title="Users Registered"
          value={143}
          icon={<FaUsers />}
        />
      </div>
      <div className="dashboard-grid ">
        <Card
          title="Total Donations"
          value="39,500"
          icon={<FaDonate />}
        />
        <Card
          title="Temples Registered"
          value={12}
          icon={<FaPlaceOfWorship />}
        />
        <Card
          title="Users Registered"
          value={143}
          icon={<FaUsers />}
        />
      </div>
    </div>
  );
}
