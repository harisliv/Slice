import { useActiveInitiative, useGlobalLoading } from "@app/hooks";
import { Theme } from "@app/lib/general";
import { ChevronRightIcon } from "@app/lib/icons";
import { ButtonComponent, Card, SquaresContainer } from "@app/lib/ui";
import {
  FormSection,
  MainWrapperWithSubHeader,
  ShadowContainerWithTopPadding,
  SkeletonComponent,
  SubHeader,
} from "@app/lib/ui";
import { NavLink } from "react-router";
import { ParticipantCount } from "@app/components/MyParticipants";

export default function ParticipantManagement() {
  const isLoading = useGlobalLoading();

  const { activeInitiative } = useActiveInitiative();

  // TODO improve naming
  return (
    <>
      <SubHeader
        title="Student Management"
        subtitle="In this section, you can manage student entities in your Course. You can also manage enrollments from your students and provide or update profile information about the course."
      />
      {isLoading ? (
        <SkeletonComponent />
      ) : (
        <MainWrapperWithSubHeader $containerWidth="L">
          <ShadowContainerWithTopPadding>
            <FormSection
              title={activeInitiative?.name}
              variant={activeInitiative?.initiativeStatus}
              divider={false}
            />
            <ParticipantCount />

            <SquaresContainer>
              <Card
                title="My students"
                subtitle="View, add, and remove student information"
              >
                <ButtonComponent
                  RouterLink={NavLink}
                  to={"my-students"}
                  customVariant="secondary-s"
                  endIcon={
                    <ChevronRightIcon fill={Theme.palette.primary.azur} />
                  }
                >
                  Go to My students
                </ButtonComponent>
              </Card>
              <Card
                title="Work centre"
                subtitle="View notifications, approve or deny enrollments and applications, and outstanding tasks."
              >
                <ButtonComponent
                  RouterLink={NavLink}
                  to={"work-centre"}
                  customVariant="secondary-s"
                  endIcon={
                    <ChevronRightIcon fill={Theme.palette.primary.azur} />
                  }
                >
                  Go to Work centre
                </ButtonComponent>
              </Card>
            </SquaresContainer>
          </ShadowContainerWithTopPadding>
        </MainWrapperWithSubHeader>
      )}
    </>
  );
}
