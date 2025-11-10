import type { GoalsFormData, InitiativeInformationFormData } from '@app/types';
import { StepStatus, type IStepProps } from '@app/lib/types';

export const INITIATIVE_INFORMATION_STEPS: IStepProps[] = [
  {
    number: 1,
    label: 'Initiative information',
    status: StepStatus.COMPLETED
  },
  {
    number: 2,
    label: 'Goals, targets and monitoring',
    status: StepStatus.COMPLETED
  },
  {
    number: 3,
    label: 'Organizational structure',
    status: StepStatus.COMPLETED
  },
  {
    number: 4,
    label: 'Function, focus and themes',
    status: StepStatus.COMPLETED
  }
];

export const INITIATIVE_INFORMATION_FIELD_INFO: Record<
  keyof Omit<InitiativeInformationFormData, 'id' | 'closureReport.id'>,
  {
    title: string;
    subtitle: string;
    fields?: { title: string; name: string }[];
    options?: { value: string; label: string; description?: string }[];
    helper?: string;
  }
> = {
  name: {
    title: 'Initiative name',
    subtitle: 'Enter or update the name of the initiative'
  },
  website: {
    title: 'Website',
    subtitle:
      'Enter or update the URL of the primary official website/online resource associated with the initiative'
  },
  socialProfiles: {
    title: 'Social media',
    subtitle:
      'Enter or update the URL of social media accounts of the initiative',
    fields: [
      {
        title: 'Twitter',
        name: 'twitter'
      },
      {
        title: 'Facebook',
        name: 'facebook'
      },
      {
        title: 'LinkedIn',
        name: 'linkedin'
      },
      {
        title: 'Instagram',
        name: 'instagram'
      },
      {
        title: 'YouTube',
        name: 'youtube'
      }
    ]
  },
  logoBase64: {
    title: 'Logo',
    subtitle: 'Upload logo of the initiative'
  },
  launchDate: {
    title: 'Launch year',
    subtitle: 'Enter or update the date the initiative was launched/started'
  },
  launchEvent: {
    title: 'Launch event',
    subtitle:
      'If applicable, indicate whether the initiative was launched at one of the events listed below',
    options: [
      { label: 'Launch Event', value: 'Event' },
      { label: 'Unknown', value: 'Unknown' }
    ]
  },
  expectedEndDate: {
    title: 'Expected end date',
    subtitle:
      'Where applicable, enter or update the date the initiative is expected to conclude'
  },
  initiativeStatus: {
    title: 'Initiative status',
    subtitle: 'Provide or update the current status of the initiative',
    options: [
      {
        value: 'Active',
        label: 'Active'
      },
      {
        value: 'Concluded',
        label: 'Concluded'
      },
      {
        value: 'Unknown',
        label: 'Unkwown'
      }
    ]
  },
  explanationStatus: {
    title: 'Explanation of status',
    subtitle:
      'Provide any additional information that may be of assistance, clarification or supplement in relation to the status of the initiative',
    helper: 'Maximum 3,000 characters'
  },
  summaryOutcomes: {
    title: 'Summary outcomes',
    subtitle:
      'Provide information regarding the main outcomes of the initiative',
    helper: 'Maximum 3,000 characters'
  },
  closureReport: {
    title: 'Closure report',
    subtitle: 'Upload the closure report, if available'
  },
  contactEmail: {
    title: 'Email address',
    subtitle: 'Enter or update the email contact for public enquiries'
  },
  contactOrganizations: {
    title: 'Contact organization(s)',
    subtitle:
      'Select the primary organization(s) responsible for the public facing contact point of the initiative'
  }
};

export const GOALS_FIELD_INFO: Record<
  keyof Omit<
    GoalsFormData,
    | 'id'
    | 'tempClimateRelatedGoalAlignmentMultilateralAgreements'
    | 'tempClimateRelatedGoalAlignmentMultilateralDescription'
  >,
  {
    title: string;
    subtitle: string;
    options?: { value: string; label: string; description?: string }[];
    inputPlaceholder?: string;
    helper?: string;
  }
> = {
  climateRelatedGoalImpactStatement: {
    title: 'Climate-related goal impact statement',
    subtitle:
      "Provide a short explanation of the Initiative's climate-related goal (ultimate objective of the Initiative)."
  },
  climateRelatedGoalDescription: {
    title: 'Climate-related goal description',
    subtitle:
      "Provide a detailed explanation of the Initiative's climate-related goal."
  },
  climateRelatedGoalAlignmentParis: {
    title: 'Climate-related goal alignment with the Paris Agreement',
    subtitle:
      'Explain how their climate-related goal contributes to the goals of the Paris Agreement.'
  },
  climateRelatedGoalAlignmentMultilateral: {
    title:
      'Climate-related goal alignment with other multilateral environmental agreements',
    subtitle:
      'Select any other multilateral environmental agreement(s) in which their climate-related goal contributes to, and, for each of the agreements selected, explain how it contributes to.',

    inputPlaceholder: 'Climate-related goal alignment'
  },
  climateRelatedGoalAlignmentOtherDescription: {
    title: '',
    helper: 'Maximum 3,000 characters',
    subtitle:
      'Explain how the climate-related goal of the Initiative aligns with the selected multilateral environmental agreement.'
  },
  additionalValueInitiative: {
    title: 'Additional value of the initiative',
    subtitle:
      'Explain how the CCI is adding additional value towards achieving the climate goal, when compared with each entity within the CCI working independently'
  }
};

export const CREATE_TARGET_FIELD_INFO = {
  target: {
    title: {
      title: 'Target title',
      subtitle:
        'Provide a short title to be associated with the target being reported'
    },
    description: {
      title: 'Target description',
      helper: 'Maximum 5,000 characters'
    },
    updates: {
      title: 'Target updates',
      helper: 'Helper text'
    },
    year: {
      title: 'Target year',
      helper: 'YYYY (> Target base year)'
    },
    baseyear: {
      title: 'Target base year',
      helper: 'YYYY (>1990 and < Target year)'
    },
    type: {
      title: 'Target type',
      help: 'Max 3'
    },
    value: {
      title: 'Target value',
      helper: 'Helper text'
    },
    unit: {
      title: 'Target unit',
      helper: 'Helper text'
    }
  }
};

export const MONITORING_FIELD_INFO = {
  progress: {
    title: 'Monitoring progress',
    subtitle:
      'Explain the mechanisms and approaches applied by the Initiative to monitor its progress towards its climate-related goal.',
    helper: 'Maximum 3,000 characters'
  },
  publicReportingOptions: {
    title: 'Type(s) of public reporting',
    subtitle:
      'Select the applicable approach(es) they take to publicly report progress. It should be noted that all registered Initiatives are strongly encouraged to participate and report progress through NAZCA’s annual progress tracking process.',
    fields: {
      checkbox1:
        'The Cooperative Climate Initiative will fully participate in GCAP’s annual Cooperative Climate Initiative progress tracking process',
      checkbox2:
        'The Cooperative Climate Initiative publishes periodical progress reports (at least annually) regarding its work',
      checkbox3:
        'The Cooperative Climate Initiative reports progress in another way'
    }
  },
  publicReportingOther: {
    title: 'The Cooperative Climate Initiative reports progress in another way',
    helper: 'Maximum 300 characters'
  },
  report: {
    pdf: {
      title: 'Periodical progress report (PDF)​​​',
      subtitle:
        'Upload the periodical progress report published by the Initiative.'
    },
    title: {
      title: 'Periodical progress report (Title)​​​',
      subtitle: 'Provide the title of the report.',
      helper: 'Maximum 100 characters'
    },
    year: {
      title: 'Periodical progress report (Year)​​​ ',
      subtitle: 'Enter the year of the publication of the report.',
      helper: 'YYYY'
    }
  }
};

export const GOALS_TARGETS_MONITORING_FIELD_INFO = {
  // Goals
  goalImpactStatement: {
    title: 'Climate-related goal impact statement',
    subtitle: 'Enter or update the name of the initiative'
  },
  goalDescription: {
    title: 'Climate-related goal description',
    subtitle:
      'Enter or update the URL of the primary official website/online resource associated with the initiative'
  },
  goalAlignement: {
    title: 'Climate-related goal alignment with the Paris agreement',
    subtitle:
      'Enter or update the URL of the primary official website/online resource associated with the initiative'
  },
  goalAlignementWithOther: {
    title:
      'Climate-related goal alignment with other multilateral environmental agreements',
    subtitle:
      'Enter or update the URL of the primary official website/online resource associated with the initiative'
  },
  goalAlignementDescription: {
    title:
      'Climate-related goal alignment with other multilateral environmental agreements description',
    subtitle:
      'Enter or update the URL of the primary official website/online resource associated with the initiative'
  },
  additionalValue: {
    title: 'Additional value of the Initiative',
    subtitle:
      'Enter or update the URL of the primary official website/online resource associated with the initiative'
  },
  // Monitoring
  monitoringProgress: {
    title: 'Monitoring progress',
    subtitle:
      'Enter or update the URL of the primary official website/online resource associated with the initiative'
  },
  typesOfPublicReporting: {
    title: 'Type(s) of public reporting',
    subtitle: 'Select the current status of the initiative',
    value: ['Active', 'Concluded', 'Unkwown']
  },
  previouslySubmittedProgressReports: {
    title: 'Previously submitted progress reports'
  }
};

export const ORGANIZATIONAL_STRUCTURE_FIELD_INFO = {
  organizationalArrangements: {
    title: 'Organizational arrangements',
    subtitle:
      'Explain how the Initiative is organized, in particular, how it is collaborating with multiple stakeholders.',
    helper: 'Maximum 2,000 characters'
  },
  dedicatedStaff: {
    title: 'Dedicated staff',
    subtitle:
      'Select the most applicable number of dedicated full-time staff(s) operating the Initiative.'
  },
  staffingInformation: {
    title: 'Staffing information',
    subtitle: 'Explain information related to the staffing of the CCI.',
    helper: 'Maximum 200 characters'
  },
  leadOrganizations: {
    title: 'Lead organizations, fiscal sponsors, and funders',
    subtitle:
      'Provide the list of individual entities/organizations that are taking particular roles to operate the Initiative.'
  },
  participants: {
    title: 'Participants',
    subtitle:
      'A participant is an entity that is taking action to implement the goal of the Initiative. A participant may be a signatory or a member: i. A signatory is an entity that has made a commitment, such as a pledge, to undertake action as defined by the Initiative. ii. A member is an entity, without a signatory commitment, taking action to implement the goal of the Initiative.'
  },
  signatoriesMembers: {
    title: 'Signatories and members',
    subtitle: 'Identify if they have signatories and/or members.'
  },
  signatoryCriteria: {
    title: 'Signatory criteria',
    subtitle:
      'Explain the criteria applied by the Initiative to allow entities to become signatories to the Initiative',
    helper: 'Maximum 300 characters'
  },
  signatoryFollowUps: {
    title: 'Signatory follow ups',
    subtitle:
      'Select the applicable approach(es) the Initiative takes to follow up on the progress of the signatories.'
  },
  signatoryFollowUpsOther: {
    title: 'Signatory follow-ups (other)',
    subtitle:
      'Write the applicable approach(es) the Initiative takes to follow up on the progress of the signatories.',
    helper: 'Maximum 50 characters'
  },
  signatoryRemoval: {
    title: 'Signatory removal',
    subtitle:
      'Explain information regarding the processes applied by the CCI to remove signatories.',
    helper: 'Maximum 300 characters'
  },
  memberInformation: {
    title: 'Member information',
    subtitle:
      'Explain how members participate in the CCI and contribute toward its climate-related goal.',
    helper: 'Maximum 300 characters'
  },
  relatedInitiatives: {
    title: 'List of related initiatives with your initiative',
    subtitle:
      'Identify registered Initiatives with who the reporting Initiative has a one of the following types of relationship'
  },
  relatedInitiativesPending: {
    title: 'List of initiatives pending relationship validation​',
    subtitle:
      'Validate the relationship identified by other registered Initiatives'
  }
};
