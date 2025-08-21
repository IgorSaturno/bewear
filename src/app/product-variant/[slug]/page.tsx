import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import ProductList from "@/components/common/product-list";
import MainLayout from "@/components/layouts/main-layout";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Left Column - Product Images */}
          <div className="lg:col-span-3">
            <div className="flex flex-col gap-4 lg:flex-row">
              {/* Thumbnail Gallery */}
              <div className="flex gap-2 lg:flex-col">
                {productVariant.product.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 border-transparent hover:border-gray-300"
                  >
                    <Image
                      src={variant.imageUrl}
                      alt={variant.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Main Product Image */}
              <div className="flex-1">
                <Image
                  src={productVariant.imageUrl}
                  alt={productVariant.name}
                  width={600}
                  height={800}
                  className="h-auto w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Product Title and Price */}
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">
                  {productVariant.product.name}
                </h1>
                <h2 className="text-muted-foreground text-lg">
                  {productVariant.name}
                </h2>
                <p className="text-2xl font-bold">
                  {formatCentsToBRL(productVariant.priceInCents)}
                </p>
              </div>

              {/* Variant Selector */}
              <div>
                <VariantSelector
                  selectedVariantSlug={productVariant.slug}
                  variants={productVariant.product.variants}
                />
              </div>

              {/* Product Actions */}
              <div>
                <ProductActions productVariantId={productVariant.id} />
              </div>

              {/* Product Description */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold">Descrição</h3>
                <p className="text-muted-foreground text-sm">
                  {productVariant.product.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <ProductList
            title="Você também pode gostar"
            products={likelyProducts}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductVariantPage;
