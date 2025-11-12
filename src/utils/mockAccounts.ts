import { apiClient } from '@app/config/axios.config';
import type { AccountEntityCreateDTO } from '@app/types';

// Sample data for generating realistic account names
const companyTypes = [
  'Corporation',
  'Inc.',
  'Ltd.',
  'LLC',
  'Group',
  'Holdings',
  'Enterprises',
  'Solutions',
  'Systems',
  'Technologies',
  'Industries',
  'Partners',
  'Associates',
  'International',
  'Global',
  'Worldwide'
];

const businessSectors = [
  'Technology',
  'Finance',
  'Healthcare',
  'Energy',
  'Manufacturing',
  'Retail',
  'Transportation',
  'Construction',
  'Real Estate',
  'Education',
  'Media',
  'Telecommunications',
  'Agriculture',
  'Pharmaceuticals',
  'Automotive',
  'Aerospace',
  'Food & Beverage',
  'Hospitality',
  'Consulting',
  'Legal'
];

const cityNames = [
  'New York',
  'London',
  'Tokyo',
  'Paris',
  'Berlin',
  'Madrid',
  'Rome',
  'Amsterdam',
  'Barcelona',
  'Milan',
  'Vienna',
  'Stockholm',
  'Copenhagen',
  'Oslo',
  'Helsinki',
  'Dublin',
  'Brussels',
  'Zurich',
  'Geneva',
  'Luxembourg',
  'Warsaw',
  'Prague',
  'Budapest',
  'Athens',
  'Lisbon',
  'Bucharest',
  'Sofia',
  'Zagreb',
  'Belgrade',
  'Bratislava'
];

const organizationTypes = [
  'City Council',
  'Municipality',
  'Regional Government',
  'State Agency',
  'Federal Department',
  'Public Authority',
  'Development Agency',
  'Environmental Agency',
  'Transport Authority',
  'Health Authority',
  'Education Board',
  'Housing Authority',
  'Water Authority',
  'Energy Commission',
  'Planning Commission'
];

const adjectives = [
  'Advanced',
  'Global',
  'International',
  'National',
  'Regional',
  'Metropolitan',
  'Urban',
  'Sustainable',
  'Green',
  'Smart',
  'Digital',
  'Innovative',
  'Modern',
  'Premier',
  'Elite',
  'Prime',
  'First',
  'United',
  'Allied',
  'Pacific',
  'Atlantic',
  'European',
  'American',
  'Asian',
  'African'
];

const nouns = [
  'Solutions',
  'Systems',
  'Services',
  'Group',
  'Partners',
  'Associates',
  'Enterprises',
  'Industries',
  'Holdings',
  'Capital',
  'Ventures',
  'Investments',
  'Management',
  'Consulting',
  'Advisory',
  'Resources',
  'Development',
  'Innovation',
  'Technologies',
  'Networks'
];

// Categories
const categories = ['Member', 'Signatory', 'Partner', 'Observer', 'Supporter'];

// Countries (sample from the dropdown)
const countries = [
  'United States',
  'United Kingdom',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Netherlands',
  'Belgium',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Poland',
  'Czech Republic',
  'Austria',
  'Switzerland',
  'Portugal',
  'Greece',
  'Ireland',
  'Japan',
  'China',
  'India',
  'Brazil',
  'Canada',
  'Australia',
  'South Africa',
  'Mexico',
  'Argentina',
  'Chile',
  'Colombia'
];

// Identity types
const identityTypes = [
  'Tax ID',
  'Registration Number',
  'Business License',
  'EIN',
  'VAT Number',
  'Company Number'
];

// Business activities
const businessActivities = [
  'Technology Services',
  'Financial Services',
  'Healthcare',
  'Energy',
  'Manufacturing',
  'Retail',
  'Transportation',
  'Construction',
  'Real Estate',
  'Education',
  'Media',
  'Telecommunications',
  'Agriculture',
  'Pharmaceuticals',
  'Automotive',
  'Aerospace',
  'Food & Beverage',
  'Hospitality',
  'Consulting',
  'Legal Services'
];

// Subnational government types
const subnationalGovernmentTypes = [
  'State',
  'Province',
  'Region',
  'County',
  'Municipality',
  'City',
  'District',
  'Other'
];

/**
 * Generates a random element from an array
 */
function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generates a random number between min and max (inclusive)
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random date within the last 5 years
 */
function randomDate(): string {
  const now = new Date();
  const fiveYearsAgo = new Date(now.getFullYear() - 5, 0, 1);
  const randomTime =
    fiveYearsAgo.getTime() +
    Math.random() * (now.getTime() - fiveYearsAgo.getTime());
  return new Date(randomTime).toISOString();
}

/**
 * Generates a single mock account with full details
 */
function generateMockAccount(index: number): AccountEntityCreateDTO {
  const accountTypeNum = randomInt(1, 4);
  let name: string;
  let type: string;
  let subnationalGovernmentType: string | null = null;
  let subnationalGovernmentTypeOther: string | null = null;

  switch (accountTypeNum) {
    case 1: // Company
      if (Math.random() > 0.5) {
        name = `${randomElement(adjectives)} ${randomElement(
          nouns
        )} ${randomElement(companyTypes)}`;
      } else {
        name = `${randomElement(businessSectors)} ${randomElement(
          companyTypes
        )}`;
      }
      type = 'Company';
      break;

    case 2: // City/Government
      if (Math.random() > 0.5) {
        name = `${randomElement(cityNames)} ${randomElement(
          organizationTypes
        )}`;
      } else {
        name = `${randomElement(cityNames)} City Council`;
      }
      type = Math.random() > 0.5 ? 'City' : 'Subnational Government Agency';
      if (type === 'Subnational Government Agency') {
        subnationalGovernmentType = randomElement(subnationalGovernmentTypes);
        if (subnationalGovernmentType === 'Other') {
          subnationalGovernmentTypeOther = 'Custom Government Type';
        }
      }
      break;

    case 3: // Combined format
      name = `${randomElement(adjectives)} ${randomElement(
        cityNames
      )} ${randomElement(organizationTypes)}`;
      type = randomElement(['NGO', 'International Organization', 'Foundation']);
      break;

    default: // Simple company name
      name = `${randomElement(businessSectors)} ${randomElement(
        companyTypes
      )} ${randomInt(100, 9999)}`;
      type = 'Company';
  }

  // Add some variety with numbers or additional descriptors
  if (Math.random() > 0.7) {
    name = `${name} ${randomInt(1, 5)}`;
  }

  const accountId = `account-${String(index + 1).padStart(6, '0')}`;
  const selectedCountry = randomElement(countries);
  const selectedCategory = randomElement(categories);
  const selectedIdentityType =
    Math.random() > 0.5 ? randomElement(identityTypes) : null;
  const selectedBusinessActivity =
    type === 'Company' && Math.random() > 0.3
      ? randomElement(businessActivities)
      : null;

  return {
    id: accountId,
    name: name.trim(),
    country: selectedCountry,
    type: type,
    category: selectedCategory,
    dateJoined: randomDate(),
    legalName: Math.random() > 0.3 ? `${name.trim()} Legal Entity` : null,
    identityType: selectedIdentityType,
    identityNumber: selectedIdentityType
      ? `${randomInt(100000, 999999)}`
      : null,
    businessActivity: selectedBusinessActivity,
    subnationalGovernmentType: subnationalGovernmentType,
    subnationalGovernmentTypeOther: subnationalGovernmentTypeOther
  };
}

/**
 * Generates an array of mock accounts with full details
 */
export function generateMockAccounts(
  count: number = 2000
): AccountEntityCreateDTO[] {
  const accounts: AccountEntityCreateDTO[] = [];
  const usedNames = new Set<string>();

  for (let i = 0; i < count; i++) {
    let account = generateMockAccount(i);

    // Ensure unique names (retry if duplicate)
    let retries = 0;
    while (usedNames.has(account.name) && retries < 10) {
      account = generateMockAccount(i);
      retries++;
    }

    usedNames.add(account.name);
    accounts.push(account);
  }

  return accounts;
}

/**
 * Populates Supabase with mock accounts
 */
export async function populateMockAccounts(
  count: number = 2000
): Promise<void> {
  console.log(`Generating ${count} mock accounts...`);
  const accounts = generateMockAccounts(count);

  console.log(`Storing ${accounts.length} accounts in Supabase...`);

  // Insert accounts in batches of 100 to avoid payload size limits
  const batchSize = 100;
  let inserted = 0;

  for (let i = 0; i < accounts.length; i += batchSize) {
    const batch = accounts.slice(i, i + batchSize);
    try {
      await apiClient.put('/functions/v1/dropdown-accounts', batch);
      inserted += batch.length;
      console.log(`Inserted ${inserted}/${accounts.length} accounts...`);
    } catch (error) {
      console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
      throw error;
    }
  }

  console.log(`Successfully stored ${accounts.length} accounts in Supabase`);
}

/**
 * Utility function to be called from browser console or during development
 * Usage: window.populateMockAccounts(2000)
 */
if (typeof window !== 'undefined') {
  (window as any).populateMockAccounts = populateMockAccounts;
  (window as any).generateMockAccounts = generateMockAccounts;
}
