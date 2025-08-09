import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface WaveAnalysisData {
  currentWave?: {
    currentWave: string;
    direction: string;
    expectedTarget: number;
    expectedLength: number;
    completion: number;
    nextWave: string;
    confidence: number;
  } | null;
  currentPrice: number;
  patterns: any[];
  signals: any[];
}

// مكان لتخزين البيانات المشتركة
let sharedWaveData: WaveAnalysisData = {
  currentWave: null,
  currentPrice: 0,
  patterns: [],
  signals: []
};

export function useWaveAnalysis() {
  const [waveData, setWaveData] = useState<WaveAnalysisData>(sharedWaveData);

  // تحديث البيانات المشتركة
  const updateWaveData = (data: Partial<WaveAnalysisData>) => {
    sharedWaveData = { ...sharedWaveData, ...data };
    setWaveData(sharedWaveData);
  };

  return {
    waveData,
    updateWaveData
  };
}

// Hook للحصول على البيانات المشتركة فقط
export function useSharedWaveData() {
  const [waveData, setWaveData] = useState<WaveAnalysisData>(sharedWaveData);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveData({ ...sharedWaveData });
    }, 1000); // تحديث كل ثانية

    return () => clearInterval(interval);
  }, []);

  return waveData;
}