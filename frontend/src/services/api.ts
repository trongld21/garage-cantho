import axios from 'axios';
import { ServiceItem, ProductItem, CarItem, PostItem, BookingPayload, BookingItem } from '@/types';
const client = axios.create({ baseURL: typeof window === 'undefined' ? (process.env.API_INTERNAL_URL || 'http://127.0.0.1:8000/api') : (process.env.NEXT_PUBLIC_API_URL || '/api'), headers: { Accept: 'application/json' }, timeout: 10000 });
export function apiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const errors = error.response?.data?.errors;
    if (errors) return Object.values(errors).flat().join(' ');
    return error.response?.data?.message || 'Không kết nối được máy chủ. Vui lòng thử lại.';
  }
  return 'Không thể hoàn tất thao tác. Vui lòng thử lại.';
}
export const apiService = {
  async getServices(category?: string, featured?: boolean): Promise<ServiceItem[]> { return (await client.get('/services', { params: { category, featured } })).data.data; },
  async getServiceBySlug(slug: string): Promise<ServiceItem | null> { try { return (await client.get(`/services/${encodeURIComponent(slug)}`)).data.data; } catch (error) { if (axios.isAxiosError(error) && error.response?.status === 404) return null; throw error; } },
  async saveService(data: Partial<ServiceItem>): Promise<ServiceItem> { const result = (data.id ? await client.put(`/admin/services/${data.id}`, data) : await client.post('/admin/services', data)).data.data; if (typeof window !== 'undefined') window.dispatchEvent(new Event('services-updated')); return result; },
  async deleteService(id: number): Promise<boolean> { await client.delete(`/admin/services/${id}`); if (typeof window !== 'undefined') window.dispatchEvent(new Event('services-updated')); return true; },
  async getProducts(category?: string, search?: string): Promise<ProductItem[]> { return (await client.get('/products', { params: { category, search } })).data.data; },
  async getProductBySlug(slug: string): Promise<ProductItem | null> { try { return (await client.get(`/products/${encodeURIComponent(slug)}`)).data.data; } catch (error) { if (axios.isAxiosError(error) && error.response?.status === 404) return null; throw error; } },
  async saveProduct(data: Partial<ProductItem>): Promise<ProductItem> { return (data.id ? await client.put(`/admin/products/${data.id}`, data) : await client.post('/admin/products', data)).data.data; },
  async deleteProduct(id: number): Promise<boolean> { await client.delete(`/admin/products/${id}`); return true; },
  async getCars(type?: 'sale' | 'rent'): Promise<CarItem[]> { return (await client.get('/cars', { params: { type } })).data.data; },
  async getCarBySlug(slug: string): Promise<CarItem | null> { try { return (await client.get(`/cars/${encodeURIComponent(slug)}`)).data.data; } catch (error) { if (axios.isAxiosError(error) && error.response?.status === 404) return null; throw error; } },
  async saveCar(data: Partial<CarItem>): Promise<CarItem> { return (data.id ? await client.put(`/admin/cars/${data.id}`, data) : await client.post('/admin/cars', data)).data.data; },
  async deleteCar(id: number): Promise<boolean> { await client.delete(`/admin/cars/${id}`); return true; },
  async getAdminPosts(): Promise<PostItem[]> { return (await client.get('/admin/posts')).data.data; },
  async getPosts(): Promise<PostItem[]> { return (await client.get('/posts', { params: {  } })).data.data; },
  async getPostBySlug(slug: string): Promise<PostItem | null> { try { return (await client.get(`/posts/${encodeURIComponent(slug)}`)).data.data; } catch (error) { if (axios.isAxiosError(error) && error.response?.status === 404) return null; throw error; } },
  async savePost(data: Partial<PostItem>): Promise<PostItem> { return (data.id ? await client.put(`/admin/posts/${data.id}`, data) : await client.post('/admin/posts', data)).data.data; },
  async deletePost(id: number): Promise<boolean> { await client.delete(`/admin/posts/${id}`); return true; },
  async getBookings(): Promise<BookingItem[]> { return (await client.get('/admin/bookings')).data.data; },
  async createBooking(payload: BookingPayload) { const res = await client.post('/bookings', payload); if (!res.data?.data?.id) throw new Error('Booking was not acknowledged by the server'); return { ...res.data, booking_id: `TNB-${res.data.data.id}` }; },
  async updateBookingStatus(id: number, status: BookingItem['status']): Promise<BookingItem> { return (await client.patch(`/admin/bookings/${id}/status`, { status })).data.data; },
  async deleteBooking(id: number) { await client.delete(`/admin/bookings/${id}`); return true; },
};
