import { InfoCard, TitleAction } from '@app/lib/ui';
import { NavLink } from 'react-router';
import { Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FUNCTION_FOCUS_THEMES_FIELD_INFO } from '@app/constants';
import type { InitiativeProfileFormData } from '@app/types';
import { useDropdownValues } from '@app/hooks';

export default function FunctionFocusAndThemesDisplayMode({
  initiativeProfile
}: {
  initiativeProfile?: InitiativeProfileFormData;
}) {
  const {
    initiativePrimaryFunction,
    initiativeSecondaryFunction,
    initiativeFocus,
    initiativeGeographicalFocus,
    regions,
    countries,
    marrakechPartnershipThemes,
    sustainableDevelopmentGoals
  } = initiativeProfile || {};

  let doubleTitle;
  let doubleTitleOptions;

  const { mappedData: countriesMappedData } = useDropdownValues('Countries');
  const { mappedData: regionsMappedData } = useDropdownValues('Regions');
  const { mappedData: sustainableDevelopmentGoalsMappedData } =
    useDropdownValues('SustainableDevelopmentGoals');
  const { mappedData: marrakechPartnershipThemesMappedData } =
    useDropdownValues('MarrakechPartnershipThemes');

  const mappedRegions = regions?.map((i) => regionsMappedData[i]);
  const mappedCountries = countries?.map((i) => countriesMappedData[i]);
  const mappedSustainableDevelopmentGoals = sustainableDevelopmentGoals?.map(
    (i) => sustainableDevelopmentGoalsMappedData[i]
  );
  const mappedMarrakechPartnershipThemes = marrakechPartnershipThemes?.map(
    (i) => marrakechPartnershipThemesMappedData[i]
  );

  switch (initiativeGeographicalFocus) {
    case 'Regional':
      doubleTitle = 'Regions';
      doubleTitleOptions = mappedRegions;
      break;
    case 'Multinational':
      doubleTitle = 'Countries';
      doubleTitleOptions = mappedCountries;
      break;
    case 'National':
      doubleTitle = 'Country';
      doubleTitleOptions = mappedCountries;
      break;
    default:
      doubleTitle = undefined;
      doubleTitleOptions = [];
      break;
  }

  return (
    <Stack direction="column" spacing={3}>
      <TitleAction
        title={FUNCTION_FOCUS_THEMES_FIELD_INFO.functions.title}
        to="/course-profile/edit/initialStep/4/initialTab/0"
        RouterLink={NavLink}
      />
      <Grid container rowSpacing={3} columnSpacing={1}>
        <Grid size={{ sm: 12, xs: 12 }}>
          <InfoCard
            title={FUNCTION_FOCUS_THEMES_FIELD_INFO.functions.subtitle}
            content={{
              type: 'list',
              value: !initiativeSecondaryFunction
                ? (initiativePrimaryFunction && [initiativePrimaryFunction]) ||
                  []
                : (initiativePrimaryFunction && [
                    initiativePrimaryFunction,
                    ...initiativeSecondaryFunction
                  ]) ||
                  []
            }}
          />
        </Grid>
      </Grid>
      <Divider />
      <TitleAction
        title={FUNCTION_FOCUS_THEMES_FIELD_INFO.focuses.title}
        to="/course-profile/edit/initialStep/4/initialTab/1"
        RouterLink={NavLink}
      />
      <Grid container rowSpacing={3} columnSpacing={1}>
        <Grid size={{ sm: 12, xs: 12 }}>
          <InfoCard
            title={FUNCTION_FOCUS_THEMES_FIELD_INFO.focuses.subtitle}
            content={{
              type: 'list',
              value: initiativeFocus ? [initiativeFocus] : []
            }}
          />
        </Grid>
        <Grid size={{ sm: 12, xs: 12 }}>
          <InfoCard
            title={doubleTitle}
            content={{
              type: 'list',
              doubleTitle: 'Geographical Focus',
              value: doubleTitleOptions
            }}
          />
        </Grid>
      </Grid>
      <Divider />
      <TitleAction
        title={FUNCTION_FOCUS_THEMES_FIELD_INFO.themes.title}
        to="/course-profile/edit/initialStep/4/initialTab/2"
        RouterLink={NavLink}
      />
      <Grid container rowSpacing={3} columnSpacing={1}>
        <Grid size={{ sm: 6, xs: 12 }}>
          <InfoCard
            title={FUNCTION_FOCUS_THEMES_FIELD_INFO.themes.subtitle}
            content={{
              type: 'list',
              value: mappedMarrakechPartnershipThemes
                ? [...mappedMarrakechPartnershipThemes]
                : []
            }}
          />
        </Grid>
        <Grid size={{ sm: 6, xs: 12 }}>
          <InfoCard
            title={
              FUNCTION_FOCUS_THEMES_FIELD_INFO.sustainableDevGoals.subtitle
            }
            content={{
              type: 'list',
              value: mappedSustainableDevelopmentGoals
                ? [...mappedSustainableDevelopmentGoals]
                : []
            }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
