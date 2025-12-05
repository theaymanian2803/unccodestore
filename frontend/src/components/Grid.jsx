import ProductGrid from './ProductGrid'
import { useGetProductsQuery } from './../slices/productSlice'

function Grid() {
  const { data: products, isLoading, error } = useGetProductsQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className=" mt-8 p-7 grid grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductGrid key={product._id} product={product} />
      ))}
    </div>
  )
}

export default Grid
