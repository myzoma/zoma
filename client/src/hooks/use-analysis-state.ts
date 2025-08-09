import { useState, useEffect } from 'react';

// حالة مشتركة للعملة والإطار الزمني المختارين
let sharedAnalysisState = {
  selectedCrypto: "BTC/USDT",
  timeFrame: "1d", // تم تغييره إلى يومي كما طلب المستخدم
  analysisResult: null as any
};

// مشتركي التحديثات
const subscribers: Array<(state: typeof sharedAnalysisState) => void> = [];

export function useAnalysisState() {
  const [state, setState] = useState(sharedAnalysisState);

  useEffect(() => {
    const updateState = (newState: typeof sharedAnalysisState) => {
      setState({ ...newState });
    };
    
    subscribers.push(updateState);
    
    return () => {
      const index = subscribers.indexOf(updateState);
      if (index > -1) {
        subscribers.splice(index, 1);
      }
    };
  }, []);

  const updateAnalysisState = (updates: Partial<typeof sharedAnalysisState>) => {
    sharedAnalysisState = { ...sharedAnalysisState, ...updates };
    subscribers.forEach(callback => callback(sharedAnalysisState));
  };

  return {
    selectedCrypto: state.selectedCrypto,
    timeFrame: state.timeFrame,
    analysisResult: state.analysisResult,
    updateAnalysisState
  };
}