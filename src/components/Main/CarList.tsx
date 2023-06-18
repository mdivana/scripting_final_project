import React, {useState} from 'react'
import Card from '../Card/Card'
import SortData from './SortData'
// import '../../styles.css'


export default function CarList(props: {data: any; setData: any ,sort: any; setSort: any, currentPage: any,setCurrentPage: any}) {

    const { data, setData, sort, setSort ,currentPage ,setCurrentPage} = props
    const [price, setPrice] = useState(true)  // true - ₾ | else - $
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const cardElements = data
        .map((item: { car_id: number }) => {
            console.log(data)
            console.log(item)
            return (
            <Card
                key={item.car_id}
                item={item}
                setData={setData}
                price={price}
                setPrice={setPrice}
            />
            );
        });


    return (
        <div className="car-list">
            <SortData data={data} setData={setData} sort={sort} setSort={setSort}/>
            {cardElements}
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
}