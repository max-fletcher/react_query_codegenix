import { useProducts, useSingleProduct } from "../services/queries"
import { Fragment, useState } from "react"

const Products = () => {

  const [selectedProductId, setSelectedProductId] = useState<number|null>(null)

  const productsQuery = useProducts()
  const productQuery = useSingleProduct(selectedProductId)

  return (
    <>
      <div>Infinite Scroll Products</div>
      {/* NOTE: "useInfiniteQuery" returns a grouped array hence the double map function. */}
      {productsQuery.data?.pages.map((group, i) => (
        <Fragment key={i}>
          {group.map((product) => (
            <Fragment key={product.id}>
              <button onClick={() => setSelectedProductId(product.id)}>
                {product.name}
              </button>
              <br />
            </Fragment>
          ))}
        </Fragment>
      ))}
      <br />
      <div>
        <button 
          onClick={() => productsQuery.fetchNextPage()} 
          disabled={!productsQuery.hasNextPage || productsQuery.isFetchingNextPage}
        >
          { productsQuery.isFetchingNextPage ? 'Loading more...' : productsQuery.hasNextPage ? 'Load more' : 'Nothing more to load' }
        </button>
      </div>
      {/* NOTE: For showing a product when clicking a product button */}
      <div>Selected Product:</div>
      {JSON.stringify(productQuery.data)}
    </>
  ) 
}

export default Products