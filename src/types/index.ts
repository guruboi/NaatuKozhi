export interface Farmer {
  id: number
  name: string
  village: string
  district: string
  experience: string
  quote: string
  rating: number
  image: string
  videoThumbnail: string
  speciality: string
  phone?: string
  farmSize?: string
  chickensCount?: number
}

export interface FarmLocation {
  name: string
  address: string
  phone: string
  type: 'Main Processing Center' | 'Collection Point' | 'Distribution Hub'
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface ProcessingCenter {
  name: string
  address: string
  phone: string
  certifications: string[]
  capacity?: string
  operatingHours?: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  unit: string
  image: string
  availability: boolean
  farmerId?: number
  processingDate?: string
}

export interface Order {
  id: string
  customerName: string
  customerPhone: string
  customerAddress: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'confirmed' | 'processing' | 'delivered' | 'cancelled'
  orderDate: string
  deliveryDate?: string
}

export interface OrderItem {
  productId: number
  quantity: number
  price: number
  farmerId?: number
}

export interface ContactInfo {
  customerSupport: string[]
  email: string[]
  operatingHours: {
    weekdays: string
    sunday: string
  }
  socialMedia: {
    instagram?: string
    facebook?: string
    twitter?: string
    youtube?: string
  }
}

export interface QualityAssurance {
  certifications: string[]
  standards: string[]
  auditFrequency: string
  traceability: boolean
}

export interface DeliveryZone {
  name: string
  districts: string[]
  deliveryTime: string
  minimumOrder: number
  deliveryCharge: number
}

// PWA Types
export interface PWAInstallPrompt {
  prompt: () => Promise<void>
  outcome: Promise<{outcome: 'accepted' | 'dismissed'}>
}

// Component Props Types
export interface HeaderProps {
  onMenuToggle?: () => void
}

export interface HeroProps {
  onOrderClick?: () => void
  onLearnMoreClick?: () => void
}

export interface AboutProps {
  features?: Array<{
    icon: React.ComponentType<any>
    title: string
    description: string
  }>
}

export interface FarmerTestimonialsProps {
  farmers?: Farmer[]
  onFarmerSelect?: (farmer: Farmer) => void
}

export interface FooterProps {
  farmLocations?: FarmLocation[]
  processingCenters?: ProcessingCenter[]
  contactInfo?: ContactInfo
}