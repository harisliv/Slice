import { StepStatus, type IStepProps } from '@app/lib/types';
import type { GoalsFormData, InitiativeInformationFormData } from '@app/types';

export const INITIATIVE_INFORMATION_STEPS: IStepProps[] = [
  {
    number: 1,
    label: 'Course information',
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
    title: 'Course name',
    subtitle: 'Enter or update the name of the course'
  },
  website: {
    title: 'Website',
    subtitle:
      'Enter or update the URL of the primary official website/online resource associated with the course'
  },
  socialProfiles: {
    title: 'Social media',
    subtitle: 'Enter or update the URL of social media accounts of the course',
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
  logoUrl: {
    title: 'Logo',
    subtitle: 'Upload logo of the course'
  },
  launchDate: {
    title: 'Launch year',
    subtitle: 'Enter or update the date the course was launched/started'
  },
  launchEvent: {
    title: 'Launch event',
    subtitle:
      'If applicable, indicate whether the course was launched at one of the events listed below',
    options: [
      { label: 'Launch Event', value: 'Event' },
      { label: 'Unknown', value: 'Unknown' }
    ]
  },
  expectedEndDate: {
    title: 'Expected end date',
    subtitle:
      'Where applicable, enter or update the date the course is expected to conclude'
  },
  initiativeStatus: {
    title: 'Course status',
    subtitle: 'Provide or update the current status of the course',
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
      'Provide any additional information that may be of assistance, clarification or supplement in relation to the status of the course',
    helper: 'Maximum 3,000 characters'
  },
  summaryOutcomes: {
    title: 'Summary outcomes',
    subtitle: 'Provide information regarding the main outcomes of the course',
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
      'Select the primary organization(s) responsible for the public facing contact point of the course'
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
    title: 'Course goal impact statement',
    subtitle:
      "Provide a short explanation of the course's learning objectives and goals (ultimate objective of the course)."
  },
  climateRelatedGoalDescription: {
    title: 'Course goal description',
    subtitle:
      "Provide a detailed explanation of the course's learning objectives and goals."
  },
  climateRelatedGoalAlignmentParis: {
    title: 'Course goal alignment with educational standards',
    subtitle:
      'Explain how the course goals align with established educational standards and frameworks.'
  },
  climateRelatedGoalAlignmentMultilateral: {
    title: 'Course goal alignment with accreditation standards and frameworks',
    subtitle:
      'Select any accreditation standards or educational frameworks that the course goals align with, and, for each selected, explain how the course contributes to them.',

    inputPlaceholder: 'Course goal alignment'
  },
  climateRelatedGoalAlignmentOtherDescription: {
    title: '',
    helper: 'Maximum 3,000 characters',
    subtitle:
      'Explain how the course goals align with the selected accreditation standards or educational frameworks.'
  },
  additionalValueInitiative: {
    title: 'Additional value of the course',
    subtitle:
      'Explain how the course adds additional value towards achieving learning objectives, when compared with individual components working independently'
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
      'Explain the mechanisms and approaches applied by the course to monitor its progress towards its learning objectives and goals.',
    helper: 'Maximum 3,000 characters'
  },
  publicReportingOptions: {
    title: 'Type(s) of public reporting',
    subtitle:
      'Select the applicable approach(es) they take to publicly report progress. It should be noted that all registered courses are strongly encouraged to participate and report progress through the annual progress tracking process.',
    fields: {
      checkbox1:
        'The course will fully participate in the annual course progress tracking process',
      checkbox2:
        'The course publishes periodical progress reports (at least annually) regarding its work',
      checkbox3: 'The course reports progress in another way'
    }
  },
  publicReportingOther: {
    title: 'The course reports progress in another way',
    helper: 'Maximum 300 characters'
  },
  report: {
    pdf: {
      title: 'Periodical progress report (PDF)​​​',
      subtitle: 'Upload the periodical progress report published by the course.'
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
    title: 'Course goal impact statement',
    subtitle: 'Enter or update the name of the course'
  },
  goalDescription: {
    title: 'Course goal description',
    subtitle:
      'Enter or update the URL of the primary official website/online resource associated with the course'
  },
  goalAlignement: {
    title: 'Course goal alignment with educational standards',
    subtitle:
      'Enter or update the URL of the primary official website/online resource associated with the course'
  },
  goalAlignementWithOther: {
    title: 'Course goal alignment with accreditation standards and frameworks',
    subtitle:
      'Enter or update the URL of the primary official website/online resource associated with the course'
  },
  goalAlignementDescription: {
    title:
      'Course goal alignment with accreditation standards and frameworks description',
    subtitle:
      'Enter or update the URL of the primary official website/online resource associated with the course'
  },
  additionalValue: {
    title: 'Additional value of the course',
    subtitle:
      'Enter or update the URL of the primary official website/online resource associated with the course'
  },
  // Monitoring
  monitoringProgress: {
    title: 'Monitoring progress',
    subtitle:
      'Enter or update the URL of the primary official website/online resource associated with the course'
  },
  typesOfPublicReporting: {
    title: 'Type(s) of public reporting',
    subtitle: 'Select the current status of the course',
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
      'Explain how the course is organized, in particular, how it is collaborating with multiple stakeholders.',
    helper: 'Maximum 2,000 characters'
  },
  dedicatedStaff: {
    title: 'Dedicated staff',
    subtitle:
      'Select the most applicable number of dedicated full-time staff(s) operating the course.'
  },
  staffingInformation: {
    title: 'Staffing information',
    subtitle: 'Explain information related to the staffing of the course.',
    helper: 'Maximum 200 characters'
  },
  leadOrganizations: {
    title: 'Lead organizations, fiscal sponsors, and funders',
    subtitle:
      'Provide the list of individual entities/organizations that are taking particular roles to operate the course.'
  },
  participants: {
    title: 'Participants',
    subtitle:
      'A participant is an entity that is taking action to implement the goals of the course. A participant may be an enrolled student or a registered student: i. An enrolled student is an entity that has made a commitment to actively participate in the course. ii. A registered student is an entity that is registered but may not have the same level of commitment as enrolled students.'
  },
  signatoriesMembers: {
    title: 'Signatories and members',
    subtitle:
      'Identify if they have enrolled students and/or registered students.'
  },
  signatoryCriteria: {
    title: 'Enrolled student criteria',
    subtitle:
      'Explain the criteria applied by the course to allow entities to become enrolled students in the course',
    helper: 'Maximum 300 characters'
  },
  signatoryFollowUps: {
    title: 'Enrolled student follow ups',
    subtitle:
      'Select the applicable approach(es) the course takes to follow up on the progress of the enrolled students.'
  },
  signatoryFollowUpsOther: {
    title: 'Enrolled student follow-ups (other)',
    subtitle:
      'Write the applicable approach(es) the course takes to follow up on the progress of the enrolled students.',
    helper: 'Maximum 50 characters'
  },
  signatoryRemoval: {
    title: 'Enrolled student removal',
    subtitle:
      'Explain information regarding the processes applied by the course to remove enrolled students.',
    helper: 'Maximum 300 characters'
  },
  memberInformation: {
    title: 'Registered student information',
    subtitle:
      'Explain how registered students participate in the course and contribute toward its learning objectives and goals.',
    helper: 'Maximum 300 characters'
  },
  relatedInitiatives: {
    title: 'List of related courses with your course',
    subtitle:
      'Identify registered courses with which the reporting course has one of the following types of relationship'
  },
  relatedInitiativesPending: {
    title: 'List of courses pending relationship validation​',
    subtitle: 'Validate the relationship identified by other registered courses'
  }
};
