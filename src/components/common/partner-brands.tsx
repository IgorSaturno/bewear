import Image from "next/image";

interface PartnerBrandsProps {
  title: string;
}

const brands = [
  { name: "Nike", src: "/brands/nike.svg" },
  { name: "Adidas", src: "/brands/adidas.svg" },
  { name: "Puma", src: "/brands/puma.svg" },
  { name: "New Balance", src: "/brands/newbalance.svg" },
  { name: "Converse", src: "/brands/converse.svg" },
  { name: "Polo", src: "/brands/polo.svg" },
  { name: "Zara", src: "/brands/zara.svg" },
  { name: "Nike", src: "/brands/nike.svg" },
  { name: "Adidas", src: "/brands/adidas.svg" },
  { name: "Puma", src: "/brands/puma.svg" },
  { name: "New Balance", src: "/brands/newbalance.svg" },
  { name: "Converse", src: "/brands/converse.svg" },
  { name: "Polo", src: "/brands/polo.svg" },
  { name: "Zara", src: "/brands/zara.svg" },
  { name: "Nike", src: "/brands/nike.svg" },
  { name: "Adidas", src: "/brands/adidas.svg" },
  { name: "Puma", src: "/brands/puma.svg" },
  { name: "New Balance", src: "/brands/newbalance.svg" },
  { name: "Converse", src: "/brands/converse.svg" },
  { name: "Polo", src: "/brands/polo.svg" },
  { name: "Zara", src: "/brands/zara.svg" },
];

export const PartnerBrands = ({ title }: PartnerBrandsProps) => {
  return (
    <div className="space-y-6 pb-6">
      <h3 className="px-5 font-semibold lg:px-10">{title}</h3>

      <div className="relative overflow-hidden">
        <div className="animate-scroll flex gap-6">
          {/* Primeira instância das marcas */}
          {brands.map((brand, index) => (
            <div
              key={`${brand.name}-1-${index}`}
              className="flex min-w-24 flex-shrink-0 flex-col items-center gap-2"
            >
              <div className="flex min-h-20 min-w-20 items-center justify-center rounded-3xl border border-gray-200">
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <span className="text-sm font-medium">{brand.name}</span>
            </div>
          ))}
          {/* Segunda instância das marcas para continuidade */}
          {brands.map((brand, index) => (
            <div
              key={`${brand.name}-2-${index}`}
              className="flex min-w-24 flex-shrink-0 flex-col items-center gap-2"
            >
              <div className="flex min-h-20 min-w-20 items-center justify-center rounded-3xl border border-gray-200">
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <span className="text-sm font-medium">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
