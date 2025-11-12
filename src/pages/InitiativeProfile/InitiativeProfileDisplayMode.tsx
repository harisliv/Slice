import {
  FormSection,
  MainWrapperWithSubHeader,
  ShadowContainerWithTopPadding,
  SkeletonComponent,
  SubHeader,
  Tabs,
} from "@app/lib/ui";
import { Theme } from "@app/lib/general";
import {
  useActiveInitiative,
  useGlobalLoading,
  useInitiativeProfile,
} from "@app/hooks";
import {
  FunctionFocusAndThemesDisplayMode,
  GeneralInformationDisplayMode,
  GoalsTargetsAndMonitoringDisplayMode,
  OrganizationalStructureDisplayMode,
} from "@app/components";

export default function InitiativeProfileDisplayMode() {
  const { data: initiativeProfile } = useInitiativeProfile();
  const { activeInitiative } = useActiveInitiative();
  const isLoading = useGlobalLoading();

  return (
    <>
      <SubHeader
        title="Course Profile"
        subtitle="In this section, you can provide or update profile information about the course. This includes general information, status updates, and contact details. Keeping this information accurate ensures better tracking, transparency, and alignment with the course's objectives"
        backgroundColor={Theme.palette.background.lightGrey}
      />
      {isLoading ? (
        <SkeletonComponent />
      ) : (
        <MainWrapperWithSubHeader $containerWidth="L">
          <ShadowContainerWithTopPadding>
            <FormSection
              title={activeInitiative?.name}
              variant={activeInitiative?.initiativeStatus}
            >
              <Tabs
                tabs={[
                  {
                    label: "Course information",
                    content: (
                      <GeneralInformationDisplayMode
                        initiativeProfile={initiativeProfile}
                      />
                    ),
                  },
                  {
                    label: "Learning objectives and assessment",
                    content: (
                      <GoalsTargetsAndMonitoringDisplayMode
                        initiativeProfile={initiativeProfile}
                      />
                    ),
                  },
                  {
                    label: "Organizational structure",
                    content: (
                      <OrganizationalStructureDisplayMode
                        initiativeProfile={initiativeProfile}
                      />
                    ),
                  },
                  {
                    label: "Function, focus and themes",
                    content: (
                      <FunctionFocusAndThemesDisplayMode
                        initiativeProfile={initiativeProfile}
                      />
                    ),
                  },
                ]}
              />
            </FormSection>
          </ShadowContainerWithTopPadding>
        </MainWrapperWithSubHeader>
      )}
    </>
  );
}
