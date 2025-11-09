export interface MotorcycleBrand {
  id: string;
  name: string;
  models: MotorcycleModel[];
}

export interface MotorcycleModel {
  id: string;
  name: string;
  brandId: string;
  years: MotorcycleYear[];
}

export interface MotorcycleYear {
  year: number;
  images: MotorcycleImage[];
}

export interface MotorcycleImage {
  id: string;
  url: string;
  localPath?: string;
  title: string;
  description?: string;
  modelId: string;
  year: number;
}

export interface SearchResult {
  type: "brand" | "model" | "year";
  id: string;
  name: string;
  subtitle?: string;
  data: MotorcycleBrand | MotorcycleModel | MotorcycleYear;
}

export type RootStackParamList = {
  Home: undefined;
  ImageViewer: { image: MotorcycleImage };
  Settings: undefined;
};
