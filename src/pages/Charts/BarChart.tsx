import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import BarChartOne from "../../components/charts/bar/YieldVsPlace";
import BarChartTwo from "../../components/charts/bar/BarchartTwo";

export default function BarChart() {
  return (
    <div className=" pt-10 mt-4">
      <PageBreadcrumb pageTitle="Bar Chart" />
      <div className="space-y-6 mb-4 ">
        <ComponentCard title="Yield Production Vs Place">
          <BarChartOne />
        </ComponentCard>
        <ComponentCard title="Yield Production Vs Place">
          <BarChartTwo />
        </ComponentCard>
      </div>
    </div>
  );
}