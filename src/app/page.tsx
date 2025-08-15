import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { PartnerBrands } from "@/components/common/partner-brands";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <div>
      <Header />
      <div className="container mx-auto space-y-6">
        <div className="px-5 lg:px-10">
          <Image
            src="/banner-01.svg"
            alt="Leve uma vida com estilo."
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full lg:hidden"
          />
          <Image
            src="/banner-desktop-01.svg"
            alt="Leve uma vida com estilo."
            width={0}
            height={0}
            sizes="100vw"
            className="hidden h-auto w-full lg:block"
          />
        </div>
        <PartnerBrands title="Marcas parceiras" />

        <ProductList products={products} title="Mais vendidos" />

        <div className="px-5 md:hidden">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5 lg:px-10">
          {/* Mobile: mostra apenas no mobile */}
          <Image
            src="/banner-02.svg"
            alt="Leve uma vida com estilo."
            width={0}
            height={0}
            sizes="100vw"
            className="block h-auto w-full lg:hidden"
          />
        </div>
        {/* Desktop: mostra apenas no desktop */}
        <div className="hidden px-5 lg:block lg:px-10">
          <div className="mx-auto grid max-w-[1328px] grid-cols-[1fr_1.6fr] gap-6">
            <div className="grid grid-rows-2 gap-6">
              <Image
                src="/banner-desktop-03.svg"
                alt="Leve uma vida com estilo."
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full rounded-xl"
              />
              <Image
                src="/banner-desktop-04.svg"
                alt="Leve uma vida com estilo."
                width={0}
                height={307}
                sizes="100vw"
                className="h-auto w-full rounded-xl"
              />
            </div>
            <Image
              src="/banner-desktop-02.svg"
              alt="Leve uma vida com estilo."
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full rounded-xl"
            />
          </div>
        </div>
        <div className="block lg:hidden">
          <ProductList products={newlyCreatedProducts} title="Novidades" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
