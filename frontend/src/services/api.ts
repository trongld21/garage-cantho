import axios from 'axios';
import {
  ServiceItem,
  ProductItem,
  CarItem,
  PostItem,
  BookingPayload,
  BookingItem,
  RescuePayload,
  RescueItem,
  DashboardStats,
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 5000,
});

// Initial In-Memory State for Admin management fallback
let mockBookingsState: BookingItem[] = [
  {
    id: 1,
    booking_id: 'TNB-849201',
    customer_name: 'Nguyễn Văn An',
    phone: '0912345678',
    email: 'an.nguyen@example.com',
    license_plate: '65A-123.45',
    car_model: 'Toyota Fortuner Legender',
    car_year: '2022',
    service_name: 'Sửa chữa & Bảo dưỡng tổng hợp',
    booking_date: new Date().toISOString().split('T')[0],
    booking_time: '09:00',
    note: 'Kiểm tra gầm kêu lách cách và thay dầu nhớt Mobil 1.',
    status: 'pending',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 2,
    booking_id: 'TNB-732910',
    customer_name: 'Trần Thị Thu',
    phone: '0939888999',
    email: 'thu.tran@example.com',
    license_plate: '65C-888.88',
    car_model: 'Mercedes-Benz C200',
    car_year: '2023',
    service_name: 'Vệ sinh khoang động cơ hơi nước nóng',
    booking_date: new Date().toISOString().split('T')[0],
    booking_time: '14:30',
    note: 'Vệ sinh khoang máy tỉ mỉ, rửa cẩn thận giắc điện.',
    status: 'confirmed',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 3,
    booking_id: 'TNB-610482',
    customer_name: 'Lê Hoàng Nam',
    phone: '0987654321',
    email: 'nam.le@example.com',
    license_plate: '65A-999.99',
    car_model: 'Ford Everest Titanium',
    car_year: '2023',
    service_name: 'Đồng sơn & Phục hồi thân xe bị móp',
    booking_date: new Date().toISOString().split('T')[0],
    booking_time: '10:30',
    note: 'Phục hồi vết móp cản sau bên phụ.',
    status: 'in_progress',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

let mockRescuesState: RescueItem[] = [
  {
    id: 1,
    request_id: 'RESCUE-992102',
    customer_name: 'Phạm Minh Tuấn',
    phone: '0900000000',
    car_model: 'Hyundai Accent 2021',
    issue_type: 'Hết bình ắc quy',
    issue_description: 'Xe chết máy hoàn toàn ở chân cầu Hưng Lợi, cần kích bình gấp.',
    location: 'Chân cầu Hưng Lợi, Đường Nguyễn Văn Linh, P. Hưng Lợi, Q. Ninh Kiều',
    coordinates: { lat: 10.0215, lng: 105.7654 },
    status: 'dispatched',
    created_at: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: 2,
    request_id: 'RESCUE-881290',
    customer_name: 'Võ Thanh Hà',
    phone: '0907123456',
    car_model: 'Kia Cerato 2020',
    issue_type: 'Xẹp lốp',
    issue_description: 'Cán đinh thủng lốp trước bên tài.',
    location: '1–2 Nguyễn Văn Lưu, Khu TĐC Văn Hóa Tây Đô, Cái Răng, Cần Thơ',
    status: 'received',
    created_at: new Date(Date.now() - 900000).toISOString(),
  },
];

let mockServicesState: ServiceItem[] = [
  {
    id: 1,
    name: 'Sửa chữa & Bảo dưỡng tổng hợp',
    slug: 'sua-chua-bao-duong-tong-hop',
    category: 'bảo dưỡng',
    summary: 'Kiểm tra gầm, máy, hệ thống điện, thay dầu nhớt định kỳ và khắc phục mọi sự cố ô tô.',
    description:
      'Tây Đô Auto Car cung cấp quy trình kiểm định 30 hạng mục nghiêm ngặt chuẩn Châu Âu.',
    price_range: 'Từ 500.000đ',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    is_featured: true,
  },
  {
    id: 2,
    name: 'Vệ sinh khoang động cơ bằng hơi nước nóng',
    slug: 've-sinh-khoang-dong-co',
    category: 'bảo dưỡng',
    summary: 'Rửa động cơ ô tô chuyên sâu công nghệ hơi nước bão hòa, loại bỏ dầu mỡ bám bẩn.',
    description:
      'Vệ sinh khoang máy bằng công nghệ phun hơi nước nóng áp lực bão hòa giúp đánh bay dầu mỡ lâu ngày.',
    price_range: '600.000đ - 1.200.000đ',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
    is_featured: true,
  },
  {
    id: 3,
    name: 'Đồng sơn & Phục hồi thân xe móp méo',
    slug: 'dong-son-phuc-hoi-than-xe',
    category: 'đồng sơn',
    summary: 'Sơn sấy khép kín trong phòng pha màu vi tính 3M chính xác 100%, phục hồi va chạm.',
    description:
      'Sở hữu phòng sơn hấp hiện đại chuẩn Châu Âu, sơn gốc nước cao cấp 3M và PPG.',
    price_range: 'Báo giá theo diện tích vết xước',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    is_featured: true,
  },
  {
    id: 4,
    name: 'Chăm sóc & Bọc da nội thất cao cấp',
    slug: 'cham-soc-boc-da-noi-that',
    category: 'chăm sóc xe',
    summary: 'May bọc ghế da Nappa, dán trần 5D, dán phim cách nhiệt 3M Crystalline chính hãng.',
    description: 'Nâng tầm không gian sang trọng cho khoang nội thất xe với chất liệu da Nappa Ý.',
    price_range: 'Từ 2.500.000đ',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80',
    is_featured: true,
  },
];

let mockProductsState: ProductItem[] = [
  {
    id: 1,
    name: 'Màn Hình Android OLEDPro A5 HD 9-10 Inch',
    slug: 'man-hinh-android-oledpro-a5',
    category: 'Đồ chơi xe',
    brand: 'OLEDPro',
    price: 4800000,
    sale_price: 4200000,
    stock: 15,
    summary: 'Màn hình ô tô thông minh tích hợp Vietmap S1, SIM 4G, điều khiển giọng nói Kiki.',
    description: 'Tấm nền QLED sắc nét, cấu hình mượt mà RAM 2GB, ROM 32GB.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    is_featured: true,
  },
  {
    id: 2,
    name: 'Dầu Nhớt Động Cơ Mobil 1 Gold 5W-30 (4 Lít)',
    slug: 'dau-nhot-mobil-1-gold-5w30',
    category: 'Phụ tùng',
    brand: 'Mobil 1',
    price: 1350000,
    sale_price: 1200000,
    stock: 50,
    summary: 'Dầu nhớt tổng hợp toàn phần nhập khẩu Mỹ bảo vệ động cơ lên tới 15.000 KM.',
    description: 'Công thức tổng hợp toàn phần chống mài mòn vượt trội.',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    is_featured: true,
  },
  {
    id: 3,
    name: 'Cảm Biến Áp Suất Lốp Steelmate TP-MT11 Van Trong',
    slug: 'cam-bien-ap-suat-lop-steelmate-tp-mt11',
    category: 'Đồ chơi xe',
    brand: 'Steelmate',
    price: 2800000,
    sale_price: 2450000,
    stock: 20,
    summary: 'Cảm biến van trong chính xác cao, màn hình năng lượng mặt trời.',
    description: 'Steelmate TP-MT11 đo chính xác nhiệt độ và áp suất lốp 24/7.',
    image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80',
    is_featured: true,
  },
];

let mockCarsState: CarItem[] = [
  {
    id: 1,
    title: 'Toyota Fortuner Legender 2.8L 4x4 AT 2022',
    slug: 'toyota-fortuner-legender-2022',
    listing_type: 'sale',
    price: 1180000000,
    year: 2022,
    transmission: 'Tự động 6 cấp',
    fuel_type: 'Dầu (Diesel)',
    mileage: '32.000 km',
    color: 'Trắng ngọc trai',
    location: 'Cần Thơ',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80',
    summary: 'Xe gầm cao SUV 7 chỗ bản full option Legender cao cấp.',
    description: 'Xe gia đình sử dụng giữ gìn kỹ lưỡng. Sơn zin 95%, nội thất da 2 màu đỏ đen.',
    status: 'available',
  },
  {
    id: 2,
    title: 'Ford Everest Titanium+ 2.0L 4WD 2023',
    slug: 'ford-everest-titanium-2023',
    listing_type: 'sale',
    price: 1350000000,
    year: 2023,
    transmission: 'Tự động 10 cấp',
    fuel_type: 'Dầu Bi-Turbo',
    mileage: '18.000 km',
    color: 'Đen Titanium',
    location: 'Cần Thơ',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
    summary: 'SUV Mỹ đẳng cấp, dẫn động 4 bánh 4WD, cửa sổ trời Panorama toàn cảnh.',
    description: 'Ford Everest bản 2 cầu cao cấp nhất màu Đen sang trọng.',
    status: 'available',
  },
  {
    id: 3,
    title: 'Cho Thuê Xe Du Lịch Toyota Innova Cross 7 Chỗ Tự Lái / Có Tài',
    slug: 'cho-thue-xe-toyota-innova-cross',
    listing_type: 'rent',
    price: 1200000,
    year: 2024,
    transmission: 'Tự động CVT',
    fuel_type: 'Xăng Hybrid',
    mileage: 'Xe mới 100%',
    color: 'Đồng Ánh Kim',
    location: 'Cần Thơ',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
    summary: 'Dịch vụ cho thuê xe tự lái / có tài xế phục vụ đi tour.',
    description: 'Dòng xe MPV thế hệ mới siêu êm ái, tiết kiệm nhiên liệu.',
    status: 'available',
  },
];

let mockPostsState: PostItem[] = [
  {
    id: 1,
    title: 'Xe Cứu Hộ Ô Tô Cần Thơ 24/7 - Có Mặt Nhanh Trong 15 Phút',
    slug: 'xe-cuu-ho-can-tho-247',
    category: 'Dịch vụ',
    summary: 'Dịch vụ xe cứu hộ giao thông chuyên nghiệp Cần Thơ kéo xe hỏng, cẩu xe tai nạn an toàn 24/24.',
    content: 'Khi di chuyển trên các tuyến quốc lộ Miền Tây hay cầu Cần Thơ...',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80',
    published_at: new Date().toISOString(),
    author: 'Ban Kỹ Thuật Garage',
  },
  {
    id: 2,
    title: 'Rửa Động Cơ Ô Tô Bằng Hơi Nước Nóng Có Thực Sự Cần Thiết?',
    slug: 'rua-dong-co-o-to-co-can-thiet-khong',
    category: 'Kinh nghiệm xe',
    summary: 'Giải đáp thắc mắc chuyên sâu của chủ xe về việc vệ sinh khoang máy định kỳ.',
    content: 'Khoang động cơ sau một thời gian vận hành liên tục sẽ bị bám bùn đất...',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
    published_at: new Date().toISOString(),
    author: 'Kỹ Sư Trưởng Nguyễn Văn Hùng',
  },
];

export const apiService = {
  // SERVICES
  async getServices(category?: string, featured?: boolean): Promise<ServiceItem[]> {
    try {
      const res = await client.get('/services', { params: { category, featured } });
      return res.data.data;
    } catch {
      let filtered = [...mockServicesState];
      if (featured) filtered = filtered.filter((s) => s.is_featured);
      if (category && category !== 'all') {
        filtered = filtered.filter((s) => s.category.toLowerCase().includes(category.toLowerCase()));
      }
      return filtered;
    }
  },

  async getServiceBySlug(slug: string): Promise<ServiceItem | null> {
    try {
      const res = await client.get(`/services/${slug}`);
      return res.data.data;
    } catch {
      const found = mockServicesState.find((s) => s.slug === slug);
      return found || mockServicesState[0];
    }
  },

  async saveService(serviceData: Partial<ServiceItem>): Promise<ServiceItem> {
    try {
      const res = serviceData.id
        ? await client.put(`/services/${serviceData.id}`, serviceData)
        : await client.post('/services', serviceData);
      return res.data.data;
    } catch {
      if (serviceData.id) {
        mockServicesState = mockServicesState.map((s) =>
          s.id === serviceData.id ? { ...s, ...serviceData } as ServiceItem : s
        );
        return mockServicesState.find((s) => s.id === serviceData.id)!;
      } else {
        const newService: ServiceItem = {
          id: Date.now(),
          name: serviceData.name || 'Dịch vụ mới',
          slug: serviceData.slug || `dich-vu-${Date.now()}`,
          category: serviceData.category || 'bảo dưỡng',
          summary: serviceData.summary || '',
          description: serviceData.description || '',
          price_range: serviceData.price_range || 'Báo giá',
          image: serviceData.image || 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738',
          is_featured: serviceData.is_featured ?? true,
        };
        mockServicesState.unshift(newService);
        return newService;
      }
    }
  },

  async deleteService(id: number): Promise<boolean> {
    try {
      await client.delete(`/services/${id}`);
      return true;
    } catch {
      mockServicesState = mockServicesState.filter((s) => s.id !== id);
      return true;
    }
  },

  // PRODUCTS
  async getProducts(category?: string, search?: string): Promise<ProductItem[]> {
    try {
      const res = await client.get('/products', { params: { category, search } });
      return res.data.data;
    } catch {
      let filtered = [...mockProductsState];
      if (category && category !== 'all') {
        filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
        );
      }
      return filtered;
    }
  },

  async getProductBySlug(slug: string): Promise<ProductItem | null> {
    try {
      const res = await client.get(`/products/${slug}`);
      return res.data.data;
    } catch {
      const found = mockProductsState.find((p) => p.slug === slug);
      return found || mockProductsState[0];
    }
  },

  async saveProduct(productData: Partial<ProductItem>): Promise<ProductItem> {
    try {
      const res = productData.id
        ? await client.put(`/products/${productData.id}`, productData)
        : await client.post('/products', productData);
      return res.data.data;
    } catch {
      if (productData.id) {
        mockProductsState = mockProductsState.map((p) =>
          p.id === productData.id ? { ...p, ...productData } as ProductItem : p
        );
        return mockProductsState.find((p) => p.id === productData.id)!;
      } else {
        const newProduct: ProductItem = {
          id: Date.now(),
          name: productData.name || 'Sản phẩm mới',
          slug: productData.slug || `san-pham-${Date.now()}`,
          category: productData.category || 'Phụ tùng',
          brand: productData.brand || 'Chính Hãng',
          price: productData.price || 1000000,
          sale_price: productData.sale_price || null,
          stock: productData.stock || 10,
          summary: productData.summary || '',
          description: productData.description || '',
          image: productData.image || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
          is_featured: productData.is_featured ?? true,
        };
        mockProductsState.unshift(newProduct);
        return newProduct;
      }
    }
  },

  async deleteProduct(id: number): Promise<boolean> {
    try {
      await client.delete(`/products/${id}`);
      return true;
    } catch {
      mockProductsState = mockProductsState.filter((p) => p.id !== id);
      return true;
    }
  },

  // CARS
  async getCars(type?: 'sale' | 'rent'): Promise<CarItem[]> {
    try {
      const res = await client.get('/cars', { params: { type } });
      return res.data.data;
    } catch {
      let filtered = [...mockCarsState];
      if (type) {
        filtered = filtered.filter((c) => c.listing_type === type);
      }
      return filtered;
    }
  },

  async getCarBySlug(slug: string): Promise<CarItem | null> {
    try {
      const res = await client.get(`/cars/${slug}`);
      return res.data.data;
    } catch {
      const found = mockCarsState.find((c) => c.slug === slug);
      return found || mockCarsState[0];
    }
  },

  async saveCar(carData: Partial<CarItem>): Promise<CarItem> {
    try {
      const res = carData.id
        ? await client.put(`/cars/${carData.id}`, carData)
        : await client.post('/cars', carData);
      return res.data.data;
    } catch {
      if (carData.id) {
        mockCarsState = mockCarsState.map((c) =>
          c.id === carData.id ? { ...c, ...carData } as CarItem : c
        );
        return mockCarsState.find((c) => c.id === carData.id)!;
      } else {
        const newCar: CarItem = {
          id: Date.now(),
          title: carData.title || 'Xe mới cập nhật',
          slug: carData.slug || `xe-${Date.now()}`,
          listing_type: carData.listing_type || 'sale',
          price: carData.price || 1000000000,
          year: carData.year || 2023,
          transmission: carData.transmission || 'Tự động',
          fuel_type: carData.fuel_type || 'Xăng',
          mileage: carData.mileage || '10.000 km',
          color: carData.color || 'Đen',
          location: carData.location || 'Cần Thơ',
          image: carData.image || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
          summary: carData.summary || '',
          description: carData.description || '',
          status: carData.status || 'available',
        };
        mockCarsState.unshift(newCar);
        return newCar;
      }
    }
  },

  async deleteCar(id: number): Promise<boolean> {
    try {
      await client.delete(`/cars/${id}`);
      return true;
    } catch {
      mockCarsState = mockCarsState.filter((c) => c.id !== id);
      return true;
    }
  },

  // POSTS
  async getPosts(): Promise<PostItem[]> {
    try {
      const res = await client.get('/posts');
      return res.data.data;
    } catch {
      return mockPostsState;
    }
  },

  async getPostBySlug(slug: string): Promise<PostItem | null> {
    try {
      const res = await client.get(`/posts/${slug}`);
      return res.data.data;
    } catch {
      const found = mockPostsState.find((p) => p.slug === slug);
      return found || mockPostsState[0];
    }
  },

  async savePost(postData: Partial<PostItem>): Promise<PostItem> {
    try {
      const res = postData.id
        ? await client.put(`/posts/${postData.id}`, postData)
        : await client.post('/posts', postData);
      return res.data.data;
    } catch {
      if (postData.id) {
        mockPostsState = mockPostsState.map((p) =>
          p.id === postData.id ? { ...p, ...postData } as PostItem : p
        );
        return mockPostsState.find((p) => p.id === postData.id)!;
      } else {
        const newPost: PostItem = {
          id: Date.now(),
          title: postData.title || 'Bài viết mới',
          slug: postData.slug || `bai-viet-${Date.now()}`,
          category: postData.category || 'Kinh nghiệm xe',
          summary: postData.summary || '',
          content: postData.content || '',
          image: postData.image || 'https://images.unsplash.com/photo-1580273916550-e323be2ae537',
          published_at: new Date().toISOString(),
          author: postData.author || 'Ban Biên Tập Garage',
        };
        mockPostsState.unshift(newPost);
        return newPost;
      }
    }
  },

  async deletePost(id: number): Promise<boolean> {
    try {
      await client.delete(`/posts/${id}`);
      return true;
    } catch {
      mockPostsState = mockPostsState.filter((p) => p.id !== id);
      return true;
    }
  },

  // BOOKINGS (ADMIN)
  async getBookings(): Promise<BookingItem[]> {
    try {
      const res = await client.get('/bookings');
      return res.data.data;
    } catch {
      return mockBookingsState;
    }
  },

  async createBooking(payload: BookingPayload) {
    const res = await client.post('/bookings', payload);
    if (!res.data?.data?.id) throw new Error('Booking was not acknowledged by the server');
    return {
      ...res.data,
      booking_id: res.data.booking_id || `TNB-${res.data.data.id}`,
    };
  },

  async updateBookingStatus(id: number, status: BookingItem['status']): Promise<BookingItem> {
    try {
      const res = await client.patch(`/bookings/${id}/status`, { status });
      return res.data.data;
    } catch {
      mockBookingsState = mockBookingsState.map((b) =>
        b.id === id ? { ...b, status } : b
      );
      return mockBookingsState.find((b) => b.id === id)!;
    }
  },

  async deleteBooking(id: number): Promise<boolean> {
    try {
      await client.delete(`/bookings/${id}`);
      return true;
    } catch {
      mockBookingsState = mockBookingsState.filter((b) => b.id !== id);
      return true;
    }
  },

  // RESCUE (ADMIN)
  async getRescueRequests(): Promise<RescueItem[]> {
    try {
      const res = await client.get('/rescue');
      return res.data.data;
    } catch {
      return mockRescuesState;
    }
  },

  async createRescueRequest(payload: RescuePayload) {
    try {
      const res = await client.post('/rescue', payload);
      return res.data;
    } catch {
      const newRescue: RescueItem = {
        ...payload,
        id: Date.now(),
        request_id: `RESCUE-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'received',
        created_at: new Date().toISOString(),
      };
      mockRescuesState.unshift(newRescue);
      return {
        status: 'success',
        message: 'Đã nhận yêu cầu cứu hộ! Đội xe đang được điều động khẩn cấp.',
        request_id: newRescue.request_id,
        data: newRescue,
      };
    }
  },

  async updateRescueStatus(id: number, status: RescueItem['status']): Promise<RescueItem> {
    try {
      const res = await client.patch(`/rescue/${id}/status`, { status });
      return res.data.data;
    } catch {
      mockRescuesState = mockRescuesState.map((r) =>
        r.id === id ? { ...r, status } : r
      );
      return mockRescuesState.find((r) => r.id === id)!;
    }
  },

  // DASHBOARD STATS
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const res = await client.get('/admin/stats');
      return res.data.data;
    } catch {
      return {
        total_bookings: mockBookingsState.length,
        pending_bookings: mockBookingsState.filter((b) => b.status === 'pending').length,
        active_rescues: mockRescuesState.filter((r) => r.status !== 'resolved').length,
        total_services: mockServicesState.length,
        total_products: mockProductsState.length,
        total_cars: mockCarsState.length,
        total_posts: mockPostsState.length,
        estimated_revenue: 128500000,
      };
    }
  },
};
