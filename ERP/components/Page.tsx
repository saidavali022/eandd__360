import PropTypes from "prop-types";
import Head from "next/head";

// material
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

// const Page = forwardRef(({ children, title = '', ...other }, ref) => (
//   <Box ref={ref} {...other}>
//     <Head>
//       <title>{title}</title>
//     </Head>
//     {children}
//   </Box>
// ));

// interface pagePropType = {
//   children: PropTypes.node.isRequired,
//   title: PropTypes.string
// };
const Page = ({ children, title = "", ...other }: any) => {
  return (
    <>
      <Box>
        <Head>
          <title>{title}</title>
        </Head>
        {children}
      </Box>
    </>
  );
};
export default Page;
