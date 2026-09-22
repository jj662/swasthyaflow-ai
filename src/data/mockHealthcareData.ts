import {
  StateData,
  DistrictData,
  FacilityData,
  MedicineData,
  InventoryRecord,
  ConsumptionHistoryPoint,
  SyntheticPatient,
  StockAlert,
  RedistributionRecommendation,
} from '../types';

export const STATES_DATA: StateData[] = [
  {
    id: 'st_kerala',
    name: 'Kerala',
    code: 'KL',
    region: 'South',
    capital: 'Thiruvananthapuram',
    population: 35124000,
    totalPhcs: 840,
    totalHospitals: 142,
    activeAlerts: 7,
    criticalStockouts: 3,
    overallRisk: 'HIGH',
    coordinates: { x: 38, y: 88 },
  },
  {
    id: 'st_tamil_nadu',
    name: 'Tamil Nadu',
    code: 'TN',
    region: 'South',
    capital: 'Chennai',
    population: 76860000,
    totalPhcs: 1850,
    totalHospitals: 290,
    activeAlerts: 4,
    criticalStockouts: 1,
    overallRisk: 'MEDIUM',
    coordinates: { x: 48, y: 84 },
  },
  {
    id: 'st_karnataka',
    name: 'Karnataka',
    code: 'KA',
    region: 'South',
    capital: 'Bengaluru',
    population: 67600000,
    totalPhcs: 2360,
    totalHospitals: 310,
    activeAlerts: 5,
    criticalStockouts: 2,
    overallRisk: 'MEDIUM',
    coordinates: { x: 40, y: 73 },
  },
  {
    id: 'st_maharashtra',
    name: 'Maharashtra',
    code: 'MH',
    region: 'West',
    capital: 'Mumbai',
    population: 124900000,
    totalPhcs: 3120,
    totalHospitals: 480,
    activeAlerts: 9,
    criticalStockouts: 4,
    overallRisk: 'HIGH',
    coordinates: { x: 38, y: 58 },
  },
  {
    id: 'st_delhi',
    name: 'Delhi',
    code: 'DL',
    region: 'North',
    capital: 'New Delhi',
    population: 20500000,
    totalPhcs: 580,
    totalHospitals: 120,
    activeAlerts: 3,
    criticalStockouts: 1,
    overallRisk: 'LOW',
    coordinates: { x: 42, y: 32 },
  },
  {
    id: 'st_uttar_pradesh',
    name: 'Uttar Pradesh',
    code: 'UP',
    region: 'North',
    capital: 'Lucknow',
    population: 235600000,
    totalPhcs: 4100,
    totalHospitals: 620,
    activeAlerts: 14,
    criticalStockouts: 6,
    overallRisk: 'CRITICAL',
    coordinates: { x: 52, y: 36 },
  },
  {
    id: 'st_gujarat',
    name: 'Gujarat',
    code: 'GJ',
    region: 'West',
    capital: 'Gandhinagar',
    population: 70400000,
    totalPhcs: 1480,
    totalHospitals: 240,
    activeAlerts: 4,
    criticalStockouts: 1,
    overallRisk: 'LOW',
    coordinates: { x: 26, y: 48 },
  },
  {
    id: 'st_rajasthan',
    name: 'Rajasthan',
    code: 'RJ',
    region: 'North',
    capital: 'Jaipur',
    population: 81000000,
    totalPhcs: 2150,
    totalHospitals: 340,
    activeAlerts: 6,
    criticalStockouts: 2,
    overallRisk: 'MEDIUM',
    coordinates: { x: 32, y: 38 },
  },
  {
    id: 'st_west_bengal',
    name: 'West Bengal',
    code: 'WB',
    region: 'East',
    capital: 'Kolkata',
    population: 99000000,
    totalPhcs: 1920,
    totalHospitals: 310,
    activeAlerts: 8,
    criticalStockouts: 3,
    overallRisk: 'HIGH',
    coordinates: { x: 74, y: 48 },
  },
  {
    id: 'st_odisha',
    name: 'Odisha',
    code: 'OD',
    region: 'East',
    capital: 'Bhubaneswar',
    population: 46200000,
    totalPhcs: 1380,
    totalHospitals: 195,
    activeAlerts: 5,
    criticalStockouts: 2,
    overallRisk: 'MEDIUM',
    coordinates: { x: 66, y: 58 },
  },
];

export const DISTRICTS_DATA: DistrictData[] = [
  // Kerala
  { id: 'dist_ernakulam', stateId: 'st_kerala', stateName: 'Kerala', name: 'Ernakulam', headquarters: 'Kakkanad', population: 3440000, facilityCount: 8, riskLevel: 'MEDIUM' },
  { id: 'dist_thrissur', stateId: 'st_kerala', stateName: 'Kerala', name: 'Thrissur', headquarters: 'Thrissur', population: 3120000, facilityCount: 7, riskLevel: 'HIGH' },
  { id: 'dist_kozhikode', stateId: 'st_kerala', stateName: 'Kerala', name: 'Kozhikode', headquarters: 'Kozhikode', population: 3080000, facilityCount: 6, riskLevel: 'CRITICAL' },
  { id: 'dist_idukki', stateId: 'st_kerala', stateName: 'Kerala', name: 'Idukki', headquarters: 'Painavu', population: 1108000, facilityCount: 5, riskLevel: 'CRITICAL' },
  { id: 'dist_tvm', stateId: 'st_kerala', stateName: 'Kerala', name: 'Thiruvananthapuram', headquarters: 'Thiruvananthapuram', population: 3300000, facilityCount: 6, riskLevel: 'LOW' },
  
  // Tamil Nadu
  { id: 'dist_chennai', stateId: 'st_tamil_nadu', stateName: 'Tamil Nadu', name: 'Chennai', headquarters: 'Chennai', population: 7088000, facilityCount: 8, riskLevel: 'LOW' },
  { id: 'dist_coimbatore', stateId: 'st_tamil_nadu', stateName: 'Tamil Nadu', name: 'Coimbatore', headquarters: 'Coimbatore', population: 3458000, facilityCount: 6, riskLevel: 'MEDIUM' },
  { id: 'dist_madurai', stateId: 'st_tamil_nadu', stateName: 'Tamil Nadu', name: 'Madurai', headquarters: 'Madurai', population: 3038000, facilityCount: 5, riskLevel: 'LOW' },

  // Karnataka
  { id: 'dist_bengaluru', stateId: 'st_karnataka', stateName: 'Karnataka', name: 'Bengaluru Urban', headquarters: 'Bengaluru', population: 9621000, facilityCount: 8, riskLevel: 'MEDIUM' },
  { id: 'dist_mysuru', stateId: 'st_karnataka', stateName: 'Karnataka', name: 'Mysuru', headquarters: 'Mysuru', population: 3001000, facilityCount: 5, riskLevel: 'LOW' },
  { id: 'dist_belagavi', stateId: 'st_karnataka', stateName: 'Karnataka', name: 'Belagavi', headquarters: 'Belagavi', population: 4779000, facilityCount: 5, riskLevel: 'HIGH' },

  // Maharashtra
  { id: 'dist_mumbai', stateId: 'st_maharashtra', stateName: 'Maharashtra', name: 'Mumbai Suburban', headquarters: 'Bandra', population: 9356000, facilityCount: 7, riskLevel: 'HIGH' },
  { id: 'dist_pune', stateId: 'st_maharashtra', stateName: 'Maharashtra', name: 'Pune', headquarters: 'Pune', population: 9429000, facilityCount: 6, riskLevel: 'MEDIUM' },
  { id: 'dist_nagpur', stateId: 'st_maharashtra', stateName: 'Maharashtra', name: 'Nagpur', headquarters: 'Nagpur', population: 4653000, facilityCount: 5, riskLevel: 'CRITICAL' },

  // Delhi
  { id: 'dist_new_delhi', stateId: 'st_delhi', stateName: 'Delhi', name: 'New Delhi', headquarters: 'Connaught Place', population: 1420000, facilityCount: 5, riskLevel: 'LOW' },
  { id: 'dist_central_delhi', stateId: 'st_delhi', stateName: 'Delhi', name: 'Central Delhi', headquarters: 'Daryaganj', population: 582000, facilityCount: 4, riskLevel: 'MEDIUM' },

  // Uttar Pradesh
  { id: 'dist_lucknow', stateId: 'st_uttar_pradesh', stateName: 'Uttar Pradesh', name: 'Lucknow', headquarters: 'Lucknow', population: 4589000, facilityCount: 6, riskLevel: 'HIGH' },
  { id: 'dist_varanasi', stateId: 'st_uttar_pradesh', stateName: 'Uttar Pradesh', name: 'Varanasi', headquarters: 'Varanasi', population: 3676000, facilityCount: 5, riskLevel: 'CRITICAL' },
  { id: 'dist_kanpur', stateId: 'st_uttar_pradesh', stateName: 'Uttar Pradesh', name: 'Kanpur Nagar', headquarters: 'Kanpur', population: 4581000, facilityCount: 5, riskLevel: 'HIGH' },

  // Gujarat
  { id: 'dist_ahmedabad', stateId: 'st_gujarat', stateName: 'Gujarat', name: 'Ahmedabad', headquarters: 'Ahmedabad', population: 7214000, facilityCount: 6, riskLevel: 'LOW' },
  { id: 'dist_surat', stateId: 'st_gujarat', stateName: 'Gujarat', name: 'Surat', headquarters: 'Surat', population: 6081000, facilityCount: 5, riskLevel: 'MEDIUM' },

  // Rajasthan
  { id: 'dist_jaipur', stateId: 'st_rajasthan', stateName: 'Rajasthan', name: 'Jaipur', headquarters: 'Jaipur', population: 6626000, facilityCount: 6, riskLevel: 'MEDIUM' },
  { id: 'dist_jodhpur', stateId: 'st_rajasthan', stateName: 'Rajasthan', name: 'Jodhpur', headquarters: 'Jodhpur', population: 3687000, facilityCount: 5, riskLevel: 'HIGH' },

  // West Bengal
  { id: 'dist_kolkata', stateId: 'st_west_bengal', stateName: 'West Bengal', name: 'Kolkata', headquarters: 'Kolkata', population: 4496000, facilityCount: 6, riskLevel: 'HIGH' },
  { id: 'dist_north_24', stateId: 'st_west_bengal', stateName: 'West Bengal', name: 'North 24 Parganas', headquarters: 'Barasat', population: 10009000, facilityCount: 6, riskLevel: 'CRITICAL' },

  // Odisha
  { id: 'dist_khordha', stateId: 'st_odisha', stateName: 'Odisha', name: 'Khordha', headquarters: 'Bhubaneswar', population: 2251000, facilityCount: 5, riskLevel: 'LOW' },
  { id: 'dist_cuttack', stateId: 'st_odisha', stateName: 'Odisha', name: 'Cuttack', headquarters: 'Cuttack', population: 2624000, facilityCount: 5, riskLevel: 'MEDIUM' },
];

export const MEDICINES_CATALOG: MedicineData[] = [
  { id: 'med_paracetamol', name: 'Paracetamol 500mg', genericName: 'Acetaminophen Tab 500mg', category: 'Analgesics & Antipyretics', dosage: '500mg', unit: 'Tablets', essentialLevel: 'NLEM Core', standardBatchSize: 5000 },
  { id: 'med_amoxicillin', name: 'Amoxicillin 500mg', genericName: 'Amoxicillin Trihydrate 500mg', category: 'Antibiotics & Anti-infectives', dosage: '500mg', unit: 'Capsules', essentialLevel: 'NLEM Core', standardBatchSize: 3000 },
  { id: 'med_ors', name: 'ORS Sachet (WHO Formula)', genericName: 'Oral Rehydration Salts IP', category: 'IV Fluids & Electrolytes', dosage: '21.8g Sachet', unit: 'Sachets', essentialLevel: 'NLEM Core', standardBatchSize: 2500 },
  { id: 'med_insulin', name: 'Human Insulin Regular 40IU', genericName: 'Recombinant Human Insulin 40IU/ml', category: 'Cardiovascular & Diabetes', dosage: '40IU/ml 10ml', unit: 'Vials', essentialLevel: 'Emergency Priority', standardBatchSize: 400 },
  { id: 'med_azithromycin', name: 'Azithromycin 500mg', genericName: 'Azithromycin Dihydrate 500mg', category: 'Antibiotics & Anti-infectives', dosage: '500mg', unit: 'Tablets', essentialLevel: 'NLEM Core', standardBatchSize: 2000 },
  { id: 'med_ceftriaxone', name: 'Ceftriaxone Inj 1g', genericName: 'Ceftriaxone Sodium Injection 1g', category: 'Antibiotics & Anti-infectives', dosage: '1g IV/IM', unit: 'Vials', essentialLevel: 'Emergency Priority', standardBatchSize: 600 },
  { id: 'med_metformin', name: 'Metformin 500mg', genericName: 'Metformin Hydrochloride 500mg', category: 'Cardiovascular & Diabetes', dosage: '500mg', unit: 'Tablets', essentialLevel: 'NLEM Core', standardBatchSize: 4000 },
  { id: 'med_salbutamol', name: 'Salbutamol Respules', genericName: 'Salbutamol Inhalation 2.5mg', category: 'Respiratory & Bronchodilators', dosage: '2.5mg/2.5ml', unit: 'Respules', essentialLevel: 'Emergency Priority', standardBatchSize: 1200 },
  { id: 'med_normal_saline', name: 'Normal Saline IV 0.9%', genericName: 'Sodium Chloride 0.9% w/v 500ml', category: 'IV Fluids & Electrolytes', dosage: '500ml Infusion', unit: 'Bottles', essentialLevel: 'NLEM Core', standardBatchSize: 1500 },
  { id: 'med_artemisinin', name: 'Artemether + Lumefantrine', genericName: 'ACT Combination 20/120mg', category: 'Antibiotics & Anti-infectives', dosage: '20/120mg', unit: 'Tablets', essentialLevel: 'Emergency Priority', standardBatchSize: 1000 },
  { id: 'med_ibuprofen', name: 'Ibuprofen 400mg', genericName: 'Ibuprofen Tab 400mg', category: 'Analgesics & Antipyretics', dosage: '400mg', unit: 'Tablets', essentialLevel: 'NLEM Core', standardBatchSize: 3500 },
  { id: 'med_cetirizine', name: 'Cetirizine 10mg', genericName: 'Cetirizine Dihydrochloride 10mg', category: 'Respiratory & Bronchodilators', dosage: '10mg', unit: 'Tablets', essentialLevel: 'Secondary', standardBatchSize: 3000 },
  { id: 'med_povidone', name: 'Povidone Iodine 5%', genericName: 'Povidone Iodine Solution 5% w/v', category: 'Emergency & Critical Care', dosage: '500ml Solution', unit: 'Bottles', essentialLevel: 'NLEM Core', standardBatchSize: 800 },
  { id: 'med_vaccine_pentavalent', name: 'Pentavalent Vaccine', genericName: 'DPT-HepB-Hib Liquid Vaccine', category: 'Vaccines & Immunization', dosage: '0.5ml Dose', unit: 'Doses', essentialLevel: 'Emergency Priority', standardBatchSize: 500 },
  { id: 'med_anti_rabies', name: 'Rabies Vaccine (ARV)', genericName: 'Purified Chick Embryo Cell Vaccine', category: 'Vaccines & Immunization', dosage: '1.0ml Inj', unit: 'Vials', essentialLevel: 'Emergency Priority', standardBatchSize: 300 },
  { id: 'med_ciprofloxacin', name: 'Ciprofloxacin 500mg', genericName: 'Ciprofloxacin Hydrochloride 500mg', category: 'Antibiotics & Anti-infectives', dosage: '500mg', unit: 'Tablets', essentialLevel: 'NLEM Core', standardBatchSize: 2200 },
  { id: 'med_pantoprazole', name: 'Pantoprazole 40mg', genericName: 'Pantoprazole Sodium 40mg', category: 'Emergency & Critical Care', dosage: '40mg', unit: 'Tablets', essentialLevel: 'NLEM Core', standardBatchSize: 3200 },
  { id: 'med_dextrose_5', name: 'Dextrose 5% IV Infusion', genericName: 'Dextrose Injection 5% 500ml', category: 'IV Fluids & Electrolytes', dosage: '500ml Infusion', unit: 'Bottles', essentialLevel: 'NLEM Core', standardBatchSize: 1200 },
  { id: 'med_telmisartan', name: 'Telmisartan 40mg', genericName: 'Telmisartan Tab 40mg', category: 'Cardiovascular & Diabetes', dosage: '40mg', unit: 'Tablets', essentialLevel: 'Secondary', standardBatchSize: 2800 },
  { id: 'med_atorvastatin', name: 'Atorvastatin 10mg', genericName: 'Atorvastatin Calcium 10mg', category: 'Cardiovascular & Diabetes', dosage: '10mg', unit: 'Tablets', essentialLevel: 'Secondary', standardBatchSize: 2500 },
  { id: 'med_zinc_sulfate', name: 'Zinc Sulfate Dispersible 20mg', genericName: 'Zinc Sulfate DT 20mg', category: 'Maternal & Child Health', dosage: '20mg DT', unit: 'Tablets', essentialLevel: 'NLEM Core', standardBatchSize: 3000 },
  { id: 'med_vitamin_a', name: 'Vitamin A Solution 100k IU', genericName: 'Retinol Palmitate Syrup 100ml', category: 'Maternal & Child Health', dosage: '100,000 IU/ml', unit: 'Bottles', essentialLevel: 'NLEM Core', standardBatchSize: 600 },
];

export const FACILITIES_DATA: FacilityData[] = [
  // Kerala - Ernakulam (Surplus Hubs)
  {
    id: 'fac_kl_ekm_central',
    name: 'PHC Ernakulam Central',
    stateId: 'st_kerala',
    stateName: 'Kerala',
    districtId: 'dist_ernakulam',
    districtName: 'Ernakulam',
    type: 'Community Health Centre (CHC)',
    populationServed: 68000,
    dailyFootfall: 380,
    totalBeds: 34,
    occupiedBeds: 24,
    availableBeds: 10,
    doctorsCount: 6,
    doctorsPresent: 6,
    nursesCount: 14,
    nursesPresent: 13,
    attendanceRate: 95,
    medicineRisk: 'ADEQUATE',
    overallStatus: 'OPTIMAL',
    location: { lat: 9.9816, lng: 76.2999 },
    contactNumber: '+91 484 2356781',
    medicalOfficerInCharge: 'Dr. Radhakrishnan Nair, MBBS, MD',
  },
  {
    id: 'fac_kl_ekm_north',
    name: 'PHC Aluva North',
    stateId: 'st_kerala',
    stateName: 'Kerala',
    districtId: 'dist_ernakulam',
    districtName: 'Ernakulam',
    type: 'Primary Health Centre (PHC)',
    populationServed: 32000,
    dailyFootfall: 210,
    totalBeds: 16,
    occupiedBeds: 12,
    availableBeds: 4,
    doctorsCount: 3,
    doctorsPresent: 3,
    nursesCount: 8,
    nursesPresent: 7,
    attendanceRate: 91,
    medicineRisk: 'ADEQUATE',
    overallStatus: 'OPTIMAL',
    location: { lat: 10.1076, lng: 76.3516 },
    contactNumber: '+91 484 2623344',
    medicalOfficerInCharge: 'Dr. Sheena Varghese, MBBS',
  },
  {
    id: 'fac_kl_ekm_taluk',
    name: 'Taluk Hospital Kothamangalam',
    stateId: 'st_kerala',
    stateName: 'Kerala',
    districtId: 'dist_ernakulam',
    districtName: 'Ernakulam',
    type: 'Taluk Hospital',
    populationServed: 115000,
    dailyFootfall: 590,
    totalBeds: 75,
    occupiedBeds: 58,
    availableBeds: 17,
    doctorsCount: 12,
    doctorsPresent: 11,
    nursesCount: 28,
    nursesPresent: 27,
    attendanceRate: 95,
    medicineRisk: 'ADEQUATE',
    overallStatus: 'OPTIMAL',
    location: { lat: 10.0631, lng: 76.6277 },
    contactNumber: '+91 485 2822299',
    medicalOfficerInCharge: 'Dr. Anoop Kumar, MS (Gen Surg)',
  },

  // Kerala - Thrissur
  {
    id: 'fac_kl_tsr_central',
    name: 'PHC Thrissur Central',
    stateId: 'st_kerala',
    stateName: 'Kerala',
    districtId: 'dist_thrissur',
    districtName: 'Thrissur',
    type: 'Urban PHC',
    populationServed: 48000,
    dailyFootfall: 310,
    totalBeds: 20,
    occupiedBeds: 16,
    availableBeds: 4,
    doctorsCount: 4,
    doctorsPresent: 4,
    nursesCount: 9,
    nursesPresent: 9,
    attendanceRate: 100,
    medicineRisk: 'ADEQUATE',
    overallStatus: 'OPTIMAL',
    location: { lat: 10.5276, lng: 76.2144 },
    contactNumber: '+91 487 2331122',
    medicalOfficerInCharge: 'Dr. Geetha Menon, MBBS, DGO',
  },
  {
    id: 'fac_kl_tsr_north',
    name: 'PHC Thrissur North (Wadakkanchery)',
    stateId: 'st_kerala',
    stateName: 'Kerala',
    districtId: 'dist_thrissur',
    districtName: 'Thrissur',
    type: 'Primary Health Centre (PHC)',
    populationServed: 29000,
    dailyFootfall: 195,
    totalBeds: 14,
    occupiedBeds: 12,
    availableBeds: 2,
    doctorsCount: 2,
    doctorsPresent: 2,
    nursesCount: 6,
    nursesPresent: 5,
    attendanceRate: 88,
    medicineRisk: 'HIGH',
    overallStatus: 'UNDER_STRAIN',
    location: { lat: 10.6657, lng: 76.2415 },
    contactNumber: '+91 488 4232111',
    medicalOfficerInCharge: 'Dr. Vineeth Balan, MBBS',
  },

  // Kerala - Kozhikode (Target Shortage Node)
  {
    id: 'fac_kl_kkd_rural',
    name: 'PHC Kozhikode Rural (Koduvally)',
    stateId: 'st_kerala',
    stateName: 'Kerala',
    districtId: 'dist_kozhikode',
    districtName: 'Kozhikode',
    type: 'Primary Health Centre (PHC)',
    populationServed: 42000,
    dailyFootfall: 290,
    totalBeds: 18,
    occupiedBeds: 16,
    availableBeds: 2,
    doctorsCount: 3,
    doctorsPresent: 2,
    nursesCount: 7,
    nursesPresent: 6,
    attendanceRate: 80,
    medicineRisk: 'CRITICAL',
    overallStatus: 'CRITICAL',
    location: { lat: 11.3544, lng: 75.9126 },
    contactNumber: '+91 495 2212900',
    medicalOfficerInCharge: 'Dr. Faisal Mohammed, MBBS',
  },
  {
    id: 'fac_kl_kkd_beach',
    name: 'Taluk Hospital Kozhikode Beach',
    stateId: 'st_kerala',
    stateName: 'Kerala',
    districtId: 'dist_kozhikode',
    districtName: 'Kozhikode',
    type: 'Taluk Hospital',
    populationServed: 89000,
    dailyFootfall: 490,
    totalBeds: 60,
    occupiedBeds: 54,
    availableBeds: 6,
    doctorsCount: 9,
    doctorsPresent: 8,
    nursesCount: 22,
    nursesPresent: 20,
    attendanceRate: 90,
    medicineRisk: 'HIGH',
    overallStatus: 'UNDER_STRAIN',
    location: { lat: 11.2588, lng: 75.7804 },
    contactNumber: '+91 495 2365111',
    medicalOfficerInCharge: 'Dr. Jayaprakash K, MD',
  },

  // Kerala - Idukki (Hill-tract Deficit Node)
  {
    id: 'fac_kl_idk_east',
    name: 'PHC Idukki East (Kattappana)',
    stateId: 'st_kerala',
    stateName: 'Kerala',
    districtId: 'dist_idukki',
    districtName: 'Idukki',
    type: 'Primary Health Centre (PHC)',
    populationServed: 31000,
    dailyFootfall: 180,
    totalBeds: 12,
    occupiedBeds: 11,
    availableBeds: 1,
    doctorsCount: 2,
    doctorsPresent: 1,
    nursesCount: 5,
    nursesPresent: 5,
    attendanceRate: 86,
    medicineRisk: 'CRITICAL',
    overallStatus: 'CRITICAL',
    location: { lat: 9.7547, lng: 77.1189 },
    contactNumber: '+91 486 8272300',
    medicalOfficerInCharge: 'Dr. Mathew Joseph, MBBS',
  },
  {
    id: 'fac_kl_idk_munnar',
    name: 'CHC Munnar Tea Gardens',
    stateId: 'st_kerala',
    stateName: 'Kerala',
    districtId: 'dist_idukki',
    districtName: 'Idukki',
    type: 'Community Health Centre (CHC)',
    populationServed: 52000,
    dailyFootfall: 260,
    totalBeds: 24,
    occupiedBeds: 22,
    availableBeds: 2,
    doctorsCount: 4,
    doctorsPresent: 3,
    nursesCount: 10,
    nursesPresent: 9,
    attendanceRate: 86,
    medicineRisk: 'HIGH',
    overallStatus: 'UNDER_STRAIN',
    location: { lat: 10.0889, lng: 77.0595 },
    contactNumber: '+91 486 5230400',
    medicalOfficerInCharge: 'Dr. Mini George, MBBS, DCH',
  },

  // Tamil Nadu - Chennai
  {
    id: 'fac_tn_chn_tbm',
    name: 'Urban CHC Tambaram',
    stateId: 'st_tamil_nadu',
    stateName: 'Tamil Nadu',
    districtId: 'dist_chennai',
    districtName: 'Chennai',
    type: 'Community Health Centre (CHC)',
    populationServed: 95000,
    dailyFootfall: 520,
    totalBeds: 45,
    occupiedBeds: 34,
    availableBeds: 11,
    doctorsCount: 8,
    doctorsPresent: 8,
    nursesCount: 18,
    nursesPresent: 17,
    attendanceRate: 96,
    medicineRisk: 'ADEQUATE',
    overallStatus: 'OPTIMAL',
    location: { lat: 12.9249, lng: 80.1000 },
    contactNumber: '+91 44 22265432',
    medicalOfficerInCharge: 'Dr. S. Karthikeyan, MBBS, MD',
  },
  {
    id: 'fac_tn_cbe_pollachi',
    name: 'PHC Pollachi Rural',
    stateId: 'st_tamil_nadu',
    stateName: 'Tamil Nadu',
    districtId: 'dist_coimbatore',
    districtName: 'Coimbatore',
    type: 'Primary Health Centre (PHC)',
    populationServed: 36000,
    dailyFootfall: 220,
    totalBeds: 16,
    occupiedBeds: 13,
    availableBeds: 3,
    doctorsCount: 3,
    doctorsPresent: 3,
    nursesCount: 7,
    nursesPresent: 7,
    attendanceRate: 100,
    medicineRisk: 'ADEQUATE',
    overallStatus: 'OPTIMAL',
    location: { lat: 10.6609, lng: 77.0048 },
    contactNumber: '+91 4259 223456',
    medicalOfficerInCharge: 'Dr. R. Meenakshi, MBBS',
  },

  // Karnataka - Bengaluru & Belagavi
  {
    id: 'fac_ka_blr_krpuram',
    name: 'Urban PHC KR Puram',
    stateId: 'st_karnataka',
    stateName: 'Karnataka',
    districtId: 'dist_bengaluru',
    districtName: 'Bengaluru Urban',
    type: 'Urban PHC',
    populationServed: 84000,
    dailyFootfall: 460,
    totalBeds: 26,
    occupiedBeds: 21,
    availableBeds: 5,
    doctorsCount: 5,
    doctorsPresent: 5,
    nursesCount: 12,
    nursesPresent: 11,
    attendanceRate: 94,
    medicineRisk: 'ADEQUATE',
    overallStatus: 'OPTIMAL',
    location: { lat: 13.0075, lng: 77.6959 },
    contactNumber: '+91 80 25619900',
    medicalOfficerInCharge: 'Dr. Prashanth Patil, MBBS, DNB',
  },
  {
    id: 'fac_ka_bel_gokak',
    name: 'Taluk Hospital Gokak',
    stateId: 'st_karnataka',
    stateName: 'Karnataka',
    districtId: 'dist_belagavi',
    districtName: 'Belagavi',
    type: 'Taluk Hospital',
    populationServed: 125000,
    dailyFootfall: 610,
    totalBeds: 80,
    occupiedBeds: 72,
    availableBeds: 8,
    doctorsCount: 10,
    doctorsPresent: 8,
    nursesCount: 24,
    nursesPresent: 21,
    attendanceRate: 85,
    medicineRisk: 'CRITICAL',
    overallStatus: 'CRITICAL',
    location: { lat: 16.1667, lng: 74.8333 },
    contactNumber: '+91 8332 225100',
    medicalOfficerInCharge: 'Dr. Suresh Hiremath, MS',
  },

  // Maharashtra - Mumbai & Nagpur
  {
    id: 'fac_mh_mum_kurla',
    name: 'Urban CHC Kurla West',
    stateId: 'st_maharashtra',
    stateName: 'Maharashtra',
    districtId: 'dist_mumbai',
    districtName: 'Mumbai Suburban',
    type: 'Community Health Centre (CHC)',
    populationServed: 145000,
    dailyFootfall: 780,
    totalBeds: 65,
    occupiedBeds: 60,
    availableBeds: 5,
    doctorsCount: 11,
    doctorsPresent: 10,
    nursesCount: 26,
    nursesPresent: 23,
    attendanceRate: 89,
    medicineRisk: 'HIGH',
    overallStatus: 'UNDER_STRAIN',
    location: { lat: 19.0688, lng: 72.8697 },
    contactNumber: '+91 22 26501234',
    medicalOfficerInCharge: 'Dr. Sanjay Deshmukh, MD (Med)',
  },
  {
    id: 'fac_mh_nag_kamthi',
    name: 'PHC Kamptee Rural',
    stateId: 'st_maharashtra',
    stateName: 'Maharashtra',
    districtId: 'dist_nagpur',
    districtName: 'Nagpur',
    type: 'Primary Health Centre (PHC)',
    populationServed: 41000,
    dailyFootfall: 240,
    totalBeds: 18,
    occupiedBeds: 16,
    availableBeds: 2,
    doctorsCount: 2,
    doctorsPresent: 2,
    nursesCount: 6,
    nursesPresent: 5,
    attendanceRate: 88,
    medicineRisk: 'CRITICAL',
    overallStatus: 'CRITICAL',
    location: { lat: 21.2227, lng: 79.1970 },
    contactNumber: '+91 7109 288400',
    medicalOfficerInCharge: 'Dr. Pooja Gaikwad, MBBS',
  },

  // Delhi
  {
    id: 'fac_dl_nd_karolbagh',
    name: 'Delhi Polyclinic Karol Bagh',
    stateId: 'st_delhi',
    stateName: 'Delhi',
    districtId: 'dist_new_delhi',
    districtName: 'New Delhi',
    type: 'Urban PHC',
    populationServed: 72000,
    dailyFootfall: 430,
    totalBeds: 28,
    occupiedBeds: 20,
    availableBeds: 8,
    doctorsCount: 6,
    doctorsPresent: 6,
    nursesCount: 14,
    nursesPresent: 13,
    attendanceRate: 95,
    medicineRisk: 'ADEQUATE',
    overallStatus: 'OPTIMAL',
    location: { lat: 28.6517, lng: 77.1906 },
    contactNumber: '+91 11 25721100',
    medicalOfficerInCharge: 'Dr. Rajiv Malhotra, MD',
  },

  // Uttar Pradesh - Lucknow & Varanasi
  {
    id: 'fac_up_lko_chinhat',
    name: 'CHC Chinhat Lucknow',
    stateId: 'st_uttar_pradesh',
    stateName: 'Uttar Pradesh',
    districtId: 'dist_lucknow',
    districtName: 'Lucknow',
    type: 'Community Health Centre (CHC)',
    populationServed: 110000,
    dailyFootfall: 620,
    totalBeds: 50,
    occupiedBeds: 45,
    availableBeds: 5,
    doctorsCount: 7,
    doctorsPresent: 6,
    nursesCount: 18,
    nursesPresent: 16,
    attendanceRate: 88,
    medicineRisk: 'HIGH',
    overallStatus: 'UNDER_STRAIN',
    location: { lat: 26.8833, lng: 81.0333 },
    contactNumber: '+91 522 2819000',
    medicalOfficerInCharge: 'Dr. Akhilesh Pandey, MBBS, MS',
  },
  {
    id: 'fac_up_vns_shivgpur',
    name: 'PHC Shivpur Varanasi',
    stateId: 'st_uttar_pradesh',
    stateName: 'Uttar Pradesh',
    districtId: 'dist_varanasi',
    districtName: 'Varanasi',
    type: 'Primary Health Centre (PHC)',
    populationServed: 54000,
    dailyFootfall: 340,
    totalBeds: 20,
    occupiedBeds: 19,
    availableBeds: 1,
    doctorsCount: 3,
    doctorsPresent: 2,
    nursesCount: 7,
    nursesPresent: 6,
    attendanceRate: 80,
    medicineRisk: 'CRITICAL',
    overallStatus: 'CRITICAL',
    location: { lat: 25.3584, lng: 82.9667 },
    contactNumber: '+91 542 2281200',
    medicalOfficerInCharge: 'Dr. Vivek Tripathi, MBBS',
  },

  // West Bengal - North 24 Parganas
  {
    id: 'fac_wb_n24_barasat',
    name: 'Taluk Hospital Barasat Rural',
    stateId: 'st_west_bengal',
    stateName: 'West Bengal',
    districtId: 'dist_north_24',
    districtName: 'North 24 Parganas',
    type: 'Taluk Hospital',
    populationServed: 160000,
    dailyFootfall: 710,
    totalBeds: 90,
    occupiedBeds: 86,
    availableBeds: 4,
    doctorsCount: 12,
    doctorsPresent: 10,
    nursesCount: 30,
    nursesPresent: 26,
    attendanceRate: 86,
    medicineRisk: 'CRITICAL',
    overallStatus: 'CRITICAL',
    location: { lat: 22.7210, lng: 88.4847 },
    contactNumber: '+91 33 25841100',
    medicalOfficerInCharge: 'Dr. Debasish Roy, MS, DNB',
  },

  // Odisha - Bhubaneswar
  {
    id: 'fac_od_khr_patia',
    name: 'Urban PHC Patia',
    stateId: 'st_odisha',
    stateName: 'Odisha',
    districtId: 'dist_khordha',
    districtName: 'Khordha',
    type: 'Urban PHC',
    populationServed: 65000,
    dailyFootfall: 360,
    totalBeds: 22,
    occupiedBeds: 17,
    availableBeds: 5,
    doctorsCount: 4,
    doctorsPresent: 4,
    nursesCount: 9,
    nursesPresent: 9,
    attendanceRate: 100,
    medicineRisk: 'ADEQUATE',
    overallStatus: 'OPTIMAL',
    location: { lat: 20.3540, lng: 85.8189 },
    contactNumber: '+91 674 2741122',
    medicalOfficerInCharge: 'Dr. Soumya Mishra, MBBS, MD',
  },
];

// Helper to generate comprehensive inventory across facilities & medicines
export function generateInitialInventory(): InventoryRecord[] {
  const inventory: InventoryRecord[] = [];

  FACILITIES_DATA.forEach((fac) => {
    MEDICINES_CATALOG.forEach((med) => {
      // Deterministic generation with controlled scenarios
      let currentStock = 0;
      let minStock = 0;
      let maxStock = 0;
      let dailyConsumption = 0;

      // Baseline parameters tuned to facility size
      const isLarge = fac.type.includes('Taluk') || fac.type.includes('District');
      const isMedium = fac.type.includes('CHC');
      const factor = isLarge ? 2.8 : isMedium ? 1.6 : 1.0;

      dailyConsumption = Math.round((med.standardBatchSize / 45) * factor);
      minStock = dailyConsumption * 10;
      maxStock = dailyConsumption * 45;

      // Intentional Scenarios for Hackathon Demo:
      if (fac.id === 'fac_kl_kkd_rural' && med.id === 'med_amoxicillin') {
        // Critical Stockout scenario: Kozhikode Amoxicillin
        currentStock = 180;
        dailyConsumption = 65; // ~2.7 days left!
      } else if (fac.id === 'fac_kl_idk_east' && med.id === 'med_paracetamol') {
        // Critical Stockout scenario: Idukki Paracetamol
        currentStock = 320;
        dailyConsumption = 85; // ~3.7 days left!
      } else if (fac.id === 'fac_kl_idk_east' && med.id === 'med_salbutamol') {
        // Critical shortage
        currentStock = 45;
        dailyConsumption = 18; // ~2.5 days left!
      } else if (fac.id === 'fac_kl_ekm_central' && med.id === 'med_paracetamol') {
        // Major surplus node: Ernakulam Central
        currentStock = 8400; // Big surplus!
        dailyConsumption = 110;
      } else if (fac.id === 'fac_kl_ekm_central' && med.id === 'med_amoxicillin') {
        // Major surplus node: Ernakulam Central
        currentStock = 4600; // Big surplus!
        dailyConsumption = 70;
      } else if (fac.id === 'fac_kl_tsr_central' && med.id === 'med_salbutamol') {
        // Surplus node: Thrissur Central
        currentStock = 1850;
        dailyConsumption = 30;
      } else if (fac.id === 'fac_up_vns_shivgpur' && med.id === 'med_azithromycin') {
        currentStock = 90;
        dailyConsumption = 40;
      } else if (fac.id === 'fac_ka_bel_gokak' && med.id === 'med_normal_saline') {
        currentStock = 120;
        dailyConsumption = 55;
      } else {
        // Standard distribution: mostly adequate, some moderate
        const hash = (fac.name.length * 17 + med.name.length * 31) % 100;
        if (hash < 12) {
          currentStock = Math.round(minStock * 0.7); // Low stock
        } else if (hash < 20) {
          currentStock = Math.round(minStock * 0.35); // Critical
        } else {
          currentStock = Math.round(minStock * 1.8 + (hash / 100) * (maxStock - minStock));
        }
      }

      const daysRemaining = dailyConsumption > 0 ? currentStock / dailyConsumption : 999;
      let stockStatus: 'ADEQUATE' | 'LOW STOCK' | 'CRITICAL' | 'OUT OF STOCK' = 'ADEQUATE';
      if (currentStock <= 0) stockStatus = 'OUT OF STOCK';
      else if (daysRemaining <= 4) stockStatus = 'CRITICAL';
      else if (daysRemaining <= 9 || currentStock < minStock) stockStatus = 'LOW STOCK';

      inventory.push({
        id: `inv_${fac.id}_${med.id}`,
        facilityId: fac.id,
        facilityName: fac.name,
        districtId: fac.districtId,
        districtName: fac.districtName,
        stateId: fac.stateId,
        stateName: fac.stateName,
        medicineId: med.id,
        medicineName: med.name,
        category: med.category,
        currentStock,
        minimumStock: minStock,
        maximumStock: maxStock,
        averageDailyConsumption: dailyConsumption,
        daysRemaining: Number(daysRemaining.toFixed(1)),
        stockStatus,
        lastUpdated: 'Today, 08:30 AM IST (Live Sync)',
        batchNumber: `BAT-2026-IND-${Math.floor(1000 + Math.random() * 9000)}`,
        expiryDate: '2027-11-30',
        unit: med.unit,
      });
    });
  });

  return inventory;
}

// Generate historical consumption data (30 days) for a given medicine + facility
export function generateConsumptionHistory(
  avgDaily: number,
  isSurgeActive: boolean = false
): ConsumptionHistoryPoint[] {
  const points: ConsumptionHistoryPoint[] = [];
  const baseDate = new Date();
  baseDate.setDate(baseDate.getDate() - 30);

  for (let i = 1; i <= 30; i++) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + i);
    const dateStr = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });

    // Gradual increase towards recent days if surge
    const surgeMultiplier = isSurgeActive && i > 22 ? 1.0 + ((i - 22) / 8) * 0.75 : 1.0;
    const weekdayFactor = i % 7 === 0 || i % 7 === 6 ? 0.75 : 1.1;
    const randomJitter = 0.9 + Math.sin(i * 1.5) * 0.15;

    const consumption = Math.round(avgDaily * weekdayFactor * randomJitter * surgeMultiplier);
    const outpatient = Math.round(consumption * 3.4 + Math.cos(i) * 15);

    points.push({
      date: dateStr,
      dayIndex: i,
      actualConsumption: Math.max(5, consumption),
      outpatientCount: Math.max(20, outpatient),
      isSurgeDay: isSurgeActive && i > 22,
    });
  }

  return points;
}

export const INITIAL_ALERTS: StockAlert[] = [
  {
    id: 'alt_001',
    level: 'CRITICAL',
    title: 'Amoxicillin stock may run out at PHC Kozhikode Rural within 3 days',
    description: 'Current stock is 180 capsules against a daily burn rate of 65 capsules. Zero buffer remaining.',
    facilityId: 'fac_kl_kkd_rural',
    facilityName: 'PHC Kozhikode Rural (Koduvally)',
    districtName: 'Kozhikode',
    stateName: 'Kerala',
    medicineId: 'med_amoxicillin',
    medicineName: 'Amoxicillin 500mg',
    currentStock: 180,
    daysRemaining: 2.7,
    recommendedAction: 'Automated inter-district transfer recommended from PHC Ernakulam Central (surplus: 4,600 units).',
    timestamp: '12 mins ago',
    isResolved: false,
  },
  {
    id: 'alt_002',
    level: 'CRITICAL',
    title: 'Paracetamol 500mg deficit projected at PHC Idukki East in 3.7 days',
    description: 'Outpatient footfall surge in high-range plantation sector has accelerated fever medication burn rate by 42%.',
    facilityId: 'fac_kl_idk_east',
    facilityName: 'PHC Idukki East (Kattappana)',
    districtName: 'Idukki',
    stateName: 'Kerala',
    medicineId: 'med_paracetamol',
    medicineName: 'Paracetamol 500mg',
    currentStock: 320,
    daysRemaining: 3.7,
    recommendedAction: 'Redistribute 2,100 units from PHC Ernakulam Central depot.',
    timestamp: '28 mins ago',
    isResolved: false,
  },
  {
    id: 'alt_003',
    level: 'HIGH',
    title: 'Salbutamol Respules depleted below safe threshold at PHC Idukki East',
    description: 'Critical respiratory emergency medication has reached 45 units (< 3 days reserve).',
    facilityId: 'fac_kl_idk_east',
    facilityName: 'PHC Idukki East (Kattappana)',
    districtName: 'Idukki',
    stateName: 'Kerala',
    medicineId: 'med_salbutamol',
    medicineName: 'Salbutamol Respules',
    currentStock: 45,
    daysRemaining: 2.5,
    recommendedAction: 'Emergency dispatch 300 units from PHC Thrissur Central warehouse.',
    timestamp: '45 mins ago',
    isResolved: false,
  },
  {
    id: 'alt_004',
    level: 'HIGH',
    title: 'Paracetamol demand increased 31% in Ernakulam district',
    description: 'Surveillance telemetry detects aggregate outpatient increase across 8 peripheral taluks.',
    facilityId: 'fac_kl_ekm_north',
    facilityName: 'PHC Aluva North',
    districtName: 'Ernakulam',
    stateName: 'Kerala',
    medicineId: 'med_paracetamol',
    medicineName: 'Paracetamol 500mg',
    currentStock: 1250,
    daysRemaining: 7.8,
    recommendedAction: 'Place secondary procurement notice with KMSCL State Medical Depot.',
    timestamp: '1 hour ago',
    isResolved: false,
  },
  {
    id: 'alt_005',
    level: 'MEDIUM',
    title: 'ORS stock approaching minimum threshold across 8 facilities in UP & WB',
    description: 'Summer pre-monsoon diarrheal surge has elevated standard oral hydration consumption.',
    facilityId: 'fac_up_vns_shivgpur',
    facilityName: 'PHC Shivpur Varanasi',
    districtName: 'Varanasi',
    stateName: 'Uttar Pradesh',
    medicineId: 'med_ors',
    medicineName: 'ORS Sachet (WHO Formula)',
    currentStock: 480,
    daysRemaining: 8.2,
    recommendedAction: 'Consolidate block-level regional distribution from District Medical Stores.',
    timestamp: '2 hours ago',
    isResolved: false,
  },
];

export const INITIAL_REDISTRIBUTIONS: RedistributionRecommendation[] = [
  {
    id: 'redist_001',
    sourceFacilityId: 'fac_kl_ekm_central',
    sourceFacilityName: 'PHC Ernakulam Central',
    sourceDistrict: 'Ernakulam',
    sourceState: 'Kerala',
    sourceAvailableStock: 5200,
    sourceSurplus: 3100,

    destFacilityId: 'fac_kl_idk_east',
    destFacilityName: 'PHC Idukki East (Kattappana)',
    destDistrict: 'Idukki',
    destState: 'Kerala',
    destCurrentStock: 320,
    destPredictedShortage: 2100,

    medicineId: 'med_paracetamol',
    medicineName: 'Paracetamol 500mg',
    recommendedQuantity: 2100,
    distanceKm: 124,
    transitTimeHours: 3.5,
    estimatedTransitHours: 3.5,
    destDeficit: 2100,
    priority: 'P1 - Urgent',
    clinicalReason: 'Prevents acute fever medication stock-out for 31,000 hill-tribe and plantation population.',
    reasoning: 'Prevents acute fever medication stock-out for 31,000 hill-tribe and plantation population in Idukki.',
    impact: 'Stockout prevented for ~24 days across 2,400 outpatients.',
    aiConfidence: 0.96,
    status: 'PENDING',
  },
  {
    id: 'redist_002',
    sourceFacilityId: 'fac_kl_ekm_central',
    sourceFacilityName: 'PHC Ernakulam Central',
    sourceDistrict: 'Ernakulam',
    sourceState: 'Kerala',
    sourceAvailableStock: 4600,
    sourceSurplus: 2400,

    destFacilityId: 'fac_kl_kkd_rural',
    destFacilityName: 'PHC Kozhikode Rural (Koduvally)',
    destDistrict: 'Kozhikode',
    destState: 'Kerala',
    destCurrentStock: 180,
    destPredictedShortage: 1200,

    medicineId: 'med_amoxicillin',
    medicineName: 'Amoxicillin 500mg',
    recommendedQuantity: 1200,
    distanceKm: 178,
    transitTimeHours: 4.2,
    estimatedTransitHours: 4.2,
    destDeficit: 1200,
    priority: 'P1 - Urgent',
    clinicalReason: 'Resolves antibiotic stock-out before weekend OPD spike. Ernakulam retains 100% safety buffer.',
    reasoning: 'Resolves antibiotic stock-out before weekend OPD spike. Ernakulam retains 100% safety buffer.',
    impact: 'Stockout prevented for ~19 days across 1,200 outpatients.',
    aiConfidence: 0.94,
    status: 'PENDING',
  },
  {
    id: 'redist_003',
    sourceFacilityId: 'fac_kl_tsr_central',
    sourceFacilityName: 'PHC Thrissur Central',
    sourceDistrict: 'Thrissur',
    sourceState: 'Kerala',
    sourceAvailableStock: 1850,
    sourceSurplus: 850,

    destFacilityId: 'fac_kl_idk_east',
    destFacilityName: 'PHC Idukki East (Kattappana)',
    destDistrict: 'Idukki',
    destState: 'Kerala',
    destCurrentStock: 45,
    destPredictedShortage: 300,

    medicineId: 'med_salbutamol',
    medicineName: 'Salbutamol Respules',
    recommendedQuantity: 300,
    distanceKm: 142,
    transitTimeHours: 3.8,
    estimatedTransitHours: 3.8,
    destDeficit: 300,
    priority: 'P2 - High',
    clinicalReason: 'Essential bronchodilator replenishment for acute respiratory distress triage in high-altitude PHC.',
    reasoning: 'Essential bronchodilator replenishment for acute respiratory distress triage in high-altitude PHC.',
    impact: 'Replenishes emergency bronchial buffer across high-altitude taluks.',
    aiConfidence: 0.91,
    status: 'PENDING',
  },
];

export const SYNTHETIC_PATIENTS: SyntheticPatient[] = [
  { patientId: 'SYN-KL-EKM-9012', id: 'SYN-KL-EKM-9012', age: 34, facilityId: 'fac_kl_ekm_central', facilityName: 'PHC Ernakulam Central', state: 'Kerala', stateName: 'Kerala', district: 'Ernakulam', districtName: 'Ernakulam', ageGroup: 'Adult', gender: 'Female', diagnosisCategory: 'Acute Febrile Illness', chiefComplaint: 'Acute Febrile Illness (Fever & Myalgia)', prescribedMedicine: 'Paracetamol 500mg', visitDate: 'Today, 09:15 AM', date: 'Today, 09:15 AM', triagePriority: 'Yellow' },
  { patientId: 'SYN-KL-KKD-8821', id: 'SYN-KL-KKD-8821', age: 8, facilityId: 'fac_kl_kkd_rural', facilityName: 'PHC Kozhikode Rural', state: 'Kerala', stateName: 'Kerala', district: 'Kozhikode', districtName: 'Kozhikode', ageGroup: 'Pediatric', gender: 'Male', diagnosisCategory: 'Bacterial Tonsillitis', chiefComplaint: 'Bacterial Tonsillitis & Sore Throat', prescribedMedicine: 'Amoxicillin 500mg', visitDate: 'Today, 09:30 AM', date: 'Today, 09:30 AM', triagePriority: 'Yellow' },
  { patientId: 'SYN-KL-IDK-7740', id: 'SYN-KL-IDK-7740', age: 67, facilityId: 'fac_kl_idk_east', facilityName: 'PHC Idukki East', state: 'Kerala', stateName: 'Kerala', district: 'Idukki', districtName: 'Idukki', ageGroup: 'Geriatric', gender: 'Male', diagnosisCategory: 'Chronic Bronchospasm (COPD)', chiefComplaint: 'Acute Dyspnea & Wheezing', prescribedMedicine: 'Salbutamol Respules', visitDate: 'Today, 10:05 AM', date: 'Today, 10:05 AM', triagePriority: 'Red' },
  { patientId: 'SYN-TN-CHN-3341', id: 'SYN-TN-CHN-3341', age: 52, facilityId: 'fac_tn_chn_tbm', facilityName: 'Urban CHC Tambaram', state: 'Tamil Nadu', stateName: 'Tamil Nadu', district: 'Chennai', districtName: 'Chennai', ageGroup: 'Adult', gender: 'Male', diagnosisCategory: 'Type 2 Diabetes Mellitus', chiefComplaint: 'Routine Diabetic Follow-up (HbA1c 7.8%)', prescribedMedicine: 'Metformin 500mg', visitDate: 'Today, 10:20 AM', date: 'Today, 10:20 AM', triagePriority: 'Green' },
  { patientId: 'SYN-KA-BLR-4512', id: 'SYN-KA-BLR-4512', age: 48, facilityId: 'fac_ka_blr_krpuram', facilityName: 'Urban PHC KR Puram', state: 'Karnataka', stateName: 'Karnataka', district: 'Bengaluru Urban', districtName: 'Bengaluru Urban', ageGroup: 'Adult', gender: 'Female', diagnosisCategory: 'Essential Hypertension', chiefComplaint: 'Elevated BP (154/94 mmHg)', prescribedMedicine: 'Telmisartan 40mg', visitDate: 'Today, 10:45 AM', date: 'Today, 10:45 AM', triagePriority: 'Green' },
  { patientId: 'SYN-UP-VNS-6619', id: 'SYN-UP-VNS-6619', age: 4, facilityId: 'fac_up_vns_shivgpur', facilityName: 'PHC Shivpur Varanasi', state: 'Uttar Pradesh', stateName: 'Uttar Pradesh', district: 'Varanasi', districtName: 'Varanasi', ageGroup: 'Pediatric', gender: 'Male', diagnosisCategory: 'Acute Gastroenteritis / Dehydration', chiefComplaint: 'Watery Diarrhea & Mild Dehydration', prescribedMedicine: 'ORS Sachet (WHO Formula)', visitDate: 'Today, 11:00 AM', date: 'Today, 11:00 AM', triagePriority: 'Yellow' },
  { patientId: 'SYN-MH-MUM-5582', id: 'SYN-MH-MUM-5582', age: 29, facilityId: 'fac_mh_mum_kurla', facilityName: 'Urban CHC Kurla West', state: 'Maharashtra', stateName: 'Maharashtra', district: 'Mumbai Suburban', districtName: 'Mumbai Suburban', ageGroup: 'Adult', gender: 'Female', diagnosisCategory: 'Acute Bronchitis', chiefComplaint: 'Persistent Cough with Purulent Sputum', prescribedMedicine: 'Azithromycin 500mg', visitDate: 'Today, 11:15 AM', date: 'Today, 11:15 AM', triagePriority: 'Yellow' },
];
