import { NoPermission } from '@app/lib/icons';
import { Theme } from '@app/lib/general';
import { Box } from '@mui/material';
import { Header2, Header3, Paragraph, MainWrapperWithHeader } from '@app/lib/ui';
import { Divider, Stack } from '@mui/material';

export default function Unauthorized() {
  return (
    <MainWrapperWithHeader $containerWidth="M">
      <Stack spacing={4}>
        <Header2>
          Welcome to the Climate Action App - Initiative Self-Service
        </Header2>
        <Divider
          sx={{
            borderColor: Theme.palette.background.grey,
            borderBottomWidth: 1
          }}
        />
        <>
          <Box
            width={'100%'}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              width={814}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Box
                sx={{ marginBottom: '24px' }}
                width={112}
                height={112}
                borderRadius="100%"
                bgcolor={Theme.palette.background.lightGrey}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Box>
                  <NoPermission />
                </Box>
              </Box>
              <Box sx={{ marginBottom: '14px' }}>
                <Header3>No permissions to use the application</Header3>
              </Box>
              <Box sx={{ marginBottom: '14px' }}>
                <Paragraph variant="small-regular">
                  You do not have the required permissions to use this
                  application. Please contact the UNFCCC secretariat focal point
                  for assistance.
                </Paragraph>
              </Box>
            </Box>
          </Box>
        </>
      </Stack>
    </MainWrapperWithHeader>
  );
}
