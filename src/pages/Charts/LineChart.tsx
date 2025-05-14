import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import LineChartOne from "../../components/charts/line/LineChartOne";
import PageMeta from "../../components/common/PageMeta";
import LineChartTwo from "../../components/charts/line/LineChartTwo";
import LineChartThree from "../../components/charts/line/LineChartThree";
import LineChartFour from "../../components/charts/line/LineChartFour";
import LineChartFive from "../../components/charts/line/LineChartFive";
import LineChartSix from "../../components/charts/line/LineChartSix";
import LineChartSeven from "../../components/charts/line/LineChartSeven";
import LineChartNine from "../../components/charts/line/LineChartNine";
import LineChartTen from "../../components/charts/line/LineChartTen";
import LineChartEleven from "../../components/charts/line/LineChartEleven";
import LineChartTwelve from "../../components/charts/line/LineChartTwelve";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";

export default function LineChart() {
  return (
    <>
      <PageMeta
        title="React.js Chart Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Chart Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Line Chart" />
      <div className="space-y-6">
        <ComponentCard title="Line Chart 1">
          <LineChartOne />
          <LineChartTwo/>
          <LineChartThree/>
          <LineChartFour/>
          <LineChartFive/>
          <LineChartSix/>
          <LineChartSeven/>
          <LineChartNine/>
          <LineChartTen/>
          <LineChartEleven/>
          <LineChartTwelve/>
        
          <StatisticsChart/>
        </ComponentCard>
      </div>
    </>
  );
}
