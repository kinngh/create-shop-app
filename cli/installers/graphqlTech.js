import path from "path";
import fs from "fs-extra";
import constants from "../constants.js";
const { packageRoot } = constants;

const addGraphqlClient = async ({ projectDir, graphqlTech }) => {
  //    "apollo_client"
  //    "react_query"

  const gqlFileSrc = path.join(packageRoot, `template/graphql/${graphqlTech}`);

  await fs.copy(gqlFileSrc, projectDir);
};

export { addGraphqlClient };
