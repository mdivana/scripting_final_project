import React, { useState, useEffect } from 'react';
import SearchType from './SearchType';
import carImgUrl from "../../assets/images/car.svg";
import tractorImgUrl from "../../assets/images/tractor.svg";
import motoImgUrl from "../../assets/images/moto.svg";

export default function Aside(props: { sort: any; setSort: any; data: any; setData: any; }) {
  const { sort, setSort, data, setData } = props;
  const [type, setType] = useState<number>(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [manufacturer, setManufacturer] = useState<any[]>([]);

  useEffect(()=>{
      fetch(`https://api2.myauto.ge/ka/products?TypeID=0&ForRent=${sort['ForRent']}&Mans=${sort['Mans']}&Cats=${sort['Cats']}&PriceFrom=${sort['PriceFrom']}&PriceTo=${sort['PriceTo']}&SortOrder=&CurrencyID=3&MileageType=1&Period=${sort['period']}&SortOrder=${sort['SortOrder']}&Page=${sort['page']}`)
          .then(res => res.json())
          .then((data) => setData(data.data.items))
          .catch((error) => {
              console.error(error)
          })
  },[sort['SortOrder'],sort['period']])
  useEffect(() => {
    fetch('https://api2.myauto.ge/ka/cats/get')
      .then(res => res.json())
      .then((data) => {
        data.data.map((item: { category_type: number; title: string; category_id: string; }) => {
          if (type === item.category_type) {
            setCategories(prevCategories => {
              return ([...prevCategories, { name: item.title, id: item.category_id }]);
            });
          }
        });
      });
  }, [type]);

  useEffect(() => {
    fetch('https://static.my.ge/myauto/js/mans.json')
      .then(res => res.json())
      .then((data) => {
        data.map((item: { is_car: string; is_spec: string; is_moto: string; man_name: string; man_id: string}) => {
          if ('1' === getManufacturersList(type, item)) {
            setManufacturer(prevMan => {
              return ([...prevMan, { name: item.man_name, id: item.man_id}]);
            });
          }
        });
      });
  }, [type]);

  function getManufacturersList(id: number, item: { is_car: string; is_spec: string; is_moto: string; }): string {
    const s: { [key: number]: string } = {
      0: item.is_car,
      1: item.is_spec,
      2: item.is_moto,
    };
    return s[id];
  }

  const categoriesList = categories.map((item, index) => {
    return <option key={index} value={item.id}>{item.name}</option>;
  });

  const manufacturersList = manufacturer.map((item, index) => {
    return <option key={index} value={item.id}>{item.name}</option>;
  });

    function handleChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;
        const arr = ['ForRent', 'Mans', 'Cats', 'PriceFrom', 'PriceTo']

        setSort((prevSort: any) => ({
            ...prevSort,
            [name]: arr.includes(value) ? null : value
        }));
        console.log()
    }


    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault()
        console.log(sort['Mans'])
            fetch(`https://api2.myauto.ge/ka/products?TypeID=0&ForRent=${sort['ForRent']}&Mans=${sort['Mans']}&Cats=${sort['Cats']}&PriceFrom=${sort['PriceFrom']}&PriceTo=${sort['PriceTo']}&SortOrder=&CurrencyID=3&MileageType=1&Period=${sort['period']}&SortOrder=${sort['SortOrder']}&Page=${sort['page']}`)
                .then(res => res.json())
                .then((data) => setData(data.data.items))
                .catch((error) => {
                    console.error(error)
                })
    }

return (
        <div className='aside'>
            <form onSubmit={handleSubmit} className='form'>
                <div className="search-type">
                    <img
                        src={carImgUrl}
                        alt="car"
                        className='car-type'/>
                    <img
                        src={tractorImgUrl}
                        alt="tractor"
                        className='tractor-type'/>
                    <img
                        src={motoImgUrl}
                        alt="moto"
                        className='moto-type'/>
                </div>
                <div className="form-filter">
                    <div className="form-select-container">
                        <div className="form-group">
                            <p>გარიგების ტიპი</p>
                            <select
                                className='select'
                                name='ForRent'
                                onChange={handleChange}
                            >
                                <option value='ForRent'>გარიგების ტიპი</option>
                                <option value='0'>იყიდება</option>
                                <option value='1'>ქირავდება</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <p>მწარმოებელი</p>
                            <select
                                className='select'
                                name='Mans'
                                onChange={handleChange}
                            >
                                <option value='Mans'>მწარმოებელი</option>
                                {manufacturersList}
                            </select>
                        </div>

                        <div className="form-group">
                            <p>კატეგორია</p>
                            <select
                                className='select'
                                name='Cats'
                                onChange={handleChange}
                            >
                                <option value='Cats'>კატეგორია</option>
                                {categoriesList}
                            </select>
                        </div>
                    </div>

                    <hr />

                    <div className="form-price-container">
                        <p>ფასი</p>
                        <div className='price-div'>
                            <input
                                id="from"
                                type="number"
                                placeholder="From"
                                name="PriceFrom"
                                min='0'
                                onChange={handleChange}
                            />
                            -
                            <input
                                id="to"
                                type="number"
                                placeholder="To"
                                name="PriceTo"
                                min='1'
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="btn-div">
                    <button className='btn'>მოძებნე</button>
                </div>
            </form>
        </div>
    );
}
