import React from 'react'
import Image from 'next/image'
import { ProductListProps } from '@/hooks/hooks'

const ProductList: React.FC<ProductListProps> = ({
  products,
  handleSaveClick,
}) => {
  return (
    <div className="mt-6 max-w-5xl grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-10">
      {products.map((product) => (
        <div
          key={product.name}
          className="py-2 px-2 group relative border rounded-lg shadow-md"
        >
          <div className="w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
            <Image
              src={product.imageSrc}
              alt={product.imageAlt}
              width={300}
              height={300}
              layout="fixed"
              className="h-full object-contain object-center cursor-pointer"
              onClick={() => handleSaveClick(product)}
            />
          </div>
          <div className="font-bold text-center">{product.title}</div>

          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <p>
                  <span aria-hidden="true" className="inset-0" />
                  {product.name}
                </p>
              </h3>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {product.price}
              </p>
              <p
                onClick={() => handleSaveClick(product)}
                className="mt-1 text-sm font-semibold 
                    text-white text-center
                    btn-color1 rounded-lg
                    cursor-pointer"
              >
                {product.save}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList
