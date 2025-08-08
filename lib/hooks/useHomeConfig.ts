import { useState, useEffect } from 'react';
import { HomePageConfig } from '@/types';
import { DEFAULT_HOME_CONFIG } from '@/lib/constants';

export function useHomeConfig() {
  const [config, setConfig] = useState<HomePageConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/homepage-config');
        
        if (!response.ok) {
          throw new Error('获取配置失败');
        }
        
        const data = await response.json();
        setConfig(data);
      } catch (err) {
        console.warn('Failed to fetch config from API, using default config:', err);
        setConfig(DEFAULT_HOME_CONFIG as HomePageConfig);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  return { config, loading };
}