'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Map, Plane, Leaf } from 'lucide-react';
import ProfileSetup from '@/components/profile/ProfileSetup';
import RegionDetails from '@/components/health/RegionDetails';
import TravelAdvisor from '@/components/health/TravelAdvisor';
import BeautySkinModule from '@/components/wellness/BeautySkinModule';
import { useWellnessStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/theme/ThemeToggle';
const EthiopiaMap = dynamic(() => import('@/components/map/ethiopiaMap'), { ssr: false });
const WellnessBot = dynamic(() => import('@/components/chat/WellnessBot'), { ssr: false });

export default function Home() {
  const [activeTab, setActiveTab] = useState('map');
  const { selectedRegion } = useWellnessStore();

  const navItems = [
    { id: 'map', label: 'Map & Risks', icon: Map },
    { id: 'travel', label: 'Travel Advisor', icon: Plane },
    { id: 'beauty', label: 'Beauty & Skin', icon: Leaf },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/80 backdrop-blur-md flex flex-col shrink-0 shadow-sm">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-2">
            <Image src="/logo.png" alt="RoamWell" width={40} height={40} className="h-20 w-20" />
            <h1 className="text-xl font-bold text-primary">RoamWell</h1>
          </div>
          <p className="text-xs text-muted-foreground">Know your risk. Protect your health.</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border space-y-2">
            <div className="flex items-center justify-between">
    <span className="text-xs text-muted-foreground">Theme</span>
    <ThemeToggle />
  </div>

          <ProfileSetup />

        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 bg-background/50">
        {/* Map & Risks View */}
        {activeTab === 'map' && (
          <div className="h-full flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Ethiopia Health Map</h2>
                <p className="text-muted-foreground">Tap a region to view localized health risks and advice.</p>
              </div>
              {selectedRegion && (
                <div className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium animate-in fade-in">
                  Viewing: {selectedRegion.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
              )}
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-0">
              <div className="lg:col-span-3 bg-card/80 backdrop-blur rounded-xl border border-border shadow-sm overflow-hidden transition-all hover:shadow-md">
                <EthiopiaMap />
              </div>
              <div className="lg:col-span-2 overflow-y-auto pr-2">
                <RegionDetails />
              </div>
            </div>
          </div>
        )}

        {/* Travel Advisor View */}
        {activeTab === 'travel' && (
          <div className="h-full animate-in fade-in slide-in-from-right-4 duration-300">
            <TravelAdvisor />
          </div>
        )}

        {/* Beauty & Skin View */}
        {activeTab === 'beauty' && (
          <div className="h-full animate-in fade-in slide-in-from-right-4 duration-300">
            <BeautySkinModule />
          </div>
        )}
      </main>

      <WellnessBot />
    </div>
  );
}