import { Fragment } from "react/jsx-runtime"
import { useProducts } from "../services/queries"
import { useState } from "react"

const Products = () => {

  const [selectedProductId, setSelectedProductId] = useState<number|null>(null)

  const productsQuery = useProducts()

  return (
    <>
      <div>Infinite Scroll Products</div>
      {/* NOTE: "useInfiniteQuery" returns a grouped array hence the double map function. */}
      {productsQuery.data?.pages.map((group, index) => {
        console.log("Grou Man", group);
        <Fragment key={index}>
        {group.map((product) => (
          <Fragment key={product.id}>
            <button 
              onClick={() => setSelectedProductId(product.id)}
            >
              {product.name}
            </button>
            <br />
            </Fragment>
        ))}
        </Fragment>
      })}
      <br />
      <div>
        <button 
          onClick={() => productsQuery.fetchNextPage()} 
          disabled={!productsQuery.hasNextPage || productsQuery.isFetchingNextPage}
        >
          { productsQuery.isFetchingNextPage ? 'Loading more...' : productsQuery.hasNextPage ? 'Load more' : 'Nothing more to load' }
        </button>
      </div>
    </>
  ) 
}

export default Products