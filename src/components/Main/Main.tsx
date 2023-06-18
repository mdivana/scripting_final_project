import React from 'react'
import Aside from './Aside'
import { useEffect, useState } from 'react'
import CarList from './CarList';
import NotFound from './NotFound';
// import '../../styles.css'

export default function Main() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sort, setSort] = useState({
        'ForRent': "",
        'Mans': "",
        'Cats': "",
        'PriceFrom': "",
        'PriceTo': "",
        'SortOrder': 1,
        'period': '',
    });
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        fetch(`https://api2.myauto.ge/ka/products?TypeID=0&ForRent=&Mans=&CurrencyID=3&MileageType=1&SortOrder=1&Page=${currentPage}`)
            .then(res => res.json())
            .then((data) => setData(data.data.items))
            .catch((error) => {
                console.error(error)
            })
        console.log(data)
    }, [currentPage])


    return (
        <div>
            <div className="container">
                <div className="main">
                    <Aside
                        sort={sort}
                        setSort={setSort}
                        data={data}
                        setData={setData}
                        currentPage={currentPage}
                    />
                    {data.length === 0 ? (
                        <NotFound />
                    ) : (
                        <CarList
                            data={data}
                            setData={setData}
                            sort={sort}
                            setSort={setSort}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />)}
                </div>
            </div>
        </div>
    )
}
