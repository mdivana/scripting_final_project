import React, { useState, useEffect, ChangeEvent, FormEvent, SetStateAction } from 'react';
import SearchType from './SearchType';


export default function Aside(props: { sort: any; setSort: any; data: any; setData: any; }) {
  const { sort, setSort, data, setData } = props;
  const [type, setType] = useState<number>(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [manufacturer, setManufacturer] = useState<any[]>([]);
  const [initialData, setInitialData] = useState<any[]>([]);

    useEffect(() => {
        fetch('https://api2.myauto.ge/ka/products/')
            .then((res) => res.json())
            .then((data) => {
                setInitialData(data.data.items);

                fetch('https://static.my.ge/myauto/js/mans.json')
                    .then((res) => res.json())
                    .then((brands) => {
                        console.log(initialData)
                        setInitialData((prevInitData) =>
                            prevInitData.map((item) => {
                                const foundBrand = brands.find((obj: { man_id: string; }) => obj.man_id === String(item.man_id));
                                return { ...item, brand_name: foundBrand.man_name };
                            })
                        );
                        console.log(initialData)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

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
        data.map((item: { is_car: string; is_spec: string; is_moto: string; man_name: string; }) => {
          if ('1' === getMnufacterersList(type, item)) {
            setManufacturer(prevMan => {
              return ([...prevMan, item.man_name]);
            });
          }
        });
      });
  }, [type]);

  function getMnufacterersList(id: number, item: { is_car: string; is_spec: string; is_moto: string; }): string {
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

  const manufacterersList = manufacturer.map((item, index) => {
    return <option key={index} value={item}>{item}</option>;
  });

    function handleChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;
        const arr = ['deal_type', 'manufacturer', 'category', 'price_from', 'price_to']

        setSort((prevSort: any) => ({
            ...prevSort,
            [name]: arr.includes(value) ? null : value
        }));
    }


    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault()
        const updatedData = initialData.filter((item) => {
            const isDealTypeMatch = sort['deal_type'] === null || String(item.for_rent) === sort['deal_type'];
            const isManufacturerMatch = sort['manufacturer'] === null || item.brand_name === sort['manufacturer'];
            const isCategoryMatch = sort['category'] === null || item.category_id === Number(sort['category']);

            // Filter based on price_from and price_to
            if (sort['price_from'] === "" && sort['price_to'] === "") {
                return isDealTypeMatch && isManufacturerMatch && isCategoryMatch;
            }

            if (sort['price_from'] !== null && sort['price_to'] !== null && sort['price_from'] !== "" && sort['price_to'] !== "") {
                const isPriceRangeMatch = item.price_value >= Number(sort['price_from']) && item.price_value <= Number(sort['price_to']);
                return isDealTypeMatch && isManufacturerMatch && isCategoryMatch && isPriceRangeMatch;
            }

            // Filter based on price_from only
            if (sort['price_from'] !== null && sort['price_from'] !== "") {
                const isPriceFromMatch = item.price_value >= Number(sort['price_from']);
                return isDealTypeMatch && isManufacturerMatch && isCategoryMatch && isPriceFromMatch;
            }

            // Filter based on price_to only
            if (sort['price_to'] !== null && sort['price_to'] !== "") {
                const isPriceToMatch = item.price_value <= Number(sort['price_to']);
                return isDealTypeMatch && isManufacturerMatch && isCategoryMatch && isPriceToMatch;
            }

            // No price filtering, return true to include the item
            return isDealTypeMatch && isManufacturerMatch && isCategoryMatch;
        });
        setData(updatedData)
    }

return (
        <div className='aside'>
            <SearchType />
            <form onSubmit={handleSubmit} className='form'>
                <div className="form-filter">
                    <div className="form-select-container">
                        <div className="form-group">
                            <p>გარიგების ტიპი</p>
                            <select
                                className='select'
                                name='deal_type'
                                onChange={handleChange}
                            >
                                <option value='deal_type'>გარიგების ტიპი</option>
                                <option value='false'>იყიდება</option>
                                <option value='true'>ქირავდება</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <p>მწარმოებელი</p>
                            <select
                                className='select'
                                name='manufacturer'
                                onChange={handleChange}
                            >
                                <option value='manufacturer'>მწარმოებელი</option>
                                {manufacterersList}
                            </select>
                        </div>

                        <div className="form-group">
                            <p>კატეგორია</p>
                            <select
                                className='select'
                                name='category'
                                onChange={handleChange}
                            >
                                <option value='category'>კატეგორია</option>
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
                                name="price_from"
                                min='0'
                                onChange={handleChange}
                            />
                            -
                            <input
                                id="to"
                                type="number"
                                placeholder="To"
                                name="price_to"
                                min={sort['price_from']}
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
