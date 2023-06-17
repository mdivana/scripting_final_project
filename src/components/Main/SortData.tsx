import React, { useState, useEffect, ChangeEvent } from 'react';

interface SortDataProps {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  sort: any;
  setSort: React.Dispatch<React.SetStateAction<any>>;
}

const SortData: React.FC<SortDataProps> = ({ data, setData , sort , setSort}) => {

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value,name } = event.target;
    const changed = 'SortOrder' === name? "SortOrder":'period'
    setSort((prevSort: any) => {
      return {...prevSort, [changed] : value}
    })
    console.log(sort)
  };


  return (
    <div className='sort-data'>
      <p className="gray">176047 განცხადება</p>
      <div>
         <select className='select' name='period' onChange={handleChange}>
           <option value="">-- აირჩიე --</option>
           <option value="1h">1 საათი</option>
           <option value="2h">2 საათი</option>
           <option value="3h">3 საათი</option>
           <option value="1d">1 დღე</option>
           <option value="2d">2 დღე</option>
           <option value="3d">3 დღე</option>
           <option value="1w">1 კვირა</option>
           <option value="2w">2 კვირა</option>
           <option value="3w">3 კვირა</option>
         </select>
         <select className='select' name='SortOrder' onChange={handleChange}>
           <option value="">-- აირჩიე --</option>
           <option value="1">თარიღი კლებადი</option>
           <option value="2">თარიღი ზრდადი</option>
           <option value="3">ფასი კლებადი</option>
           <option value="4">ფასი ზრდადი</option>
           <option value="5">გარბენი კლებადი</option>
           <option value="6">გარბენი ზრდადი</option>
         </select>
      </div>
    </div>
  );
};

export default SortData;