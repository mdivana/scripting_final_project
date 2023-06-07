import React, {useState} from 'react'
import Card from '../Card/Card'
import SortData from './SortData'
import ReactPaginate from 'react-paginate';
// import '../../styles.css'


export default function CarList(props: { data: any; setData: any }) {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const { data, setData } = props
    const [price, setPrice] = useState(true)  // true - ₾ | else - $
    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected);
    };


    const cardElements = data
        .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
        .map((item: { car_id: number }) => {
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
        <SortData data={data} setData={setData} />
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