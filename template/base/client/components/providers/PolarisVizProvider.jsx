import { PolarisVizProvider } from "@shopify/polaris-viz";
import "@shopify/polaris-viz/build/esm/styles.css";

const PVizProvider = ({ children }) => {
  const VizOptions = {
    Default: {
      chartContainer: {
        padding: "20px",
      },
    },
  };
  return (
    <PolarisVizProvider themes={VizOptions}>{children}</PolarisVizProvider>
  );
};

export default PVizProvider;
