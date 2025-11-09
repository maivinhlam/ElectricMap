import { MotorcycleBrand } from "../types";

export const vietnamMotorcycleBrands: MotorcycleBrand[] = [
  {
    id: "honda",
    name: "Honda",
    models: [
      {
        id: "honda-sh",
        name: "SH",
        brandId: "honda",
        years: [
          {
            year: 2024,
            images: [
              {
                id: "sh-2024-1",
                url: "https://example.com/honda-sh-2024-1.jpg",
                title: "Honda SH 2024 - Red",
                modelId: "honda-sh",
                year: 2024,
              },
              {
                id: "sh-2024-2",
                url: "https://example.com/honda-sh-2024-2.jpg",
                title: "Honda SH 2024 - White",
                modelId: "honda-sh",
                year: 2024,
              },
            ],
          },
          {
            year: 2023,
            images: [
              {
                id: "sh-2023-1",
                url: "https://example.com/honda-sh-2023-1.jpg",
                title: "Honda SH 2023 - Black",
                modelId: "honda-sh",
                year: 2023,
              },
            ],
          },
        ],
      },
      {
        id: "honda-winner",
        name: "Winner X",
        brandId: "honda",
        years: [
          {
            year: 2024,
            images: [
              {
                id: "winner-2024-1",
                url: "https://example.com/honda-winner-2024-1.jpg",
                title: "Honda Winner X 2024 - Blue",
                modelId: "honda-winner",
                year: 2024,
              },
            ],
          },
          {
            year: 2023,
            images: [
              {
                id: "winner-2023-1",
                url: "https://example.com/honda-winner-2023-1.jpg",
                title: "Honda Winner X 2023 - Red",
                modelId: "honda-winner",
                year: 2023,
              },
            ],
          },
        ],
      },
      {
        id: "honda-blade",
        name: "Blade",
        brandId: "honda",
        years: [
          {
            year: 2024,
            images: [
              {
                id: "blade-2024-1",
                url: "https://example.com/honda-blade-2024-1.jpg",
                title: "Honda Blade 2024 - Silver",
                modelId: "honda-blade",
                year: 2024,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "yamaha",
    name: "Yamaha",
    models: [
      {
        id: "yamaha-sirius",
        name: "Sirius",
        brandId: "yamaha",
        years: [
          {
            year: 2024,
            images: [
              {
                id: "sirius-2024-1",
                url: "https://example.com/yamaha-sirius-2024-1.jpg",
                title: "Yamaha Sirius 2024 - Blue",
                modelId: "yamaha-sirius",
                year: 2024,
              },
              {
                id: "sirius-2024-2",
                url: "https://example.com/yamaha-sirius-2024-2.jpg",
                title: "Yamaha Sirius 2024 - Red",
                modelId: "yamaha-sirius",
                year: 2024,
              },
            ],
          },
          {
            year: 2023,
            images: [
              {
                id: "sirius-2023-1",
                url: "https://example.com/yamaha-sirius-2023-1.jpg",
                title: "Yamaha Sirius 2023 - Black",
                modelId: "yamaha-sirius",
                year: 2023,
              },
            ],
          },
        ],
      },
      {
        id: "yamaha-exciter",
        name: "Exciter",
        brandId: "yamaha",
        years: [
          {
            year: 2024,
            images: [
              {
                id: "exciter-2024-1",
                url: "https://example.com/yamaha-exciter-2024-1.jpg",
                title: "Yamaha Exciter 2024 - Blue",
                modelId: "yamaha-exciter",
                year: 2024,
              },
            ],
          },
        ],
      },
      {
        id: "yamaha-janus",
        name: "Janus",
        brandId: "yamaha",
        years: [
          {
            year: 2024,
            images: [
              {
                id: "janus-2024-1",
                url: "https://example.com/yamaha-janus-2024-1.jpg",
                title: "Yamaha Janus 2024 - Pink",
                modelId: "yamaha-janus",
                year: 2024,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "suzuki",
    name: "Suzuki",
    models: [
      {
        id: "suzuki-satria",
        name: "Satria F150",
        brandId: "suzuki",
        years: [
          {
            year: 2024,
            images: [
              {
                id: "satria-2024-1",
                url: "https://example.com/suzuki-satria-2024-1.jpg",
                title: "Suzuki Satria F150 2024 - Yellow",
                modelId: "suzuki-satria",
                year: 2024,
              },
            ],
          },
        ],
      },
      {
        id: "suzuki-raider",
        name: "Raider R150",
        brandId: "suzuki",
        years: [
          {
            year: 2024,
            images: [
              {
                id: "raider-2024-1",
                url: "https://example.com/suzuki-raider-2024-1.jpg",
                title: "Suzuki Raider R150 2024 - Black",
                modelId: "suzuki-raider",
                year: 2024,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "sym",
    name: "SYM",
    models: [
      {
        id: "sym-attila",
        name: "Attila Elizabeth",
        brandId: "sym",
        years: [
          {
            year: 2024,
            images: [
              {
                id: "attila-2024-1",
                url: "https://example.com/sym-attila-2024-1.jpg",
                title: "SYM Attila Elizabeth 2024 - White",
                modelId: "sym-attila",
                year: 2024,
              },
            ],
          },
        ],
      },
    ],
  },
];
