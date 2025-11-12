import { z } from 'zod';

import {
  AccountEntityDetailsShape,
  AccountEntityOptionSchema,
  type AccountEntityCreateDTO,
  type AccountEntityDetails,
  type AccountEntityOption
} from '@app/types';
import { constructErrorResponseFromZod } from './error';
import {
  convertToValidSelectValue,
  normalizeDateTime,
  normalizeString
} from './general';
import { logger } from './logger';

export const isAccountEntityOptionArray = (
  u: unknown
): u is AccountEntityOption[] =>
  z.array(AccountEntityOptionSchema).safeParse(u).success;

export const isAccountEntityDetails = (
  u: unknown,
  withLogs: boolean = true
): u is AccountEntityDetails => {
  const result = AccountEntityDetailsShape.safeParse(u);
  if (result.error && withLogs) {
    logger.error(
      'Invalid response format',
      new Error('Smart Dropdown'),
      constructErrorResponseFromZod(result)
    );
  }
  return result.success;
};

export const convertToClientEntity = (
  value: AccountEntityCreateDTO
): AccountEntityDetails => ({
  id: value.id || '',
  name: normalizeString(value.name),
  country: normalizeString(value.country),
  type: normalizeString(value.type),
  category: normalizeString(value.category),
  dateJoined: normalizeDateTime(value.dateJoined),
  legalName: normalizeString(value.legalName),
  identityType: normalizeString(value.identityType),
  identityNumber: normalizeString(value.identityNumber),
  businessActivity: normalizeString(value.businessActivity),
  subnationalGovernmentType: normalizeString(value.subnationalGovernmentType),
  subnationalGovernmentTypeOther: normalizeString(
    value.subnationalGovernmentTypeOther
  ),
  assignedRoles: []
});

export const convertToServerEntity = (
  value: Partial<AccountEntityDetails> & { initiativeId?: string }
): AccountEntityCreateDTO => ({
  ...(value.id ? { id: value.id } : {}),
  ...(value.initiativeId ? { initiativeId: value.initiativeId } : {}),
  name: normalizeString(value.name),
  country: normalizeString(value.country),
  type: normalizeString(value.type),
  category: convertToValidSelectValue(value.category),
  dateJoined: value.dateJoined ?? null,
  legalName: normalizeString(value.legalName),
  identityType: convertToValidSelectValue(value.identityType),
  identityNumber: normalizeString(value.identityNumber),
  businessActivity: convertToValidSelectValue(value.businessActivity),
  subnationalGovernmentType: convertToValidSelectValue(
    value.subnationalGovernmentType
  ),
  subnationalGovernmentTypeOther: convertToValidSelectValue(
    value.subnationalGovernmentTypeOther
  )
});
