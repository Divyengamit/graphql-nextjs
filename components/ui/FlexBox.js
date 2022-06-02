import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const FlexBox = styled(Box)((props) => ({
    display: 'flex',
    flexDirection: props?.row ? 'row' : 'column',
    alignItems: 'center'
}))

export default FlexBox