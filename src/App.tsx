import React from 'react';
import { HealthDataProvider, useHealthData } from './context/HealthDataContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { EmergencyBanner } from './components/layout/EmergencyBanner';
import { DemoGuideModal } from './components/layout/DemoGuideModal';
import { FacilityDetailModal } from './components/common/FacilityDetailModal';
import { MedicineDetailModal } from './components/common/MedicineDetailModal';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { TabletQuickNav } from './components/layout/TabletQuickNav';

// Pages
import { CommandCenterPage } from './components/pages/CommandCenterPage';
import { PhcNetworkPage } from './components/pages/PhcNetworkPage';
import { InventoryPage } from './components/pages/InventoryPage';
import { DemandForecastPage } from './components/pages/DemandForecastPage';
import { AlertsPage } from './components/pages/AlertsPage';
import { RedistributionPage } from './components/pages/RedistributionPage';
import { EmergencyPage } from './components/pages/EmergencyPage';
import { AiInsightsPage } from './components/pages/AiInsightsPage';
import { AnalyticsPage } from './components/pages/AnalyticsPage';
import { DataExplorerPage } from './components/pages/DataExplorerPage';
import { SettingsPage } from './components/pages/SettingsPage';

// Toast Notification Container
const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useHealthData();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto p-4 rounded-xl shadow-xl border text-xs flex items-start justify-between gap-3 animate-slideUp ${
            t.type === 'success'
              ? 'bg-slate-900 text-white border-emerald-500/50'
              : t.type === 'warning'
              ? 'bg-slate-900 text-white border-amber-500/50'
              : t.type === 'error'
              ? 'bg-slate-900 text-white border-rose-500/50'
              : 'bg-slate-900 text-white border-blue-500/50'
          }`}
        >
          <div className="space-y-1">
            <p className="font-bold text-slate-100">{t.title}</p>
            <p className="text-slate-300 leading-normal text-[11px]">{t.description}</p>
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="text-slate-400 hover:text-white text-xs font-bold"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

const MainContent: React.FC = () => {
  const { activeTab } = useHealthData();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <CommandCenterPage />;
      case 'phc-network':
        return <PhcNetworkPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'demand-forecast':
        return <DemandForecastPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'redistribution':
        return <RedistributionPage />;
      case 'emergency':
        return <EmergencyPage />;
      case 'ai-insights':
        return <AiInsightsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'data-explorer':
        return <DataExplorerPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <CommandCenterPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Platform Header */}
      <Header />

      {/* Emergency Crisis Banner */}
      <EmergencyBanner />

      {/* Tablet Quick Navigation Bar (Horizontal slider for tablet viewports) */}
      <TabletQuickNav />

      {/* Main Body with Sidebar + View Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-3 sm:p-5 lg:p-8 min-w-0 overflow-x-hidden pb-20 lg:pb-8">
          {renderActivePage()}
        </main>
      </div>

      {/* Platform Footer */}
      <div className="pb-16 lg:pb-0">
        <Footer />
      </div>

      {/* Mobile Bottom Navigation Bar (Fixed for Mobile & Tablet) */}
      <MobileBottomNav />

      {/* Global Drawers & Modals */}
      <DemoGuideModal />
      <FacilityDetailModal />
      <MedicineDetailModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <HealthDataProvider>
      <MainContent />
    </HealthDataProvider>
  );
}
