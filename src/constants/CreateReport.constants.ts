import { StepStatus, type IStepProps } from '@app/lib/types';

export const CREATE_REPORT_STEPS: IStepProps[] = [
  {
    number: 1,
    label: 'Timeframe of information',
    status: StepStatus.ACTIVE
  },
  {
    number: 2,
    label: 'Actions, outcomes and impacts',
    status: StepStatus.INACTIVE
  },
  {
    number: 3,
    label: 'Progress of targets',
    status: StepStatus.INACTIVE
  },
  {
    number: 4,
    label: 'Challenges and opportunities',
    status: StepStatus.INACTIVE
  },
  {
    number: 5,
    label: 'Review and submission',
    status: StepStatus.INACTIVE
  }
];

export const CREATE_REPORT_FIELD_INFO = {
  timeframeOfInformation: {
    title: 'Timeframe of information',
    subtitle:
      'Select a default timeframe of information or define a custom one.'
  },
  typeTimeframeOfInformation: {
    title: 'Type of timeframe of information'
  },
  startDate: {
    title: 'Timeframe of Information start date',
    subtitle: 'Define the start date of the custom timeframe of Information.'
  },
  endDate: {
    title: 'Timeframe of information end date'
  },
  actions: {
    title: 'Actions, outcomes and impacts',
    subtitle:
      'In this section, you should provide information on the actions undertaken by the initiative and explain their outcomes and impacts.'
  },
  action: {
    title: {
      title: 'Action undertaken title',
      subtitle:
        'Provide a short title to be associated with the action being reported',
      helper: 'Maximum 100 characters'
    },
    description: {
      title: 'Action undertaken description',
      helper: 'Maximum 5,000 characters',
      subtitle:
        'Explain the steps taken and their connection to progress toward the goal. This should include information on who, what, where, and when. Please note that information on the outcome and impact of the action will be requested later.'
    },
    typeOfAction: {
      title: 'Type of action undertaken',
      subtitle:
        'Select the most applicable type of action described in "Action undertaken description"'
    },
    typeOfActionOther: {
      title: 'Type of action undertaken - other',
      helper: 'Maximum 100 characters'
    },
    associatedTargets: {
      title: 'Associated targets',
      subtitle:
        'Where applicable, select the target(s) to which the action contributes.'
    },
    impactExplanation: {
      title: 'Impact of the action',
      subtitle:
        'Explain the overall impact of the action with reference to the goal of the initiative.',
      helper: 'Maximum 5,000 characters'
    },
    contributionToMultilateralProcess: {
      title: 'Contribution of the action to the multilateral process',
      subtitle:
        'Indicate whether your action has contributed to any of the following UNFCCC multilateral processes'
    },
    contributionToMultilateralProcessDescription: {
      title:
        'Contribution of the action to the multilateral process description',
      helper: 'Maximum 3,000 characters'
    },
    outcomes: {
      title: 'Outcomes',
      subtitle: 'Explain the result and key achievements of the action',
      helper: 'Maximum 5,000 characters'
    },
    outcomesUrl: {
      title: 'Outcomes links',
      subtitle:
        'Provide up to three external links/URLs demonstrating the outcome of the action.'
    }
  }
};

export const ACTION_TYPE_OPTIONS = [
  { value: 'funding-disbursed', label: 'Funding disbursed for a project' },
  { value: 'policy-implementation', label: 'Policy implementation' },
  { value: 'capacity-building', label: 'Capacity building' },
  { value: 'technology-transfer', label: 'Technology transfer' },
  { value: 'research-development', label: 'Research and development' }
];

export const ASSOCIATED_TARGET_OPTIONS = [
  { value: 'target-1', label: 'Associated target 1' },
  { value: 'target-2', label: 'Associated target 2' },
  { value: 'target-3', label: 'Associated target 3' }
];

export const MULTILATERAL_PROCESS_OPTIONS = [
  { value: 'unfccc-process-1', label: 'UNFCCC Process 1' },
  { value: 'unfccc-process-2', label: 'UNFCCC Process 2' },
  { value: 'unfccc-process-3', label: 'UNFCCC Process 3' }
];

export const PROGRESS_OF_TARGETS_FIELD_INFO = {
  reportValue: {
    title: 'Report value​​'
  },
  updateStatus: {
    title: 'Update status​'
  },
  descriptionOfStatus: {
    title: 'Description of status​​​',
    helper: 'Maximum 500 characters'
  }
};

export const CHALLENGES_FIELD_INFO = {
  typesOfChallenges: {
    title: 'Types of challenges faced​​​',
    subtitle:
      'Select up to two most applicable challenge(s) the Initiative faced.​'
  },
  typesOfChallengesOther: {
    title: 'Types of challenges faced (other)​​​​​',
    subtitle: 'Write most applicable challenge(s) the Initiative faced.​​',
    helper: 'Maximum 100 characters'
  },
  descriptionOfChallenges: {
    title: 'Description of challenges​',
    subtitle: 'Describe most applicable challenge(s) the Initiative faced.',
    helper: 'Maximum 1500 characters'
  },
  descriptionOfOpportunities: {
    title: 'Description of opportunities identified​​​​​',
    subtitle: 'Explain opportunities identified by the Initiative.',
    helper: 'Maximum 1500 characters'
  }
};

export const REVIEW_FIELD_INFO = {
  targetDescription: {
    title: 'Target description'
  },
  targetStatus: {
    title: 'Target status​​​'
  },
  targetStatusExplanation: {
    title: 'Target status explanation​​​'
  },
  quantitativeStatus: {
    title: 'Quantitative status​'
  },
  quantitativeStatusExplanation: {
    title: 'Quantitative status​ explanation'
  },
  targetReportedValue: {
    title: 'Reported value​​'
  },
  targetUpdatedStatus: {
    title: 'Updated target status​​'
  }
};
