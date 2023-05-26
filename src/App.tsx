import React, { useState, useEffect, ChangeEvent } from 'react';

// ... (filterProducts, sortProducts, and generatePhotoUrl functions)

type Product = {
  deal_type: string;
  make: string;
  model: string;
  category: string;
  price: number;
  period: string;
  date: string;
  mileage: number;
  photo: string;
  product_id: number;
  photo_ver: string;
};

type Filters = {
  ForRent?: string;
  Mans?: string;
  Model?: string;
  Cats?: string;
  PriceFrom?: number;
  PriceTo?: number;
  Period?: string;
};

type SortOrder =
    | 'decreasingDate'
    | 'increasingDate'
    | 'decreasingPrice'
    | 'increasingPrice'
    | 'decreasingMileage'
    | 'increasingMileage';

const filterProducts = (products: Product[], filters: Filters) => {
  return products.filter((product : Product) => {
    return (
        (!filters.ForRent || product.deal_type === filters.ForRent) &&
        (!filters.Mans || product.make === filters.Mans) &&
        (!filters.Model || product.model === filters.Model) &&
        (!filters.Cats || product.category === filters.Cats) &&
        (!filters.PriceFrom || product.price >= filters.PriceFrom) &&
        (!filters.PriceTo || product.price <= filters.PriceTo) &&
        (!filters.Period || product.period === filters.Period)
    );
  });
};

// Sorting function
const sortProducts = (sortOrder: SortOrder) => {
  return products.sort((a, b) => {
    switch (sortOrder) {
      case 'decreasingDate':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'increasingDate':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'decreasingPrice':
        return b.price - a.price;
      case 'increasingPrice':
        return a.price - b.price;
      case 'decreasingMileage':
        return b.mileage - a.mileage;
      case 'increasingMileage':
        return a.mileage - b.mileage;
      default:
        return 0;
    }
  });
};


// Generate photo URL
const generatePhotoUrl = (product: Product) => {
  return `https://static.my.ge/myauto/photos/${product.photo}/thumbs/${product.product_id}_1.jpg?v=${product.photo_ver}`;
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [sortOrder, setSortOrder] = useState<SortOrder>('decreasingDate');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api2.myauto.ge/ka/products/');
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = filterProducts(filters);
    const sorted = sortProducts(filtered, sortOrder);
    setFilteredProducts(sorted);
  }, [filters, sortOrder, products]);

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as SortOrder);
  };

  return (
      <div>
        <h1>Product Search</h1>
        <div>
          <label htmlFor="ForRent">Deal Type:</label>
          <input type="text" name="ForRent" onChange={handleFilterChange} />
          <label htmlFor="Mans">Make:</label>
          <input type="text" name="Mans" onChange={handleFilterChange} />
          <label htmlFor="Model">Model:</label>
          <input type="text" name="Model" onChange={handleFilterChange} />
          <label htmlFor="Cats">Category:</label>
          <input type="text" name="Cats" onChange={handleFilterChange} />
          <label htmlFor="PriceFrom">Min Price:</label>
          <input type="number" name="PriceFrom" onChange={handleFilterChange} />
          <label htmlFor="PriceTo">Max Price:</label>
          <input type="number" name="PriceTo" onChange={handleFilterChange} />
          <label htmlFor="Period">Period:</label>
          <input type="text" name="Period" onChange={handleFilterChange} />
          <button onClick={() => setFilters(filters)}>Apply Filters</button>
        </div>
        <div>
          <label htmlFor="sortOrder">Sort by:</label>
          <select name="sortOrder" onChange={handleSortChange}>
            <option value="decreasingDate">Date (Newest)</option>
            <option value="increasingDate">Date (Oldest)</option>
            <option value="decreasingPrice">Price (High to Low)</option>
            <option value="increasingPrice">Price (Low to High)</option>
            <option value="decreasingMileage">Mileage (High to Low)</option>
            <option value="increasingMileage">Mileage (Low to High)</option>
          </select>
        </div>
        <table>
          <thead>
          <tr>
            <th>Photo</th>
            <th>Make</th>
            <th>Model</th>
            <th>Category</th>
            <th>Price</th>
            <th>Date</th>
            <th>Mileage</th>
          </tr>
          </thead>
          <tbody>
          {filteredProducts.map((product) => (
              <tr key={product.product_id}>
                <td>
                  <img src={generatePhotoUrl(product)} alt="Product" />
                </td>
                <td>{product.make}</td>
                <td>{product.model}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.date}</td>
                <td>{product.mileage}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default App;
