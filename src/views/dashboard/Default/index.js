import { useEffect, useState } from "react";

// material-ui
import { Grid, Button } from "@mui/material";
import TotalGrowthBarChart from "./TotalGrowthBarChart";
import BajajAreaChartCard from "./BajajAreaChartCard";
import TotalOrderLineChartCard from "./TotalOrderLineChartCard";
import PopularCard from "./PopularCard";

// project imports
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <div>
      <TotalGrowthBarChart />
    </div>
  );
};

export default Dashboard;
