export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  bio?: string;
  role: 'admin' | 'user';
  totalRuns?: number;
  favoritePeak?: string;
  verticalM?: string;
}

export interface Post {
  id: string;
  authorUid: string;
  authorName: string;
  authorPhoto?: string;
  content: string;
  createdAt: any; // Firestore Timestamp
  likesCount: number;
}

export interface Resort {
  id: string;
  name: string;
  country: string;
  region?: string;
  image: string;
  elevation: number;
  peakAlt: string;
  rating: number;
  snowDepth: string;
  weatherTemp: number;
  weatherStatus: 'Sunny' | 'Cloudy' | 'Snowy' | 'Storm';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  amenities: string[];
  status: 'Open' | 'Closed' | 'Storm Alert' | 'Optimal';
  passesFrom?: string;
  liftsOpen?: string;
  description?: string;
}

export interface Guide {
  id: string;
  name: string;
  title: string;
  experience: string;
  rating: number;
  photo: string;
  bio?: string;
  summits?: string;
  certification?: string;
}

export interface Trip {
  id: string;
  userId: string;
  title: string;
  date: string;
  location: string;
  duration: string;
  status: 'Completed' | 'Upcoming';
  type: 'Glacier' | 'Peak' | 'Nordic';
}
