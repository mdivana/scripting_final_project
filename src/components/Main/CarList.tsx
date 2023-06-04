import React, {useState} from 'react'
import Card from '../Card/Card'
import SortData from './SortData'
// import '../../styles.css'


export default function CarList(props: { data: any; setData: any }) {
    const { data, setData } = props
    const [price, setPrice] = useState(true)  // true - ₾ | else - $

    const cardElements = data.map((item: { car_id: number }) => {
        return (
            <Card
                key={item.car_id}
                item={item}
                setData={setData}
                price={price}
                setPrice={setPrice}
            />
        )
    })

    return (
        <div className='car-list'>
            <SortData
                data={data}
                setData={setData}
            />
            {cardElements}
        </div>
    )
}