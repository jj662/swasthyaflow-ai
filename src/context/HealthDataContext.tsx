import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  StateData,
  DistrictData,
  FacilityData,
  MedicineData,
  InventoryRecord,
  StockAlert,
  RedistributionRecommendation,
  SyntheticPatient,
  AIAnalysisResult,
  AIForecastInsight,
  AINationalSummary,
  AIEmergencyBriefing,
  UserSession,
} from '../types';
import {
  STATES_DATA,
  DISTRICTS_DATA,
  FACILITIES_DATA,
  MEDICINES_CATALOG,
  generateInitialInventory,
  INITIAL_ALERTS,
  INITIAL_REDISTRIBUTIONS,
  SYNTHETIC_PATIENTS,
} from '../data/mockHealthcareData';

export type NavTab =
  | 'dashboard'
  | 'phc-network'
  | 'inventory'
  | 'demand-forecast'
  | 'alerts'
  | 'redistribution'
  | 'emergency'
  | 'ai-insights'
  | 'analytics'
  | 'data-explorer'
  | 'settings';

interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  description: string;
}

interface HealthDataContextType {
  // Navigation & View
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;

  // Filter State
  selectedStateId: string;
  setSelectedStateId: (id: string) => void;
  selectedDistrictId: string;
  setSelectedDistrictId: (id: string) => void;
  selectedFacilityId: string;
  setSelectedFacilityId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Emergency Mode
  isEmergencyMode: boolean;
  toggleEmergencyMode: () => void;
  setEmergencyMode: (val: boolean) => void;

  // Entities Data
  states: StateData[];
  districts: DistrictData[];
  facilities: FacilityData[];
  medicines: MedicineData[];
  inventory: InventoryRecord[];
  alerts: StockAlert[];
  redistributions: RedistributionRecommendation[];
  syntheticPatients: SyntheticPatient[];

  // Filtered views
  filteredDistricts: DistrictData[];
  filteredFacilities: FacilityData[];
  filteredInventory: InventoryRecord[];
  filteredAlerts: StockAlert[];

  // Metrics
  kpis: {
    totalPhcs: number;
    totalHospitals: number;
    medicinesTracked: number;
    facilitiesAtRisk: number;
    criticalStockouts: number;
    bedsTotal: number;
    bedsOccupied: number;
    bedsAvailable: number;
    bedOccupancyPercent: number;
    medicalPersonnelTotal: number;
    medicalPersonnelPresent: number;
    personnelAttendancePercent: number;
    activeAlertsCount: number;
    pendingRedistributionsCount: number;
  };

  // Actions
  approveRedistribution: (id: string) => void;
  autoBalanceAllCriticalDeficits: () => void;
  resolveAlert: (id: string) => void;
  resetSimulationData: () => void;

  // Gemini AI calls
  analyzeFacilityStock: (item: InventoryRecord) => Promise<AIAnalysisResult>;
  generateForecastInsight: (params: {
    facility: string;
    medicine: string;
    state: string;
    district: string;
    historicalData: any[];
    forecastPeriod: number;
  }) => Promise<AIForecastInsight>;
  generateNationalSummary: () => Promise<AINationalSummary>;
  generateEmergencyBriefing: () => Promise<AIEmergencyBriefing>;
  askCustomAiQuery: (question: string) => Promise<string>;

  // Cached AI outputs
  cachedNationalSummary: AINationalSummary | null;
  cachedEmergencyBriefing: AIEmergencyBriefing | null;
  isGeneratingAiSummary: boolean;
  isGeneratingEmergencyBriefing: boolean;

  // UI Modals & Drawers
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;

  selectedFacilityModal: FacilityData | null;
  openFacilityModal: (fac: FacilityData) => void;
  closeFacilityModal: () => void;

  selectedInventoryModal: InventoryRecord | null;
  openInventoryModal: (inv: InventoryRecord) => void;
  closeInventoryModal: () => void;

  // Demo Guide
  isDemoGuideOpen: boolean;
  demoStep: number;
  openDemoGuide: () => void;
  closeDemoGuide: () => void;
  setDemoStep: (step: number) => void;
  jumpToDemoStep: (step: number) => void;

  // User Auth
  currentUser: UserSession | null;
  login: (email?: string, role?: string) => void;
  logout: () => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], title: string, description: string) => void;
  removeToast: (id: string) => void;
}

const HealthDataContext = createContext<HealthDataContextType | undefined>(undefined);

const DEFAULT_USER: UserSession = {
  name: 'Dr. Anandita Sen',
  email: 'admin@swasthyaflow.demo',
  role: 'National Director (MoHFW)',
  stateAccess: 'All-India National Grid',
  token: 'mock-jwt-token-2026',
  avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
};

export const HealthDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [selectedStateId, setSelectedStateId] = useState<string>('ALL');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('ALL');
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isEmergencyMode, setIsEmergencyMode] = useState<boolean>(false);

  // Core Data
  const [states] = useState<StateData[]>(STATES_DATA);
  const [districts] = useState<DistrictData[]>(DISTRICTS_DATA);
  const [facilities, setFacilities] = useState<FacilityData[]>(FACILITIES_DATA);
  const [medicines] = useState<MedicineData[]>(MEDICINES_CATALOG);
  const [baseInventory, setBaseInventory] = useState<InventoryRecord[]>(() => generateInitialInventory());
  const [alerts, setAlerts] = useState<StockAlert[]>(INITIAL_ALERTS);
  const [redistributions, setRedistributions] = useState<RedistributionRecommendation[]>(INITIAL_REDISTRIBUTIONS);
  const [syntheticPatients] = useState<SyntheticPatient[]>(SYNTHETIC_PATIENTS);

  // Cached AI summaries
  const [cachedNationalSummary, setCachedNationalSummary] = useState<AINationalSummary | null>(null);
  const [cachedEmergencyBriefing, setCachedEmergencyBriefing] = useState<AIEmergencyBriefing | null>(null);
  const [isGeneratingAiSummary, setIsGeneratingAiSummary] = useState(false);
  const [isGeneratingEmergencyBriefing, setIsGeneratingEmergencyBriefing] = useState(false);

  // Modals & Demo
  const [selectedFacilityModal, setSelectedFacilityModal] = useState<FacilityData | null>(null);
  const [selectedInventoryModal, setSelectedInventoryModal] = useState<InventoryRecord | null>(null);
  const [isDemoGuideOpen, setIsDemoGuideOpen] = useState(false);
  const [demoStep, setDemoStep] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // User
  const [currentUser, setCurrentUser] = useState<UserSession | null>(DEFAULT_USER);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastMessage['type'], title: string, description: string) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Reset district/facility when state changes
  useEffect(() => {
    if (selectedStateId === 'ALL') {
      setSelectedDistrictId('ALL');
      setSelectedFacilityId('ALL');
    } else {
      setSelectedDistrictId('ALL');
      setSelectedFacilityId('ALL');
    }
  }, [selectedStateId]);

  // Reset facility when district changes
  useEffect(() => {
    if (selectedDistrictId === 'ALL') {
      setSelectedFacilityId('ALL');
    }
  }, [selectedDistrictId]);

  // Compute live inventory taking Emergency mode surge factors into account
  const inventory = useMemo(() => {
    return baseInventory.map((item) => {
      let consumption = item.averageDailyConsumption;
      // In emergency mode, respiratory and fever drugs experience a 70-80% surge
      if (isEmergencyMode) {
        const isRespiratory =
          item.category.includes('Respiratory') ||
          item.medicineId === 'med_paracetamol' ||
          item.medicineId === 'med_azithromycin' ||
          item.medicineId === 'med_normal_saline' ||
          item.medicineId === 'med_salbutamol';
        if (isRespiratory) {
          consumption = Math.round(item.averageDailyConsumption * 1.75);
        } else {
          consumption = Math.round(item.averageDailyConsumption * 1.2);
        }
      }

      const daysRemaining = consumption > 0 ? item.currentStock / consumption : 999;
      let stockStatus: 'ADEQUATE' | 'LOW STOCK' | 'CRITICAL' | 'OUT OF STOCK' = 'ADEQUATE';
      if (item.currentStock <= 0) stockStatus = 'OUT OF STOCK';
      else if (daysRemaining <= 4) stockStatus = 'CRITICAL';
      else if (daysRemaining <= 9 || item.currentStock < item.minimumStock) stockStatus = 'LOW STOCK';

      return {
        ...item,
        averageDailyConsumption: consumption,
        daysRemaining: Number(daysRemaining.toFixed(1)),
        stockStatus,
      };
    });
  }, [baseInventory, isEmergencyMode]);

  // Filtered Collections
  const filteredDistricts = useMemo(() => {
    if (selectedStateId === 'ALL') return districts;
    return districts.filter((d) => d.stateId === selectedStateId);
  }, [districts, selectedStateId]);

  const filteredFacilities = useMemo(() => {
    return facilities.filter((fac) => {
      if (selectedStateId !== 'ALL' && fac.stateId !== selectedStateId) return false;
      if (selectedDistrictId !== 'ALL' && fac.districtId !== selectedDistrictId) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          fac.name.toLowerCase().includes(q) ||
          fac.districtName.toLowerCase().includes(q) ||
          fac.stateName.toLowerCase().includes(q) ||
          fac.medicalOfficerInCharge.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [facilities, selectedStateId, selectedDistrictId, searchQuery]);

  const filteredInventory = useMemo(() => {
    return inventory.filter((inv) => {
      if (selectedStateId !== 'ALL' && inv.stateId !== selectedStateId) return false;
      if (selectedDistrictId !== 'ALL' && inv.districtId !== selectedDistrictId) return false;
      if (selectedFacilityId !== 'ALL' && inv.facilityId !== selectedFacilityId) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          inv.medicineName.toLowerCase().includes(q) ||
          inv.facilityName.toLowerCase().includes(q) ||
          inv.districtName.toLowerCase().includes(q) ||
          inv.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [inventory, selectedStateId, selectedDistrictId, selectedFacilityId, searchQuery]);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alt) => {
      if (selectedStateId !== 'ALL' && alt.stateName !== states.find((s) => s.id === selectedStateId)?.name) {
        return false;
      }
      if (selectedDistrictId !== 'ALL' && alt.districtName !== districts.find((d) => d.id === selectedDistrictId)?.name) {
        return false;
      }
      return true;
    });
  }, [alerts, selectedStateId, selectedDistrictId, states, districts]);

  // Aggregate KPI Calculations
  const kpis = useMemo(() => {
    const activeFacs = filteredFacilities;
    const totalPhcs = activeFacs.filter((f) => f.type.includes('PHC')).length || 840;
    const totalHospitals = activeFacs.filter((f) => !f.type.includes('PHC')).length || 142;

    const criticalStockouts = filteredInventory.filter((i) => i.stockStatus === 'CRITICAL' || i.stockStatus === 'OUT OF STOCK').length;
    const facilitiesAtRisk = new Set(
      filteredInventory
        .filter((i) => i.stockStatus === 'CRITICAL' || i.stockStatus === 'LOW STOCK')
        .map((i) => i.facilityId)
    ).size;

    const bedsTotal = activeFacs.reduce((acc, f) => acc + f.totalBeds, 0);
    const bedsOccupied = activeFacs.reduce((acc, f) => acc + (isEmergencyMode ? Math.min(f.totalBeds, Math.round(f.occupiedBeds * 1.25)) : f.occupiedBeds), 0);
    const bedsAvailable = Math.max(0, bedsTotal - bedsOccupied);
    const bedOccupancyPercent = bedsTotal > 0 ? Math.round((bedsOccupied / bedsTotal) * 100) : 0;

    const medicalPersonnelTotal = activeFacs.reduce((acc, f) => acc + f.doctorsCount + f.nursesCount, 0);
    const medicalPersonnelPresent = activeFacs.reduce((acc, f) => acc + f.doctorsPresent + f.nursesPresent, 0);
    const personnelAttendancePercent = medicalPersonnelTotal > 0 ? Math.round((medicalPersonnelPresent / medicalPersonnelTotal) * 100) : 0;

    const activeAlertsCount = filteredAlerts.filter((a) => !a.isResolved).length;
    const pendingRedistributionsCount = redistributions.filter((r) => r.status === 'PENDING').length;

    return {
      totalPhcs: selectedStateId === 'ALL' ? 24800 : totalPhcs,
      totalHospitals: selectedStateId === 'ALL' ? 4250 : totalHospitals,
      medicinesTracked: medicines.length,
      facilitiesAtRisk,
      criticalStockouts,
      bedsTotal: bedsTotal || 1850,
      bedsOccupied: bedsOccupied || 1420,
      bedsAvailable: bedsAvailable || 430,
      bedOccupancyPercent: bedOccupancyPercent || 76,
      medicalPersonnelTotal: medicalPersonnelTotal || 412,
      medicalPersonnelPresent: medicalPersonnelPresent || 384,
      personnelAttendancePercent: personnelAttendancePercent || 93,
      activeAlertsCount,
      pendingRedistributionsCount,
    };
  }, [filteredFacilities, filteredInventory, filteredAlerts, redistributions, selectedStateId, medicines, isEmergencyMode]);

  // Action: Approve Redistribution
  const approveRedistribution = (id: string) => {
    const item = redistributions.find((r) => r.id === id);
    if (!item) return;

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0284c7', '#10b981', '#3b82f6', '#f59e0b'],
    });

    // 1. Update redistribution state
    setRedistributions((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: 'APPROVED',
              approvedAt: 'Just Now (Dispatched via State Logistics Fleet)',
            }
          : r
      )
    );

    // 2. Adjust base inventory: deduct from source, add to destination
    setBaseInventory((prev) =>
      prev.map((inv) => {
        if (inv.facilityId === item.sourceFacilityId && inv.medicineId === item.medicineId) {
          const newStock = Math.max(inv.minimumStock, inv.currentStock - item.recommendedQuantity);
          return { ...inv, currentStock: newStock };
        }
        if (inv.facilityId === item.destFacilityId && inv.medicineId === item.medicineId) {
          const newStock = inv.currentStock + item.recommendedQuantity;
          return { ...inv, currentStock: newStock };
        }
        return inv;
      })
    );

    // 3. Resolve corresponding alert if present
    setAlerts((prev) =>
      prev.map((alt) =>
        alt.facilityId === item.destFacilityId && alt.medicineId === item.medicineId
          ? { ...alt, isResolved: true, resolvedAt: 'Resolved via Inter-District Redistribution' }
          : alt
      )
    );

    // 4. Update destination facility status
    setFacilities((prev) =>
      prev.map((fac) => {
        if (fac.id === item.destFacilityId) {
          return {
            ...fac,
            medicineRisk: 'ADEQUATE',
            overallStatus: 'OPTIMAL',
          };
        }
        return fac;
      })
    );

    addToast(
      'success',
      'Redistribution Approved & Dispatched',
      `Transferred ${item.recommendedQuantity.toLocaleString()} units of ${item.medicineName} from ${item.sourceFacilityName} to ${item.destFacilityName}.`
    );
  };

  // Action: Auto-balance all pending critical deficits
  const autoBalanceAllCriticalDeficits = () => {
    redistributions
      .filter((r) => r.status === 'PENDING')
      .forEach((r) => {
        approveRedistribution(r.id);
      });

    addToast(
      'success',
      'All Critical Stock Deficits Auto-Balanced',
      'Federated AI optimization dispatched emergency balance convoys to all high-risk nodes.'
    );
  };

  // Action: Resolve Alert manually
  const resolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((alt) => (alt.id === id ? { ...alt, isResolved: true, resolvedAt: 'Manually Acknowledged' } : alt))
    );
    addToast('info', 'Alert Acknowledged', 'Alert marked as resolved in central surveillance telemetry.');
  };

  // Action: Reset simulation
  const resetSimulationData = () => {
    setBaseInventory(generateInitialInventory());
    setAlerts(INITIAL_ALERTS);
    setRedistributions(INITIAL_REDISTRIBUTIONS);
    setFacilities(FACILITIES_DATA);
    setIsEmergencyMode(false);
    addToast('info', 'Simulation Reset', 'All inventory levels, alerts, and facilities returned to baseline state.');
  };

  // Emergency Mode toggle
  const toggleEmergencyMode = () => {
    const nextState = !isEmergencyMode;
    setIsEmergencyMode(nextState);
    if (nextState) {
      addToast(
        'warning',
        'EMERGENCY MODE ACTIVATED: Acute Respiratory Surge',
        'Projected patient demand escalated (+65%). Stock burn rates recalculated across all Indian health centres.'
      );
      // Generate emergency alert
      setAlerts((prev) => [
        {
          id: `alt_emerg_${Date.now()}`,
          level: 'CRITICAL',
          title: 'EMERGENCY PROTOCOL: Acute Respiratory Infection Surge Detected',
          description: 'Spike in fever, cough, and dyspnea OPD presentations across 4 states. Strategic reserves activated.',
          facilityId: 'fac_kl_idk_east',
          facilityName: 'All Monitored PHCs in Surge Zone',
          districtName: 'Multiple Districts',
          stateName: 'Kerala & Regional Grid',
          medicineId: 'med_salbutamol',
          medicineName: 'Salbutamol & Antibiotics Bundle',
          currentStock: 120,
          daysRemaining: 1.8,
          recommendedAction: 'Execute immediate strategic reserve buffer distribution.',
          timestamp: 'Just Now',
          isResolved: false,
          isEmergencyAlert: true,
        },
        ...prev,
      ]);
    } else {
      addToast('info', 'Standard Surveillance Mode Restored', 'Epidemiological demand parameters returned to baseline.');
    }
  };

  const setEmergencyMode = (val: boolean) => {
    if (val !== isEmergencyMode) {
      toggleEmergencyMode();
    }
  };

  // Gemini API Calls
  const analyzeFacilityStock = async (item: InventoryRecord): Promise<AIAnalysisResult> => {
    try {
      const nearby = inventory
        .filter(
          (inv) =>
            inv.medicineId === item.medicineId &&
            inv.facilityId !== item.facilityId &&
            inv.currentStock > inv.minimumStock * 1.5
        )
        .map((inv) => ({ name: inv.facilityName, stock: inv.currentStock }));

      const res = await fetch('/api/ai/analyze-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          facility: item.facilityName,
          state: item.stateName,
          district: item.districtName,
          medicine: item.medicineName,
          currentStock: item.currentStock,
          averageDailyConsumption: item.averageDailyConsumption,
          daysRemaining: item.daysRemaining,
          minimumStock: item.minimumStock,
          recentTrend: item.daysRemaining < 5 ? 'Rapidly Depleting' : 'Stable',
          isEmergency: isEmergencyMode,
          nearbyFacilities: nearby.slice(0, 3),
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.warn('Falling back to deterministic AI logic:', err);
      return {
        riskLevel: item.daysRemaining < 4 ? 'CRITICAL' : item.daysRemaining < 8 ? 'HIGH' : 'MEDIUM',
        explanation: `At ${item.facilityName}, stock of ${item.medicineName} (${item.currentStock} units) provides ~${item.daysRemaining} days of coverage at current burn rate (${item.averageDailyConsumption}/day).`,
        predictedDemand: Math.round(item.averageDailyConsumption * 14 * (isEmergencyMode ? 1.6 : 1.1)),
        estimatedShortage: Math.max(0, Math.round(item.averageDailyConsumption * 14 * 1.2 - item.currentStock)),
        recommendedAction:
          item.daysRemaining < 5
            ? 'Execute urgent inter-district transfer from surplus health centres.'
            : 'Maintain standard weekly buffer re-order.',
        redistributionSuggestion: `Transfer surplus from nearest regional medical hub.`,
        confidence: 0.94,
        priority: item.daysRemaining < 4 ? 'P1 - Urgent' : 'P2 - High',
        source: 'SwasthyaFlow Local Neural Engine',
      };
    }
  };

  const generateForecastInsight = async (params: {
    facility: string;
    medicine: string;
    state: string;
    district: string;
    historicalData: any[];
    forecastPeriod: number;
  }): Promise<AIForecastInsight> => {
    try {
      const res = await fetch('/api/ai/forecast-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...params,
          isEmergency: isEmergencyMode,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Fallback forecast insight:', err);
      return {
        whyIncreasing: `Seasonal epidemiological shifts combined with higher outpatient registrations in ${params.district} have increased prescription velocity by +31%.`,
        contributingFactors: [
          'High ambient humidity triggering upper respiratory presentations',
          'Increased referral footfall from sub-centres lacking pediatric oral solutions',
          'Intermittent batch arrival cycles at district medical warehouse',
        ],
        recommendedAction: `Pre-position 2,400 units of ${params.medicine} from Central Medical Services depot.`,
        confidence: 0.93,
        forecastTrend: 'Sharply Upward',
        source: 'SwasthyaFlow Local Engine',
      };
    }
  };

  const generateNationalSummary = async (): Promise<AINationalSummary> => {
    setIsGeneratingAiSummary(true);
    try {
      const topMedicines = inventory
        .filter((i) => i.stockStatus === 'CRITICAL' || i.stockStatus === 'LOW STOCK')
        .slice(0, 5)
        .map((i) => ({ medicine: i.medicineName, facility: i.facilityName, daysLeft: i.daysRemaining }));

      const res = await fetch('/api/ai/national-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalFacilities: facilities.length,
          criticalStockouts: kpis.criticalStockouts,
          highRiskFacilities: kpis.facilitiesAtRisk,
          topMedicinesAtRisk: topMedicines,
          selectedState: selectedStateId !== 'ALL' ? states.find((s) => s.id === selectedStateId)?.name : undefined,
          isEmergency: isEmergencyMode,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCachedNationalSummary(data);
      return data;
    } catch (err) {
      console.warn('Fallback national summary:', err);
      const fallback: AINationalSummary = {
        nationalSituation: `National health surveillance monitors ${facilities.length} representative healthcare centres. While baseline antibiotic reserves are stable across 78% of facilities, high-altitude and rural taluks exhibit acute stock vulnerability for pediatric antipyretics and inhalers.`,
        emergingRisks: [
          'Elevated antibiotic consumption velocity in coastal Kerala and western Maharashtra',
          'Observation bed occupancy exceeding 82% in urban polyclinics during peak OPD',
          'Supply-chain latency in remote hill-tract PHCs (Idukki, Belagavi)',
        ],
        demandAnomalies: 'Abnormal 38% increase in acute respiratory medicine requests in Ernakulam-Kozhikode health corridor.',
        stockoutPredictions: 'Without inter-facility redistribution, 4 peripheral PHCs will reach zero stock within 72 hours.',
        recommendedActions: [
          'Authorize automated inter-district balance transfers from surplus CHCs',
          'Deploy secondary buffer reserves from State Medical Corporations',
          'Synchronize real-time e-Aushadhi stock audit across primary health nodes',
        ],
        whyFlagged: 'Federated predictive model detected 2.8-sigma divergence from 30-day baseline consumption.',
        confidence: 0.95,
        riskLevel: isEmergencyMode ? 'CRITICAL SURGE' : 'ELEVATED VIGILANCE',
        source: 'SwasthyaFlow Local Engine',
      };
      setCachedNationalSummary(fallback);
      return fallback;
    } finally {
      setIsGeneratingAiSummary(false);
    }
  };

  const generateEmergencyBriefing = async (): Promise<AIEmergencyBriefing> => {
    setIsGeneratingEmergencyBriefing(true);
    try {
      const res = await fetch('/api/ai/emergency-briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emergencyName: 'Acute Respiratory Illness Surge',
          affectedStates: ['Kerala', 'Tamil Nadu', 'Karnataka', 'Maharashtra'],
          affectedDistricts: 12,
          facilitiesAtRisk: kpis.facilitiesAtRisk,
          medicinesAtRisk: ['Paracetamol 500mg', 'Azithromycin 500mg', 'Salbutamol Respules', 'Normal Saline IV'],
          additionalDemandUnits: 38500,
          reserveStockAvailable: 125000,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setCachedEmergencyBriefing(data);
      return data;
    } catch (err) {
      console.warn('Fallback emergency briefing:', err);
      const fallback: AIEmergencyBriefing = {
        briefingTitle: 'EMERGENCY ACTION DIRECTIVE: Acute Respiratory Illness Surge',
        executiveSummary:
          'A significant surge in acute respiratory outpatient presentations has accelerated consumption across 12 high-density districts. Immediate mobilization of state reserves and cross-district re-allocation is required.',
        criticalPriorities: [
          'Immediate transfer of 18,000 units of Paracetamol and Salbutamol from Ernakulam Central and State Depots within 8 hours.',
          'Re-assign 24 mobile emergency medical officers to high-strain taluk health centres.',
          'Activate 24/7 tele-triage triage protocols to alleviate primary OPD congestion.',
        ],
        supplyChainMitigation:
          'State central buffer depot maintains 125,000 units in reserve. Immediate 35% buffer release authorized under Disaster Response protocols.',
        logisticsRoutePlan:
          'Express medical transit convoys dispatched via National Highway 66 and State Highway corridors.',
        estimatedDeficitResolved: '96.2% of critical stock-outs will be resolved within 24 hours of approved transfers.',
        confidence: 0.96,
        source: 'SwasthyaFlow Local Engine',
      };
      setCachedEmergencyBriefing(fallback);
      return fallback;
    } finally {
      setIsGeneratingEmergencyBriefing(false);
    }
  };

  const askCustomAiQuery = async (question: string): Promise<string> => {
    try {
      const res = await fetch('/api/ai/custom-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          context: {
            totalFacilities: facilities.length,
            selectedState: selectedStateId,
            criticalStockouts: kpis.criticalStockouts,
            isEmergencyMode,
            pendingRedistributions: redistributions.filter((r) => r.status === 'PENDING').length,
          },
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.answer;
    } catch (err) {
      return `Based on live platform telemetry: ${facilities.length} healthcare facilities are currently monitored. ${kpis.criticalStockouts} stock-out risks require immediate attention. Recommended action is to approve pending redistribution transfers from surplus nodes.`;
    }
  };

  // Modals & Navigation Helpers
  const openFacilityModal = (fac: FacilityData) => setSelectedFacilityModal(fac);
  const closeFacilityModal = () => setSelectedFacilityModal(null);

  const openInventoryModal = (inv: InventoryRecord) => setSelectedInventoryModal(inv);
  const closeInventoryModal = () => setSelectedInventoryModal(null);

  const openDemoGuide = () => setIsDemoGuideOpen(true);
  const closeDemoGuide = () => setIsDemoGuideOpen(false);

  const jumpToDemoStep = (step: number) => {
    setDemoStep(step);
    switch (step) {
      case 1: // Dashboard
        setActiveTab('dashboard');
        setSelectedStateId('ALL');
        break;
      case 2: // Select Kerala
        setActiveTab('dashboard');
        setSelectedStateId('st_kerala');
        break;
      case 3: // Critical Alert
        setActiveTab('alerts');
        setSelectedStateId('st_kerala');
        break;
      case 4: // Demand Forecast
        setActiveTab('demand-forecast');
        setSelectedStateId('st_kerala');
        break;
      case 5: // AI Stock Analysis
        setActiveTab('ai-insights');
        break;
      case 6: // Redistribution Page
        setActiveTab('redistribution');
        break;
      case 7: // Emergency Mode
        setActiveTab('emergency');
        if (!isEmergencyMode) toggleEmergencyMode();
        break;
      case 8: // Emergency Briefing
        setActiveTab('emergency');
        break;
      case 9: // Approve Redistribution
        setActiveTab('redistribution');
        break;
      case 10: // Return to Dashboard
        setActiveTab('dashboard');
        break;
      default:
        setActiveTab('dashboard');
    }
  };

  const login = (email?: string, role?: string) => {
    setCurrentUser({
      name: email?.includes('kerala') ? 'Dr. Priya Varma' : 'Dr. Anandita Sen',
      email: email || 'admin@swasthyaflow.demo',
      role: (role as any) || 'National Director (MoHFW)',
      stateAccess: 'All-India National Grid',
      token: 'mock-jwt-token-2026',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    });
    addToast('success', 'Logged In', 'Welcome to SwasthyaFlow AI Command Center.');
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('info', 'Logged Out', 'Demo session ended.');
  };

  return (
    <HealthDataContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedStateId,
        setSelectedStateId,
        selectedDistrictId,
        setSelectedDistrictId,
        selectedFacilityId,
        setSelectedFacilityId,
        searchQuery,
        setSearchQuery,
        isEmergencyMode,
        toggleEmergencyMode,
        setEmergencyMode,
        states,
        districts,
        facilities,
        medicines,
        inventory,
        alerts,
        redistributions,
        syntheticPatients,
        filteredDistricts,
        filteredFacilities,
        filteredInventory,
        filteredAlerts,
        kpis,
        approveRedistribution,
        autoBalanceAllCriticalDeficits,
        resolveAlert,
        resetSimulationData,
        analyzeFacilityStock,
        generateForecastInsight,
        generateNationalSummary,
        generateEmergencyBriefing,
        askCustomAiQuery,
        cachedNationalSummary,
        cachedEmergencyBriefing,
        isGeneratingAiSummary,
        isGeneratingEmergencyBriefing,
        selectedFacilityModal,
        openFacilityModal,
        closeFacilityModal,
        selectedInventoryModal,
        openInventoryModal,
        closeInventoryModal,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        openMobileMenu,
        closeMobileMenu,
        toggleMobileMenu,
        isDemoGuideOpen,
        demoStep,
        openDemoGuide,
        closeDemoGuide,
        setDemoStep,
        jumpToDemoStep,
        currentUser,
        login,
        logout,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </HealthDataContext.Provider>
  );
};

export const useHealthData = () => {
  const context = useContext(HealthDataContext);
  if (!context) {
    throw new Error('useHealthData must be used within a HealthDataProvider');
  }
  return context;
};
