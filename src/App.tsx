import React, { useEffect, useState } from 'react';

interface Car {
  car_id: number;
  car_model: string;
  price: number;
  // Add other properties of a car
}

interface Category {
  id: number;
  name: string;
}

interface Manufacturer {
  id: number;
  name: string;
}

interface Model {
  id: number;
  name: string;
}

interface SearchParams {
  dealType?: number;
  make?: string;
  model?: string;
  category?: string;
  priceFrom?: number;
  priceTo?: number;
  period?: string;
  sortOrder?: number;
  page?: number;
}

const App: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  useEffect(() => {
    fetchCategories();
    fetchManufacturers();
  }, []);

  useEffect(() => {
    fetchData(searchParams);
  }, [searchParams]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://api2.myauto.ge/ka/cats/get');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setError('Error occurred while fetching categories.');
    }
  };

  const fetchManufacturers = async () => {
    try {
      const response = await fetch('https://static.my.ge/myauto/js/mans.json');
      const data = await response.json();
      setManufacturers(data);
    } catch (error) {
      setError('Error occurred while fetching manufacturers.');
    }
  };

  const fetchModels = async (manufacturerId: number) => {
    try {
      const response = await fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${manufacturerId}`);
      const data = await response.json();
      setModels(data);
    } catch (error) {
      setError('Error occurred while fetching models.');
    }
  };

  const fetchData = async (params?: SearchParams) => {
    try {
      setLoading(true);
      const endpoint = 'https://api2.myauto.ge/ka/products/';
      let url = new URL(endpoint);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data && Array.isArray(data.data.items)) {
          setCars(data.data.items);
        } else {
          setCars([]);
        }
      }
      setLoading(false);
    } catch (error) {
      setError('Error occurred while fetching data.');
      setLoading(false);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setSearchParams((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleMakeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSearchParams((prevState) => ({
      ...prevState,
      make: value,
      model: undefined,
    }));
    if (value) {
      const [manufacturerId] = value.split('.');
      fetchModels(Number(manufacturerId));
    } else {
      setModels([]);
    }
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSearchParams((prevState) => ({ ...prevState, model: value }));
  };

  return (
      <div>
        <h1>Car Search</h1>
        {/* Filter options */}
        <div>
          <label>Deal Type:</label>
          <select name="dealType" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="0">For Rent</option>
            <option value="1">For Sale</option>
          </select>

          <label>Make:</label>
          <select name="make" onChange={handleMakeChange}>
            <option value="">All</option>
            {manufacturers.map((manufacturer) => (
                <option key={manufacturer.id} value={`${manufacturer.id}`}>
                  {manufacturer.name}
                </option>
            ))}
          </select>

          <label>Model:</label>
          <select name="model" onChange={handleModelChange}>
            <option value="">All</option>
            {models.map((model) => (
                <option key={model.id} value={`${searchParams.make}.${model.id}`}>
                  {model.name}
                </option>
            ))}
          </select>

          {/* Add other filter options based on the provided search parameters */}
        </div>

        {/* Car list */}
        {loading ? (
            <p>Loading...</p>
        ) : error ? (
            <p>Error: {error}</p>
        ) : (
            <ul>
              {cars.map((car) => (
                  <li key={car.car_id}>
                    <h2>{car.car_model}</h2>
                    <p>Price: {car.price}</p>
                    {/* Display other relevant car information */}
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
};

export default App;
