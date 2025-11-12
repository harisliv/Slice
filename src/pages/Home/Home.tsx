import type { FC } from "react";
import { Initiative } from "@app/components";
import { Header2, MainWrapperWithHeader, Paragraph } from "@app/lib/ui";
import { Theme } from "@app/lib/general";
import { Divider, Stack } from "@mui/material";

const Homepage: FC = () => {
  const content = (
    <Paragraph variant="large-regular-blue">
      Using this app, you can view, manage and submit information about the
      Course(s) and Program(s) for which you are the instructor or
      administrator, to enable effective course management and student tracking.
    </Paragraph>
  );

  return (
    <MainWrapperWithHeader $containerWidth="M">
      <Stack spacing={4}>
        <Header2>
          Welcome to the Educational Platform - Course Management System
        </Header2>
        {content}
        <Divider
          sx={{
            borderColor: Theme.palette.background.grey,
            borderBottomWidth: 1,
          }}
        />
        <Initiative />
      </Stack>
    </MainWrapperWithHeader>
  );
};

export default Homepage;
