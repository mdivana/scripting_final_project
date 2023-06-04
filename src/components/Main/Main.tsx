import React from 'react'
import Aside from './Aside'
import { useEffect, useState } from 'react'
import CarList from './CarList';
import NotFound from './NotFound';
// import '../../styles.css'

export default function Main() {
    const [data, setData] = useState([]);
    const [sort, setSort] = useState({
        'deal_type': null,
        'manufacturer': null,
        'category': null,
        'price_from': null,
        'price_to': null
    });


    useEffect(() => {
        fetch('https://api2.myauto.ge/ka/products/')
            .then(res => res.json())
            .then((data) => setData(data.data.items))
            .catch((error) => {
                console.error(error)
            })
    }, [])


    return (
        <div>
            <div className="container">
                <div className="main">
                    <Aside
                        sort={sort}
                        setSort={setSort}
                        data={data}
                        setData={setData}
                    />
                    {data.length === 0 ? (
                        <NotFound />
                    ) : (
                        <CarList
                            data={data}
                            setData={setData}
                        />
                    )}

                </div>
            </div>
        </div>
    )
}
