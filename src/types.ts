export type RiskLevel = 'ADEQUATE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'OUT_OF_STOCK';

export type StockStatus = 'ADEQUATE' | 'LOW STOCK' | 'CRITICAL' | 'OUT OF STOCK';

export type FacilityType = 'Primary Health Centre (PHC)' | 'Community Health Centre (CHC)' | 'Taluk Hospital' | 'Urban PHC' | 'District Hospital';

export type MedicineCategory =
  | 'Antibiotics & Anti-infectives'
  | 'Analgesics & Antipyretics'
  | 'Respiratory & Bronchodilators'
  | 'Cardiovascular & Diabetes'
  | 'IV Fluids & Electrolytes'
  | 'Maternal & Child Health'
  | 'Vaccines & Immunization'
  | 'Emergency & Critical Care';

export interface StateData {
  id: string;
  name: string;
  code: string;
  region: 'South' | 'North' | 'West' | 'East' | 'Central';
  capital: string;
  population: number;
  totalPhcs: number;
  totalHospitals: number;
  activeAlerts: number;
  criticalStockouts: number;
  overallRisk: RiskLevel;
  coordinates: { x: number; y: number }; // SVG map coordinates %
}

export interface DistrictData {
  id: string;
  stateId: string;
  stateName: string;
  name: string;
  headquarters: string;
  population: number;
  facilityCount: number;
  riskLevel: RiskLevel;
}

export interface FacilityData {
  id: string;
  name: string;
  stateId: string;
  stateName: string;
  districtId: string;
  districtName: string;
  type: FacilityType;
  populationServed: number;
  dailyFootfall: number;
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
  doctorsCount: number;
  doctorsPresent: number;
  nursesCount: number;
  nursesPresent: number;
  attendanceRate: number; // percentage
  medicineRisk: RiskLevel;
  overallStatus: 'OPTIMAL' | 'MODERATE' | 'UNDER_STRAIN' | 'CRITICAL';
  location: { lat: number; lng: number };
  contactNumber: string;
  medicalOfficerInCharge: string;
  pinCode?: string;
  lastUpdated?: string;
}

export interface MedicineData {
  id: string;
  name: string;
  genericName: string;
  category: MedicineCategory;
  dosage: string;
  unit: string;
  essentialLevel: 'NLEM Core' | 'Emergency Priority' | 'Secondary';
  standardBatchSize: number;
}

export interface InventoryRecord {
  id: string;
  facilityId: string;
  facilityName: string;
  districtId: string;
  districtName: string;
  stateId: string;
  stateName: string;
  medicineId: string;
  medicineName: string;
  category: MedicineCategory;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  averageDailyConsumption: number;
  daysRemaining: number;
  stockStatus: StockStatus;
  lastUpdated: string;
  batchNumber: string;
  expiryDate: string;
  unit?: string;
}

export interface ConsumptionHistoryPoint {
  date: string;
  dayIndex: number;
  actualConsumption: number;
  outpatientCount: number;
  isSurgeDay?: boolean;
}

export interface ForecastPoint {
  date: string;
  dayIndex: number;
  predictedDemand: number;
  expectedStock: number;
  upperConfidence: number;
  lowerConfidence: number;
  projectedShortage: number;
}

export interface StockAlert {
  id: string;
  level: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  title: string;
  description: string;
  facilityId: string;
  facilityName: string;
  districtName: string;
  stateName: string;
  medicineId: string;
  medicineName: string;
  currentStock: number;
  daysRemaining: number;
  recommendedAction: string;
  timestamp: string;
  isResolved: boolean;
  resolvedAt?: string;
  isEmergencyAlert?: boolean;
}

export interface RedistributionRecommendation {
  id: string;
  sourceFacilityId: string;
  sourceFacilityName: string;
  sourceDistrict: string;
  sourceState: string;
  sourceAvailableStock: number;
  sourceSurplus: number;

  destFacilityId: string;
  destFacilityName: string;
  destDistrict: string;
  destState: string;
  destCurrentStock: number;
  destPredictedShortage: number;

  medicineId: string;
  medicineName: string;
  recommendedQuantity: number;
  distanceKm: number;
  transitTimeHours: number;
  priority: 'P1 - Urgent' | 'P2 - High' | 'P3 - Standard';
  clinicalReason: string;
  aiConfidence: number;
  status: 'PENDING' | 'APPROVED' | 'IN_TRANSIT' | 'COMPLETED';
  approvedAt?: string;
  estimatedTransitHours?: number;
  destDeficit?: number;
  reasoning?: string;
  impact?: string;
}

export interface SyntheticPatient {
  patientId: string;
  facilityId: string;
  facilityName: string;
  state: string;
  district: string;
  ageGroup: 'Pediatric' | 'Adult' | 'Geriatric';
  gender: 'Male' | 'Female' | 'Other';
  diagnosisCategory: string;
  prescribedMedicine: string;
  visitDate: string;
  triagePriority: 'Green' | 'Yellow' | 'Red';
  id?: string;
  age?: number;
  chiefComplaint?: string;
  districtName?: string;
  stateName?: string;
  date?: string;
}

export interface AIAnalysisResult {
  riskLevel: string;
  explanation: string;
  predictedDemand: number;
  estimatedShortage: number;
  recommendedAction: string;
  redistributionSuggestion: string;
  confidence: number;
  priority: string;
  source?: string;
}

export interface AIForecastInsight {
  whyIncreasing: string;
  contributingFactors: string[];
  recommendedAction: string;
  confidence: number;
  forecastTrend: string;
  source?: string;
}

export interface AINationalSummary {
  nationalSituation: string;
  emergingRisks: string[];
  demandAnomalies: string;
  stockoutPredictions: string;
  recommendedActions: string[];
  whyFlagged: string;
  confidence: number;
  riskLevel: string;
  source?: string;
}

export interface AIEmergencyBriefing {
  briefingTitle: string;
  executiveSummary: string;
  criticalPriorities: string[];
  supplyChainMitigation: string;
  logisticsRoutePlan: string;
  estimatedDeficitResolved: string;
  confidence: number;
  source?: string;
}

export interface UserSession {
  name: string;
  email: string;
  role: 'National Director (MoHFW)' | 'State Health Officer' | 'District Surveillance Lead' | 'PHC Medical Officer';
  stateAccess: string;
  token: string;
  avatar: string;
}
