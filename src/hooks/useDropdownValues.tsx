import type { Option } from "@app/lib/types";
import useGetPrivateRoutes from "./useGetPrivateRoutes";
import { useActiveInitiative } from "./useActiveInitiative";
import useInitiatives from "./useInitiatives";
import { useMemo } from "react";

export type DropdownName =
  | "AccountType"
  | "ActionProType"
  | "ActionType"
  | "ChallengeFaced"
  | "InitiativeStatus"
  | "RelationType"
  | "ReportStatus"
  | "TargetProgressTypes"
  | "TargetType"
  | "TypesOfChallengesFaced"
  | "Sessions"
  | "GoalAlignmentOther"
  | "Targets"
  | "InitiativePrimaryFunctionTypes"
  | "ClimateFocusTypes"
  | "GeographicalFocusTypes"
  | "Countries"
  | "IdentifyProviderType" // identityTypes
  | "BusinessActivities"
  | "BusinessRolesAssignment" // assignedRoles
  | "Regions"
  | "MarrakechPartnershipThemes"
  | "SustainableDevelopmentGoals"
  | "Agreements"
  | "SubNationalGovernmentType"
  | "StaffingTypes"
  | "SignatoriesAndMembers"
  | "SignatoryFollowUps"
  | "Initiatives"
  | "CciRelationType"
  | "CciRelationStatus"
  | "InvolvedEntityType"
  | "ParticipantType"
  | "ParticipantCategory"
  | "";

// Mock data for all dropdown types
const MOCK_DROPDOWN_DATA: Record<
  Exclude<DropdownName, "">,
  string[] | Record<string, string>
> = {
  AccountType: [
    "Public University",
    "Private University",
    "Community College",
    "Vocational School",
    "Online Learning Platform",
    "Educational Institution",
  ],
  ActionProType: [
    "Bachelor's Degree Program",
    "Master's Degree Program",
    "Doctoral Program",
    "Certificate Program",
    "Continuing Education",
  ],
  ActionType: [
    "Lecture",
    "Workshop",
    "Seminar",
    "Laboratory work",
    "Field trip",
    "Group project",
    "Individual assignment",
    "Research project",
    "Presentation",
    "Exam",
    "Online module",
    "Other",
  ],
  ChallengeFaced: [
    "Technical skills",
    "Financial resources",
    "Learning materials",
    "Student engagement",
    "Curriculum alignment",
    "Other",
  ],
  InitiativeStatus: ["Active", "Completed"],
  RelationType: ["Parent", "Child", "Sibling", "Partner", "Related"],
  ReportStatus: [
    "Draft",
    "Submitted",
    "Under Review",
    "Graded",
    "Returned",
    "Published",
  ],
  TargetProgressTypes: [
    "On track",
    "At risk",
    "Behind schedule",
    "Completed",
    "Not started",
  ],
  TargetType: [
    "Knowledge acquisition",
    "Skill development",
    "Grade improvement",
    "Attendance rate",
    "Completion rate",
    "Student enrollment",
    "Course completion",
    "Student satisfaction",
    "Pass rate",
    "Research output",
    "Other",
    "Certification achievement",
    "Academic standards",
  ],
  TypesOfChallengesFaced: [
    "Technical skills",
    "Financial resources",
    "Learning materials",
    "Student engagement",
    "Curriculum alignment",
    "Other",
  ],
  Sessions: [
    "Fall Semester",
    "Spring Semester",
    "Summer Semester",
    "Winter Semester",
    "Academic Year",
    "Other",
  ],
  GoalAlignmentOther: [
    "Accreditation Standards",
    "Learning Outcomes",
    "Curriculum Framework",
    "Department Goals",
    "Other",
  ],
  Targets: [
    "Grade improvement",
    "Skill mastery",
    "Knowledge retention",
    "Student engagement",
    "Course completion",
    "Other",
  ],
  InitiativePrimaryFunctionTypes: [
    "Curriculum development",
    "Teaching",
    "Assessment and evaluation",
    "Student support",
    "Research and development",
    "Academic advising",
    "Other",
  ],
  ClimateFocusTypes: [
    "STEM",
    "Humanities",
    "Social Sciences",
    "Business",
    "Technology",
    "Professional Development",
    "Not applicable",
  ],
  GeographicalFocusTypes: [
    "Global",
    "Regional",
    "National",
    "Sub-national",
    "Local",
    "Transboundary",
  ],
  Countries: {
    "de94e180-9fa3-ec11-9840-0022489ef88d": "Algeria",
    "e094e180-9fa3-ec11-9840-0022489ef88d": "Egypt",
    "e294e180-9fa3-ec11-9840-0022489ef88d": "Libya",
    "e594e180-9fa3-ec11-9840-0022489ef88d": "Morocco",
    "e794e180-9fa3-ec11-9840-0022489ef88d": "Sudan",
    "e994e180-9fa3-ec11-9840-0022489ef88d": "Tunisia",
    "eb94e180-9fa3-ec11-9840-0022489ef88d": "Burundi",
    "ed94e180-9fa3-ec11-9840-0022489ef88d": "Comoros",
    "ef94e180-9fa3-ec11-9840-0022489ef88d": "Djibouti",
    "f194e180-9fa3-ec11-9840-0022489ef88d": "Eritrea",
    "f394e180-9fa3-ec11-9840-0022489ef88d": "Ethiopia",
    "f594e180-9fa3-ec11-9840-0022489ef88d": "Kenya",
    "f794e180-9fa3-ec11-9840-0022489ef88d": "Madagascar",
    "f994e180-9fa3-ec11-9840-0022489ef88d": "Malawi",
    "fb94e180-9fa3-ec11-9840-0022489ef88d": "Mauritius",
    "fd94e180-9fa3-ec11-9840-0022489ef88d": "Mozambique",
    "ff94e180-9fa3-ec11-9840-0022489ef88d": "Rwanda",
    "0195e180-9fa3-ec11-9840-0022489ef88d": "Seychelles",
    "0395e180-9fa3-ec11-9840-0022489ef88d": "Somalia",
    "0595e180-9fa3-ec11-9840-0022489ef88d": "South Sudan",
    "0795e180-9fa3-ec11-9840-0022489ef88d": "Uganda",
    "0995e180-9fa3-ec11-9840-0022489ef88d": "United Republic of Tanzania",
    "0b95e180-9fa3-ec11-9840-0022489ef88d": "Zambia",
    "0d95e180-9fa3-ec11-9840-0022489ef88d": "Zimbabwe",
    "0f95e180-9fa3-ec11-9840-0022489ef88d": "Angola",
    "1195e180-9fa3-ec11-9840-0022489ef88d": "Cameroon",
    "1395e180-9fa3-ec11-9840-0022489ef88d": "Central African Republic",
    "1595e180-9fa3-ec11-9840-0022489ef88d": "Chad",
    "1795e180-9fa3-ec11-9840-0022489ef88d": "Congo",
    "1995e180-9fa3-ec11-9840-0022489ef88d": "Democratic Republic of the Congo",
    "1b95e180-9fa3-ec11-9840-0022489ef88d": "Equatorial Guinea",
    "1d95e180-9fa3-ec11-9840-0022489ef88d": "Gabon",
    "1f95e180-9fa3-ec11-9840-0022489ef88d": "Sao Tome and Principe",
    "2195e180-9fa3-ec11-9840-0022489ef88d": "Botswana",
    "2495e180-9fa3-ec11-9840-0022489ef88d": "Eswatini",
    "2695e180-9fa3-ec11-9840-0022489ef88d": "Lesotho",
    "2895e180-9fa3-ec11-9840-0022489ef88d": "Namibia",
    "2a95e180-9fa3-ec11-9840-0022489ef88d": "South Africa",
    "2c95e180-9fa3-ec11-9840-0022489ef88d": "Benin",
    "2e95e180-9fa3-ec11-9840-0022489ef88d": "Burkina Faso",
    "3095e180-9fa3-ec11-9840-0022489ef88d": "Cabo Verde",
    "3295e180-9fa3-ec11-9840-0022489ef88d": "Côte d'Ivoire",
    "3495e180-9fa3-ec11-9840-0022489ef88d": "Gambia",
    "3695e180-9fa3-ec11-9840-0022489ef88d": "Ghana",
    "3895e180-9fa3-ec11-9840-0022489ef88d": "Guinea",
    "3a95e180-9fa3-ec11-9840-0022489ef88d": "Guinea-Bissau",
    "3c95e180-9fa3-ec11-9840-0022489ef88d": "Liberia",
    "3e95e180-9fa3-ec11-9840-0022489ef88d": "Mali",
    "4095e180-9fa3-ec11-9840-0022489ef88d": "Mauritania",
    "4295e180-9fa3-ec11-9840-0022489ef88d": "Niger",
    "4495e180-9fa3-ec11-9840-0022489ef88d": "Nigeria",
    "4695e180-9fa3-ec11-9840-0022489ef88d": "Senegal",
    "4895e180-9fa3-ec11-9840-0022489ef88d": "Sierra Leone",
    "4a95e180-9fa3-ec11-9840-0022489ef88d": "Togo",
    "4c95e180-9fa3-ec11-9840-0022489ef88d": "Antigua and Barbuda",
    "4e95e180-9fa3-ec11-9840-0022489ef88d": "Bahamas",
    "5095e180-9fa3-ec11-9840-0022489ef88d": "Barbados",
    "5295e180-9fa3-ec11-9840-0022489ef88d": "Cuba",
    "5495e180-9fa3-ec11-9840-0022489ef88d": "Dominica",
    "5695e180-9fa3-ec11-9840-0022489ef88d": "Dominican Republic",
    "5895e180-9fa3-ec11-9840-0022489ef88d": "Grenada",
    "5a95e180-9fa3-ec11-9840-0022489ef88d": "Haiti",
    "5c95e180-9fa3-ec11-9840-0022489ef88d": "Jamaica",
    "5e95e180-9fa3-ec11-9840-0022489ef88d": "Puerto Rico",
    "6095e180-9fa3-ec11-9840-0022489ef88d": "Saint Kitts and Nevis",
    "6295e180-9fa3-ec11-9840-0022489ef88d": "Saint Lucia",
    "6495e180-9fa3-ec11-9840-0022489ef88d": "Saint Vincent and the Grenadines",
    "6695e180-9fa3-ec11-9840-0022489ef88d": "Trinidad and Tobago",
    "6895e180-9fa3-ec11-9840-0022489ef88d": "Belize",
    "6a95e180-9fa3-ec11-9840-0022489ef88d": "Costa Rica",
    "6d95e180-9fa3-ec11-9840-0022489ef88d": "El Salvador",
    "6f95e180-9fa3-ec11-9840-0022489ef88d": "Guatemala",
    "7195e180-9fa3-ec11-9840-0022489ef88d": "Honduras",
    "7395e180-9fa3-ec11-9840-0022489ef88d": "Mexico",
    "7595e180-9fa3-ec11-9840-0022489ef88d": "Nicaragua",
    "7795e180-9fa3-ec11-9840-0022489ef88d": "Panama",
    "7995e180-9fa3-ec11-9840-0022489ef88d": "Argentina",
    "7b95e180-9fa3-ec11-9840-0022489ef88d": "Bolivia (Plurinational State of)",
    "7f95e180-9fa3-ec11-9840-0022489ef88d": "Brazil",
    "8195e180-9fa3-ec11-9840-0022489ef88d": "Chile",
    "8395e180-9fa3-ec11-9840-0022489ef88d": "Colombia",
    "8595e180-9fa3-ec11-9840-0022489ef88d": "Ecuador",
    "8795e180-9fa3-ec11-9840-0022489ef88d": "Guyana",
    "8995e180-9fa3-ec11-9840-0022489ef88d": "Paraguay",
    "8b95e180-9fa3-ec11-9840-0022489ef88d": "Peru",
    "8d95e180-9fa3-ec11-9840-0022489ef88d": "Suriname",
    "8f95e180-9fa3-ec11-9840-0022489ef88d": "Uruguay",
    "9195e180-9fa3-ec11-9840-0022489ef88d":
      "Venezuela (Bolivarian Republic of)",
    "9395e180-9fa3-ec11-9840-0022489ef88d": "Canada",
    "9595e180-9fa3-ec11-9840-0022489ef88d": "United States of America",
    "9795e180-9fa3-ec11-9840-0022489ef88d": "Kazakhstan",
    "9995e180-9fa3-ec11-9840-0022489ef88d": "Kyrgyzstan",
    "9b95e180-9fa3-ec11-9840-0022489ef88d": "Tajikistan",
    "9d95e180-9fa3-ec11-9840-0022489ef88d": "Turkmenistan",
    "9f95e180-9fa3-ec11-9840-0022489ef88d": "Uzbekistan",
    "a195e180-9fa3-ec11-9840-0022489ef88d": "China",
    "a395e180-9fa3-ec11-9840-0022489ef88d":
      "Democratic People's Republic of Korea",
    "a595e180-9fa3-ec11-9840-0022489ef88d": "Japan",
    "a795e180-9fa3-ec11-9840-0022489ef88d": "Mongolia",
    "a995e180-9fa3-ec11-9840-0022489ef88d": "Republic of Korea",
    "aa95e180-9fa3-ec11-9840-0022489ef88d": "Brunei Darussalam",
    "ac95e180-9fa3-ec11-9840-0022489ef88d": "Cambodia",
    "ae95e180-9fa3-ec11-9840-0022489ef88d": "Indonesia",
    "b095e180-9fa3-ec11-9840-0022489ef88d": "Lao People's Democratic Republic",
    "b295e180-9fa3-ec11-9840-0022489ef88d": "Malaysia",
    "b495e180-9fa3-ec11-9840-0022489ef88d": "Myanmar",
    "b695e180-9fa3-ec11-9840-0022489ef88d": "Philippines",
    "b895e180-9fa3-ec11-9840-0022489ef88d": "Singapore",
    "ba95e180-9fa3-ec11-9840-0022489ef88d": "Thailand",
    "bc95e180-9fa3-ec11-9840-0022489ef88d": "Timor-Leste",
    "be95e180-9fa3-ec11-9840-0022489ef88d": "Viet Nam",
    "c095e180-9fa3-ec11-9840-0022489ef88d": "Afghanistan",
    "c295e180-9fa3-ec11-9840-0022489ef88d": "Bangladesh",
    "c495e180-9fa3-ec11-9840-0022489ef88d": "Bhutan",
    "c695e180-9fa3-ec11-9840-0022489ef88d": "India",
    "c895e180-9fa3-ec11-9840-0022489ef88d": "Iran (Islamic Republic of)",
    "ca95e180-9fa3-ec11-9840-0022489ef88d": "Maldives",
    "cc95e180-9fa3-ec11-9840-0022489ef88d": "Nepal",
    "ce95e180-9fa3-ec11-9840-0022489ef88d": "Pakistan",
    "d095e180-9fa3-ec11-9840-0022489ef88d": "Sri Lanka",
    "d295e180-9fa3-ec11-9840-0022489ef88d": "Armenia",
    "d495e180-9fa3-ec11-9840-0022489ef88d": "Azerbaijan",
    "d695e180-9fa3-ec11-9840-0022489ef88d": "Bahrain",
    "d895e180-9fa3-ec11-9840-0022489ef88d": "Cyprus",
    "da95e180-9fa3-ec11-9840-0022489ef88d": "Georgia",
    "dc95e180-9fa3-ec11-9840-0022489ef88d": "Iraq",
    "de95e180-9fa3-ec11-9840-0022489ef88d": "Israel",
    "e095e180-9fa3-ec11-9840-0022489ef88d": "Jordan",
    "e295e180-9fa3-ec11-9840-0022489ef88d": "Kuwait",
    "e595e180-9fa3-ec11-9840-0022489ef88d": "Lebanon",
    "e795e180-9fa3-ec11-9840-0022489ef88d": "Oman",
    "e995e180-9fa3-ec11-9840-0022489ef88d": "Qatar",
    "eb95e180-9fa3-ec11-9840-0022489ef88d": "Saudi Arabia",
    "ed95e180-9fa3-ec11-9840-0022489ef88d": "State of Palestine",
    "ef95e180-9fa3-ec11-9840-0022489ef88d": "Syrian Arab Republic",
    "f195e180-9fa3-ec11-9840-0022489ef88d": "Türkiye",
    "f395e180-9fa3-ec11-9840-0022489ef88d": "United Arab Emirates",
    "f595e180-9fa3-ec11-9840-0022489ef88d": "Yemen",
    "f795e180-9fa3-ec11-9840-0022489ef88d": "Belarus",
    "f995e180-9fa3-ec11-9840-0022489ef88d": "Bulgaria",
    "fb95e180-9fa3-ec11-9840-0022489ef88d": "Czechia",
    "fd95e180-9fa3-ec11-9840-0022489ef88d": "Hungary",
    "ff95e180-9fa3-ec11-9840-0022489ef88d": "Poland",
    "0196e180-9fa3-ec11-9840-0022489ef88d": "Republic of Moldova",
    "0396e180-9fa3-ec11-9840-0022489ef88d": "Romania",
    "0596e180-9fa3-ec11-9840-0022489ef88d": "Russian Federation",
    "0796e180-9fa3-ec11-9840-0022489ef88d": "Slovakia",
    "0996e180-9fa3-ec11-9840-0022489ef88d": "Ukraine",
    "0b96e180-9fa3-ec11-9840-0022489ef88d": "Denmark",
    "0d96e180-9fa3-ec11-9840-0022489ef88d": "Estonia",
    "0f96e180-9fa3-ec11-9840-0022489ef88d": "Finland",
    "1196e180-9fa3-ec11-9840-0022489ef88d": "Iceland",
    "1396e180-9fa3-ec11-9840-0022489ef88d": "Ireland",
    "1596e180-9fa3-ec11-9840-0022489ef88d": "Latvia",
    "1796e180-9fa3-ec11-9840-0022489ef88d": "Lithuania",
    "1996e180-9fa3-ec11-9840-0022489ef88d": "Norway",
    "1b96e180-9fa3-ec11-9840-0022489ef88d": "Sweden",
    "1d96e180-9fa3-ec11-9840-0022489ef88d":
      "United Kingdom of Great Britain and Northern Ireland",
    "1f96e180-9fa3-ec11-9840-0022489ef88d": "Albania",
    "2196e180-9fa3-ec11-9840-0022489ef88d": "Andorra",
    "2396e180-9fa3-ec11-9840-0022489ef88d": "Bosnia and Herzegovina",
    "2596e180-9fa3-ec11-9840-0022489ef88d": "Croatia",
    "2796e180-9fa3-ec11-9840-0022489ef88d": "Greece",
    "2996e180-9fa3-ec11-9840-0022489ef88d": "Holy See",
    "2c96e180-9fa3-ec11-9840-0022489ef88d": "Italy",
    "2e96e180-9fa3-ec11-9840-0022489ef88d": "Malta",
    "3096e180-9fa3-ec11-9840-0022489ef88d": "Montenegro",
    "3296e180-9fa3-ec11-9840-0022489ef88d": "North Macedonia",
    "3696e180-9fa3-ec11-9840-0022489ef88d": "Portugal",
    "3896e180-9fa3-ec11-9840-0022489ef88d": "San Marino",
    "3a96e180-9fa3-ec11-9840-0022489ef88d": "Serbia",
    "3c96e180-9fa3-ec11-9840-0022489ef88d": "Slovenia",
    "3e96e180-9fa3-ec11-9840-0022489ef88d": "Spain",
    "4096e180-9fa3-ec11-9840-0022489ef88d": "Austria",
    "4296e180-9fa3-ec11-9840-0022489ef88d": "Belgium",
    "4496e180-9fa3-ec11-9840-0022489ef88d": "France",
    "4696e180-9fa3-ec11-9840-0022489ef88d": "Germany",
    "4896e180-9fa3-ec11-9840-0022489ef88d": "Liechtenstein",
    "4a96e180-9fa3-ec11-9840-0022489ef88d": "Luxembourg",
    "4c96e180-9fa3-ec11-9840-0022489ef88d": "Monaco",
    "4e96e180-9fa3-ec11-9840-0022489ef88d": "Netherlands",
    "5096e180-9fa3-ec11-9840-0022489ef88d": "Switzerland",
    "5296e180-9fa3-ec11-9840-0022489ef88d": "Australia",
    "5496e180-9fa3-ec11-9840-0022489ef88d": "New Zealand",
    "5696e180-9fa3-ec11-9840-0022489ef88d": "Fiji",
    "5896e180-9fa3-ec11-9840-0022489ef88d": "Papua New Guinea",
    "5a96e180-9fa3-ec11-9840-0022489ef88d": "Solomon Islands",
    "5c96e180-9fa3-ec11-9840-0022489ef88d": "Vanuatu",
    "5e96e180-9fa3-ec11-9840-0022489ef88d": "Kiribati",
    "6096e180-9fa3-ec11-9840-0022489ef88d": "Marshall Islands",
    "6296e180-9fa3-ec11-9840-0022489ef88d": "Micronesia (Federated States of)",
    "6496e180-9fa3-ec11-9840-0022489ef88d": "Nauru",
    "6696e180-9fa3-ec11-9840-0022489ef88d": "Palau",
    "6896e180-9fa3-ec11-9840-0022489ef88d": "Cook Islands",
    "6a96e180-9fa3-ec11-9840-0022489ef88d": "Niue",
    "6c96e180-9fa3-ec11-9840-0022489ef88d": "Samoa",
    "6e96e180-9fa3-ec11-9840-0022489ef88d": "Tonga",
    "7096e180-9fa3-ec11-9840-0022489ef88d": "Tuvalu",
  },
  IdentifyProviderType: ["B2C", "Azure AD", "Local Account"],
  BusinessActivities: [
    "Mathematics",
    "Science",
    "Engineering",
    "Computer Science",
    "Literature",
    "History",
    "Arts",
    "Other",
  ],
  BusinessRolesAssignment: {
    "party-representative": "Course Coordinator",
    nfp: "Instructor",
    "nfp-alternate": "Teaching Assistant",
    "etf-fp": "Department Head",
    "etf-alternate": "Associate Department Head",
    "inventory-fp": "Academic Advisor",
    "inventory-fp-alternate": "Associate Academic Advisor",
    "expert-energy": "Subject Matter Expert",
    "expert-ippu": "Curriculum Specialist",
    "expert-agriculture": "Assessment Coordinator",
    "expert-lulucf": "Learning Outcomes Specialist",
    "expert-waste": "Student Support Specialist",
    "progress-nrc": "Progress Reviewer",
    "progress-nrc-alternate": "Associate Progress Reviewer",
    "expert-tracking-progress": "Progress Tracking Expert",
    "expert-projections": "Academic Planning Expert",
    "expert-mitigation-policies": "Policy and Standards Expert",
    "support-nrc": "Support Coordinator",
    "support-nrc-alternate": "Associate Support Coordinator",
    "expert-ftc-support": "Student Services Expert",
  },
  Regions: {
    "ba9d4594-9fa3-ec11-9840-0022489efb2b": "Africa",
    "bc9d4594-9fa3-ec11-9840-0022489efb2b": "Americas",
    "be9d4594-9fa3-ec11-9840-0022489efb2b": "Asia",
    "c09d4594-9fa3-ec11-9840-0022489efb2b": "Europe",
    "c29d4594-9fa3-ec11-9840-0022489efb2b": "Oceania",
    "c49d4594-9fa3-ec11-9840-0022489efb2b": "Northern Africa",
    "c69d4594-9fa3-ec11-9840-0022489efb2b": "Eastern Africa",
    "c89d4594-9fa3-ec11-9840-0022489efb2b": "Middle Africa",
    "ca9d4594-9fa3-ec11-9840-0022489efb2b": "Southern Africa",
    "cc9d4594-9fa3-ec11-9840-0022489efb2b": "Western Africa",
    "ce9d4594-9fa3-ec11-9840-0022489efb2b": "Latin America and the Caribbean",
    "d09d4594-9fa3-ec11-9840-0022489efb2b": "Northern America",
    "d29d4594-9fa3-ec11-9840-0022489efb2b": "Central Asia",
    "d49d4594-9fa3-ec11-9840-0022489efb2b": "Eastern Asia",
    "d69d4594-9fa3-ec11-9840-0022489efb2b": "South-eastern Asia",
    "d89d4594-9fa3-ec11-9840-0022489efb2b": "Southern Asia",
    "da9d4594-9fa3-ec11-9840-0022489efb2b": "Western Asia",
    "dc9d4594-9fa3-ec11-9840-0022489efb2b": "Eastern Europe",
    "de9d4594-9fa3-ec11-9840-0022489efb2b": "Northern Europe",
    "e09d4594-9fa3-ec11-9840-0022489efb2b": "Southern Europe",
    "e29d4594-9fa3-ec11-9840-0022489efb2b": "Western Europe",
    "e49d4594-9fa3-ec11-9840-0022489efb2b": "Australia and New Zealand",
    "e69d4594-9fa3-ec11-9840-0022489efb2b": "Melanesia",
    "e89d4594-9fa3-ec11-9840-0022489efb2b": "Micronesia",
    "ea9d4594-9fa3-ec11-9840-0022489efb2b": "Polynesia",
  },
  MarrakechPartnershipThemes: {
    "128a5008-488e-f011-b4cc-6045bd95e87e": "Ocean and coastal zones",
    "dbf97c4b-498e-f011-b4cc-6045bd95e87e": "Thematic focus not applicable",
    "91536386-4d8e-f011-b4cc-6045bd95e87e": "Water",
    "02bfd992-4d8e-f011-b4cc-6045bd95e87e": "Human settlements",
    "12ede39f-4d8e-f011-b4cc-6045bd95e87e": "Transport",
    "4f07cfac-4d8e-f011-b4cc-6045bd95e87e": "Energy",
    "078cf9b2-4d8e-f011-b4cc-6045bd95e87e": "Industry",
    "63a280c3-e960-f011-bec3-6045bd95e87e": "Land-use",
  },
  SustainableDevelopmentGoals: {
    "1be6bc98-fdba-ec11-9840-000d3a65547f":
      "Goal 1. End poverty in all its forms everywhere",
    "1de6bc98-fdba-ec11-9840-000d3a65547f":
      "Goal 10. Reduce inequality within and among countries",
    "1fe6bc98-fdba-ec11-9840-000d3a65547f":
      "Goal 11. Make cities and human settlements inclusive, safe, resilient and sustainable",
    "21e6bc98-fdba-ec11-9840-000d3a65547f":
      "Goal 12. Ensure sustainable consumption and production patterns",
    "23e6bc98-fdba-ec11-9840-000d3a65547f":
      "Goal 13. Take urgent action to combat climate change and its impacts",
    "25e6bc98-fdba-ec11-9840-000d3a65547f":
      "Goal 14. Conserve and sustainably use oceans, seas & marine resources for sustainable development",
    "27e6bc98-fdba-ec11-9840-000d3a65547f":
      "Goal 15. Protect, restore and promote sust use of terrestrial ecosystems, sustainably manage forests, combat deser",
    "29e6bc98-fdba-ec11-9840-000d3a65547f":
      "Goal 16. Promote peaceful and inclusive societies for sust dev, provide access to justice",
    "2be6bc98-fdba-ec11-9840-000d3a65547f":
      "Goal 17. Strengthen means of implementation and revitalize Global Partnership for Sust Dev Finance",
    "2de6bc98-fdba-ec11-9840-000d3a65547f":
      "Goal 2. End hunger, achieve food security and improved nutrition and promote sustainable agriculture",
    "2fe6bc98-fdba-ec11-9840-000d3a65547f":
      "Goal 3. Ensure healthy lives and promote well-being for all at all ages",
    "31e6bc98-fdba-ec11-9840-000d3a65547f":
      "Goal 4. Ensure inclusive & equit quality educ and promote lifelong learning opportunities for all",
    "33e6bc98-fdba-ec11-9840-000d3a65547f":
      "Goal 5. Achieve gender equality and empower all women and girls",
    "35e6bc98-fdba-ec11-9840-000d3a65547f":
      "Goal 6. Ensure availability and sustainable management of water and sanitation for all",
    "37e6bc98-fdba-ec11-9840-000d3a65547f":
      "Goal 7. Ensure access to affordable, reliable, sustainable and modern energy for all",
    "39e6bc98-fdba-ec11-9840-000d3a65547f":
      "Goal 8. Promote sustained, inclusive & sustainable economic growth, full & productive employment & decent work for al",
    "3be6bc98-fdba-ec11-9840-000d3a65547f":
      "Goal 9. Build resilient infrastructure, promote inclusive & sust. industrialization & foster innov",
  },
  Agreements: {
    "8d42371c-738d-f011-b4cb-000d3a20979d":
      "Vienna Convention for the Protection of the Ozone Layer and its Montreal Protocol on Substances that Deplete the Ozone Layer",
    "29565c28-738d-f011-b4cb-000d3a20979d":
      "Kigali Amendment to the Montreal Protocol",
    "8a008283-738d-f011-b4cb-000d3a20979d":
      "Convention on International Trade in Endangered Species of Wild Fauna and Flora (CITES)",
    "9e56e389-738d-f011-b4cb-000d3a20979d":
      "Convention on the Conservation of Migratory Species of Wild Animals (CMS)",
    "2b962796-738d-f011-b4cb-000d3a20979d":
      "Agreement on the Conservation of African-Eurasian Migratory Waterbirds (AEWA)",
    "3422659c-738d-f011-b4cb-000d3a20979d":
      "Agreement on the Conservation of Gorillas and their Habitats",
    "fa0796a2-738d-f011-b4cb-000d3a20979d":
      "Agreement on the Conservation of Populations of European Bats (EUROBATS)",
    "c11b30af-738d-f011-b4cb-000d3a20979d":
      "Agreement on the Conservation of Small Cetaceans of the Baltic, North Atlantic, Irish and North Seas (ASCOBANS)",
    "187566b5-738d-f011-b4cb-000d3a20979d":
      "Basel Convention on the Control of Transboundary Movements of Hazardous Wastes and their Disposal",
    "e4278ec1-738d-f011-b4cb-000d3a20979d":
      "Rotterdam Convention on the Prior Informed Consent Procedure for Certain Hazardous Chemicals and Pesticides in International Trade",
    "ded0d7c7-738d-f011-b4cb-000d3a20979d":
      "Stockholm Convention on Persistent Organic Pollutants",
    "6ae3d9cd-738d-f011-b4cb-000d3a20979d": "Minamata Convention on Mercury",
    "bf39b772-f49f-ee11-be37-000d3a2a2330":
      "United Nations Convention to Combat Desertification (UNCCD)",
    "73d8168b-f49f-ee11-be37-000d3a2a2330":
      "Convention on Biological Diversity (CBD)",
  },
  SubNationalGovernmentType: [
    "Autonomous region",
    "State/Region/Provice",
    "City/Municipality",
    "Other",
  ],
  StaffingTypes: [
    "The Cooperative Climate Initiative does not have any dedicated staff",
    "1 to 10",
    "11 to 25",
    "26 to 50",
    "More than 50",
  ],
  SignatoriesAndMembers: [
    "Enrolled Students",
    "Registered Students",
    "We do not have students",
  ],
  SignatoryFollowUps: [
    "Students are required to directly submit assignments to the Course",
    "Students are required to submit assignments through a third-party platform",
    "The Course conducts regular assessments and evaluations",
    "The Course does not perform any follow-ups",
    "Other",
  ],
  Initiatives: {},
  CciRelationType: [
    "Parent program",
    "Component course",
    "Collaborative partnership with",
  ],
  CciRelationStatus: ["Yes", "No", "Pending"],
  InvolvedEntityType: [
    "Sponsoring Department",
    "Funding source",
    "Lead institution",
  ],
  ParticipantType: [
    "Full-time Student",
    "Part-time Student",
    "Graduate Student",
    "Undergraduate Student",
    "Continuing Education Student",
    "Audit Student",
    "Exchange Student",
  ],
  ParticipantCategory: ["Enrolled", "Registered"],
};

export const useDropdownValues = (dropdownName?: DropdownName) => {
  const typeGuard = (
    data: unknown
  ): data is string[] | Record<string, string> =>
    Array.isArray(data) || (typeof data === "object" && data !== null);

  const { activeInitiative } = useActiveInitiative();
  useInitiatives({
    enabled: !activeInitiative?.id,
  });

  // Use mock data if available, otherwise fetch from API
  const mockData =
    dropdownName && dropdownName in MOCK_DROPDOWN_DATA
      ? MOCK_DROPDOWN_DATA[dropdownName as Exclude<DropdownName, "">]
      : undefined;
  console.log("🚀 ~ useDropdownValues ~ mockData:", mockData);

  const response = useGetPrivateRoutes<string[] | Record<string, string>>({
    endpoint: `/dropdown/${dropdownName}?initiativeId=${activeInitiative?.id}`,
    typeGuard,
    queryKey: ["dropdown", dropdownName],
    enabled: !!dropdownName && !mockData,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  // If using mock data, process it immediately
  const { data, mappedData } = useMemo(() => {
    // Use mock data if available, otherwise use API response
    const sourceData = mockData ?? response.data;

    let processedData: Option[] = [];
    let processedMappedData: { [key: string]: string } = {};

    if (Array.isArray(sourceData)) {
      processedData = sourceData.map((item) => ({
        label: item,
        value: item,
      }));
    } else if (typeof sourceData === "object" && sourceData !== null) {
      processedData = Object.entries(sourceData).map(([key, value]) => ({
        label: value,
        value: key,
      }));
      processedMappedData = Object.fromEntries(
        Object.entries(sourceData).map(([key, value]) => [key, value])
      );
    }

    processedData.sort((a, b) => a.label.localeCompare(b.label));
    return { data: processedData, mappedData: processedMappedData };
  }, [mockData, response.data]);

  // If using mock data, return immediately with processed data
  if (mockData) {
    return {
      data,
      mappedData,
      isLoading: false,
      isError: false,
      error: null,
      refetch: () => Promise.resolve({ data: mockData }),
    };
  }

  return {
    ...response,
    data,
    mappedData,
  };
};
