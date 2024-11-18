export type ItemDataType = {
  id: string;
  images: {
    rootPath: string;
    items: Array<string>;
  };
  title: string;
  SKU: string;
  brand: string;
  brandImage: string;
  name: string;
  videoURL: string;
  specList: Array<{
    title: string;
    detail: {
      summarySpec?: Array<{
        title: string;
        description: string;
      }>;
      detailSpec?: Array<{
        title: string;
        specs: Array<{
          title: string;
          description: string;
        }>;
      }>;
      rating?: {
        expert: Array<{
          title: string;
          score: number;
        }>;
        user: string;
      };
      color?: Array<string>;
      type?: Array<string>;
      originalPrice?: string;
      saledPrice?: string;
      salePercentage?: string;
      gift?: string;
      availableLocations?: Array<{
        title: string;
        locations: Array<string>;
      }>;
      warranty?: {
        duration: number;
        unit: string;
      };
    };
  }>;
};
