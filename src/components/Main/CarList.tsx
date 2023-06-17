import React, {useState} from 'react'
import Card from '../Card/Card'
import SortData from './SortData'
import ReactPaginate from 'react-paginate';
// import '../../styles.css'


export default function CarList(props: {data: any; setData: any ,sort: any; setSort: any, currentPage: any,setCurrentPage: any}) {

    const itemsPerPage = 5;
    const { data, setData, sort, setSort ,currentPage ,setCurrentPage} = props
    const [price, setPrice] = useState(true)  // true - ₾ | else - $
    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected);
    };


    const cardElements = data
        .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
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
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={Math.ceil(data.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination-container'}
                activeClassName={'active'}
            />
        </div>
    );
}