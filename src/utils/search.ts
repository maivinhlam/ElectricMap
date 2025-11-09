import { vietnamMotorcycleBrands } from "../data/motorcycleData";
import { SearchResult, MotorcycleBrand, MotorcycleModel } from "../types";

export const searchMotorcycles = (query: string): SearchResult[] => {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];
  const searchTerm = query.toLowerCase();

  vietnamMotorcycleBrands.forEach((brand) => {
    // Search in brand names
    if (brand.name.toLowerCase().includes(searchTerm)) {
      results.push({
        type: "brand",
        id: brand.id,
        name: brand.name,
        subtitle: `${brand.models.length} models`,
        data: brand,
      });
    }

    // Search in model names
    brand.models.forEach((model) => {
      if (model.name.toLowerCase().includes(searchTerm)) {
        results.push({
          type: "model",
          id: model.id,
          name: model.name,
          subtitle: `${brand.name} - ${model.years.length} years`,
          data: model,
        });
      }

      // Search in years
      model.years.forEach((yearData) => {
        const yearString = yearData.year.toString();
        if (yearString.includes(searchTerm)) {
          results.push({
            type: "year",
            id: `${model.id}-${yearData.year}`,
            name: `${brand.name} ${model.name} ${yearData.year}`,
            subtitle: `${yearData.images.length} images`,
            data: yearData,
          });
        }
      });
    });
  });

  return results.slice(0, 10); // Limit to 10 results
};

export const getAllImages = () => {
  const allImages: any[] = [];

  vietnamMotorcycleBrands.forEach((brand) => {
    brand.models.forEach((model) => {
      model.years.forEach((yearData) => {
        allImages.push(...yearData.images);
      });
    });
  });

  return allImages;
};

export const getImagesByBrand = (brandId: string) => {
  const brand = vietnamMotorcycleBrands.find((b) => b.id === brandId);
  if (!brand) return [];

  const images: any[] = [];
  brand.models.forEach((model) => {
    model.years.forEach((yearData) => {
      images.push(...yearData.images);
    });
  });

  return images;
};

export const getImagesByModel = (modelId: string) => {
  const images: any[] = [];

  vietnamMotorcycleBrands.forEach((brand) => {
    const model = brand.models.find((m) => m.id === modelId);
    if (model) {
      model.years.forEach((yearData) => {
        images.push(...yearData.images);
      });
    }
  });

  return images;
};

export const getImagesByYear = (modelId: string, year: number) => {
  let images: any[] = [];

  vietnamMotorcycleBrands.forEach((brand) => {
    const model = brand.models.find((m) => m.id === modelId);
    if (model) {
      const yearData = model.years.find((y) => y.year === year);
      if (yearData) {
        images = yearData.images;
      }
    }
  });

  return images;
};
