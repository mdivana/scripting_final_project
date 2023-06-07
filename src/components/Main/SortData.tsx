import React, { useState, useEffect, ChangeEvent } from 'react';

interface SortDataProps {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

const SortData: React.FC<SortDataProps> = ({ data, setData }) => {
  const [val, setVal] = useState<string | null>(null);

  useEffect(() => {
    handleSort(val); // Reapply the sorting whenever the data changes
  }, [data]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setVal(value);
    handleSort(value);
  };

  const handleSort = (value: string | null) => {
    switch (value) {
      case '1':
        sortByDecreaseDate();
        break;
      case '2':
        sortByIncreaseDate();
        break;
      case '3':
        sortByDecreasePrice();
        break;
      case '4':
        sortByIncreasePrice();
        break;
      case '5':
        sortByDecreaseMilage();
        break;
      case '6':
        sortByIncreaseMilage();
        break;
      default:
        break;
    }
  };

  const sortByDecreaseDate = () => {
    const sortedData = [...data].sort(
      (a, b) => (new Date(b.order_date) as any) - (new Date(a.order_date) as any)
    );
    setData(sortedData);
  };

  const sortByIncreaseDate = () => {
    const sortedData = [...data].sort(
      (a, b) => (new Date(a.order_date) as any) - (new Date(b.order_date) as any)
    );
    setData(sortedData);
  };

  const sortByDecreasePrice = () => {
    const sortedData = [...data].sort((a, b) => (b.price_usd as any) - (a.price_usd as any));
    setData(sortedData);
  };

  const sortByIncreasePrice = () => {
    const sortedData = [...data].sort((a, b) => (a.price_usd as any) - (b.price_usd as any));
    setData(sortedData);
  };

  const sortByDecreaseMilage = () => {
    const sortedData = [...data].sort((a, b) => (b.car_run_km as any) - (a.car_run_km as any));
    setData(sortedData);
  };

  const sortByIncreaseMilage = () => {
    const sortedData = [...data].sort((a, b) => (a.car_run_km as any) - (b.car_run_km as any));
    setData(sortedData);
  };

  return (
    <div className='sort-data'>
      <p className="gray">176047 განცხადება</p>
      <select className='select' onChange={handleChange}>
        <option value="">-- აირჩიე --</option>
        <option value="1">თარიღი კლებადი</option>
        <option value="2">თარიღი ზრდადი</option>
        <option value="3">ფასი კლებადი</option>
        <option value="4">ფასი ზრდადი</option>
        <option value="5">გარბენი კლებადი</option>
        <option value="6">გარბენი ზრდადი</option>
      </select>
    </div>
  );
};

export default SortData;
