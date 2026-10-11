(() => {
  const charts = window.TRADING_RISK_CHARTS || [];
  const renderChart = (chart) => {
    const element = document.getElementById(chart.id);
    if (!element || !window.Plotly) return;
    Plotly.newPlot(element, chart.figure.data, chart.figure.layout, chart.config);
  };
  const resizeCharts = () => {
    if (!window.Plotly) return;
    charts.forEach((chart) => {
      const element = document.getElementById(chart.id);
      if (element) Plotly.Plots.resize(element);
    });
  };
  const debounce = (callback, delay = 160) => {
    let timer;
    return () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(callback, delay);
    };
  };
  const initialize = () => {
    charts.forEach(renderChart);
    window.addEventListener("resize", debounce(resizeCharts), { passive: true });
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
