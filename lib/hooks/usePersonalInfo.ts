import { useState, useEffect } from 'react';
import { PersonalInfo } from '../types/personal-info';
import { getPersonalInfo } from '../data/personal-info';

export function usePersonalInfo() {
  const [data, setData] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        setLoading(true);
        const personalInfo = await getPersonalInfo();
        setData(personalInfo);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch personal info');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalInfo();
  }, []);

  return { data, loading, error };
}