import { CircularProgress, circularProgressClasses } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

export const SkeletonWrapper = styled(Box)`
  flex: 0 0 30%;
  box-shadow:
    0px 3px 8px rgba(25, 25, 112, 0.08),
    0px 0px 1px rgba(65, 105, 226, 0.2);
  border-radius: 12px;
  h5 {
    text-align: center;
  }
`;

export default function SkeletonComponent() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000
      }}
    >
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={(theme) => ({
          color: '#1a90ff',
          animationDuration: '550ms',
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round'
          },
          ...theme.applyStyles('dark', {
            color: '#308fe8'
          })
        })}
        size={90}
        thickness={1}
      />
    </Box>
  );
}
