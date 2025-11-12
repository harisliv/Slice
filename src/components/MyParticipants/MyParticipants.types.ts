export const dateFormat: string = 'DD/MM/YYYY';

export const defaultVisibileColumns = {
  country: true,
  type: true,
  category: true,
  entityOperatingName: true,
  pledge: true,
  legalName: false,
  identityType: true,
  identityNumber: false,
  businessActivity: false,
  subnationalGovernment: false,
  subnationalGovernmentOther: false,
  dateJoined: true,
  participantFocalPoint: false,
  participantEmail: false,
  gcapId: false
};

export const labelMap: Record<string, string> = {
  type: 'Type',
  country: 'Country',
  category: 'Category',
  pledge: 'Pledge',
  identityType: 'Identity type',
  businessActivity: 'Business activity',
  subnationalGovernment: 'Subnational Government Type',
  dateJoined: 'Date joined',
  visibility: 'Visibility'
};
