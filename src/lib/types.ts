export type AppwriteUser = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  accessedAt: string;
  email: string;
  emailVerification: boolean;
  labels: string[];
  mfa: boolean;
  name: string;
  passwordUpdate: string;
  phone: string;
  phoneVerification: boolean;
  prefs: Record<string, string>;
  registration: string;
  status: boolean;
  targets: string[]; // You can specify a more precise type if you know the shape of objects in targets
};

export interface ProductCategory {
  $collectionId?: string;
  $createdAt?: string;    // ISO date string
  $databaseId?: string;
  $id?: string;
  $permissions?: String[];   // Adjust type if permissions are structured
  $updatedAt?: string;    // ISO date string
  title: string;
}
export interface Product {
        title: string;
        description: string;
        price: number;
        category: string;
        image: string;
        id: string;
}