import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Grid, MenuItem, TextField, Typography } from "@mui/material";

// third-party
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";

// project imports
import SkeletonTotalGrowthBarChart from "ui-component/cards/Skeleton/TotalGrowthBarChart";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";

// chart data
import chartData from "./chart-data/total-growth-bar-chart";
import Axios from "axios";

const API_ADMIN_URL = process.env.API_ADMIN_URL;
const status = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "month",
    label: "This Month",
  },
  {
    value: "year",
    label: "This Year",
  },
];

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const { navType } = customization;
  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;
  useEffect(async () => {
    const dataStatistics = await Axios.get(`${API_ADMIN_URL}/statistics`);
    const { numVideoCollections, numImageCollections, numNews, _ } =
      dataStatistics?.data?.data;

    //change the chartData with the dataStatistics
    chartData.series[0].data[0] = numVideoCollections;
    chartData.series[1].data[0] = numImageCollections;
    chartData.series[2].data[0] = numNews;
    const newChartData = {
      ...chartData.options,
      colors: [primary200, primaryDark, secondaryMain, secondaryLight],
      xaxis: {
        labels: {
          style: {
            colors: [
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
            ],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary],
          },
        },
      },
      grid: {
        borderColor: grey200,
      },
      tooltip: {
        theme: "light",
      },
      legend: {
        labels: {
          colors: grey500,
        },
      },
    };

    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, "updateOptions", newChartData);
    }
  }, [
    navType,
    primary200,
    primaryDark,
    secondaryMain,
    secondaryLight,
    primary,
    darkLight,
    grey200,
    isLoading,
    grey500,
  ]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">
                        Total Collection
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart {...chartData} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalGrowthBarChart;
