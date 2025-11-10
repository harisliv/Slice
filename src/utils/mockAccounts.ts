import { apiClient } from "@app/config/axios.config";
import type { AccountEntityOption } from "@app/types";

// Sample data for generating realistic account names
const companyTypes = [
  "Corporation",
  "Inc.",
  "Ltd.",
  "LLC",
  "Group",
  "Holdings",
  "Enterprises",
  "Solutions",
  "Systems",
  "Technologies",
  "Industries",
  "Partners",
  "Associates",
  "International",
  "Global",
  "Worldwide",
];

const businessSectors = [
  "Technology",
  "Finance",
  "Healthcare",
  "Energy",
  "Manufacturing",
  "Retail",
  "Transportation",
  "Construction",
  "Real Estate",
  "Education",
  "Media",
  "Telecommunications",
  "Agriculture",
  "Pharmaceuticals",
  "Automotive",
  "Aerospace",
  "Food & Beverage",
  "Hospitality",
  "Consulting",
  "Legal",
];

const cityNames = [
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Berlin",
  "Madrid",
  "Rome",
  "Amsterdam",
  "Barcelona",
  "Milan",
  "Vienna",
  "Stockholm",
  "Copenhagen",
  "Oslo",
  "Helsinki",
  "Dublin",
  "Brussels",
  "Zurich",
  "Geneva",
  "Luxembourg",
  "Warsaw",
  "Prague",
  "Budapest",
  "Athens",
  "Lisbon",
  "Bucharest",
  "Sofia",
  "Zagreb",
  "Belgrade",
  "Bratislava",
];

const organizationTypes = [
  "City Council",
  "Municipality",
  "Regional Government",
  "State Agency",
  "Federal Department",
  "Public Authority",
  "Development Agency",
  "Environmental Agency",
  "Transport Authority",
  "Health Authority",
  "Education Board",
  "Housing Authority",
  "Water Authority",
  "Energy Commission",
  "Planning Commission",
];

const adjectives = [
  "Advanced",
  "Global",
  "International",
  "National",
  "Regional",
  "Metropolitan",
  "Urban",
  "Sustainable",
  "Green",
  "Smart",
  "Digital",
  "Innovative",
  "Modern",
  "Premier",
  "Elite",
  "Prime",
  "First",
  "United",
  "Allied",
  "Pacific",
  "Atlantic",
  "European",
  "American",
  "Asian",
  "African",
];

const nouns = [
  "Solutions",
  "Systems",
  "Services",
  "Group",
  "Partners",
  "Associates",
  "Enterprises",
  "Industries",
  "Holdings",
  "Capital",
  "Ventures",
  "Investments",
  "Management",
  "Consulting",
  "Advisory",
  "Resources",
  "Development",
  "Innovation",
  "Technologies",
  "Networks",
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
 * Generates a single mock account
 */
function generateMockAccount(index: number): AccountEntityOption {
  const accountType = randomInt(1, 4);
  let name: string;

  switch (accountType) {
    case 1: // Company
      if (Math.random() > 0.5) {
        // Format: "Adjective Noun CompanyType"
        name = `${randomElement(adjectives)} ${randomElement(
          nouns
        )} ${randomElement(companyTypes)}`;
      } else {
        // Format: "Sector CompanyType"
        name = `${randomElement(businessSectors)} ${randomElement(
          companyTypes
        )}`;
      }
      break;

    case 2: // City/Government
      if (Math.random() > 0.5) {
        // Format: "CityName OrganizationType"
        name = `${randomElement(cityNames)} ${randomElement(
          organizationTypes
        )}`;
      } else {
        // Format: "CityName City Council"
        name = `${randomElement(cityNames)} City Council`;
      }
      break;

    case 3: // Combined format
      name = `${randomElement(adjectives)} ${randomElement(
        cityNames
      )} ${randomElement(organizationTypes)}`;
      break;

    default: // Simple company name
      name = `${randomElement(businessSectors)} ${randomElement(
        companyTypes
      )} ${randomInt(100, 9999)}`;
  }

  // Add some variety with numbers or additional descriptors
  if (Math.random() > 0.7) {
    name = `${name} ${randomInt(1, 5)}`;
  }

  return {
    id: `account-${String(index + 1).padStart(6, "0")}`,
    name: name.trim(),
  };
}

/**
 * Generates an array of mock accounts
 */
export function generateMockAccounts(
  count: number = 2000
): AccountEntityOption[] {
  const accounts: AccountEntityOption[] = [];
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
      await apiClient.put("/dropdown/accounts", batch);
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
if (typeof window !== "undefined") {
  (window as any).populateMockAccounts = populateMockAccounts;
  (window as any).generateMockAccounts = generateMockAccounts;
}
