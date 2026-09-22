import axios from 'axios';
export interface AdminUser { id: number; name: string; email: string; is_admin: boolean; must_change_password: boolean; }
const auth = axios.create({ baseURL: '/api/auth', headers: { Accept: 'application/json' }, withCredentials: true, timeout: 10000 });
async function csrf() {
  const response = await auth.get('/csrf');
  return { headers: { 'X-CSRF-TOKEN': response.data.csrf_token } };
}
export const adminAuth = {
  async me(): Promise<AdminUser> { return (await auth.get('/me')).data.data; },
  async login(email: string, password: string): Promise<AdminUser> { return (await auth.post('/login', { email, password }, await csrf())).data.data; },
  async logout() { await auth.post('/logout', {}, await csrf()); },
  async changePassword(data: { current_password: string; password: string; password_confirmation: string }): Promise<AdminUser> { return (await auth.put('/password', data, await csrf())).data.data; },
};
