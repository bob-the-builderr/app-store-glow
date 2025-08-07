import React, { createContext, useContext, useState, ReactNode } from 'react';

interface App {
  id: string;
  name: string;
  icon: string;
  status: 'active' | 'inactive';
  lastUpdated: string;
  package?: string;
  developer?: string;
  country?: string;
}

interface AppContextType {
  selectedApp: App | null;
  setSelectedApp: (app: App | null) => void;
  userApps: App[];
  addUserApp: (app: App) => void;
  removeUserApp: (appId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [userApps, setUserApps] = useState<App[]>([
    { 
      id: "1", 
      name: "FitTracker Pro", 
      icon: "/placeholder.svg",
      status: "active",
      lastUpdated: "2 hours ago",
      package: "com.fittracker.pro",
      developer: "FitTracker Inc",
      country: "US"
    },
    { 
      id: "2", 
      name: "PhotoEdit Master", 
      icon: "/placeholder.svg",
      status: "active",
      lastUpdated: "1 day ago",
      package: "com.photoedit.master",
      developer: "PhotoEdit Studio",
      country: "US"
    },
    { 
      id: "3", 
      name: "TaskManager Plus", 
      icon: "/placeholder.svg",
      status: "inactive",
      lastUpdated: "3 days ago",
      package: "com.taskmanager.plus",
      developer: "TaskManager Corp",
      country: "US"
    },
    { 
      id: "4", 
      name: "Music Streamer", 
      icon: "/placeholder.svg",
      status: "active",
      lastUpdated: "5 hours ago",
      package: "com.music.streamer",
      developer: "MusicStream Inc",
      country: "US"
    },
  ]);

  const addUserApp = (app: App) => {
    setUserApps(prev => {
      // Check if app already exists
      const exists = prev.some(existingApp => existingApp.id === app.id);
      if (!exists) {
        return [...prev, app];
      }
      return prev;
    });
  };

  const removeUserApp = (appId: string) => {
    setUserApps(prev => prev.filter(app => app.id !== appId));
    if (selectedApp?.id === appId) {
      setSelectedApp(null);
    }
  };

  const value: AppContextType = {
    selectedApp,
    setSelectedApp,
    userApps,
    addUserApp,
    removeUserApp,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}; 