'use client';
import { useEffect, useState } from 'react';
import { apiService } from '@/services/api';
import { ServiceItem } from '@/types';
export function useServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  useEffect(() => {
    let active = true;
    const refresh = () => { apiService.getServices().then(data => { if (active) setServices(data); }).catch(() => {}); };
    refresh();
    window.addEventListener('focus', refresh);
    window.addEventListener('services-updated', refresh);
    return () => { active = false; window.removeEventListener('focus', refresh); window.removeEventListener('services-updated', refresh); };
  }, []);
  return services;
}
