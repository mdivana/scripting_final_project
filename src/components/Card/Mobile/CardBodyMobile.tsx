import { SetStateAction, useEffect, useState} from "react";
import flagImg from '../../../assets/images/flag-geo.png'


export default function CardBodyMobile(props: { carRun: any; categoryId: any; engine: any; wheel: any; }) {
    const {carRun, categoryId, engine, wheel} = props
    const [categoryType, setCategoryType] = useState(null);

    // format car run
    let formattedCarRun = carRun.toString();
    formattedCarRun = formattedCarRun.slice(0, -3) + ' ' + formattedCarRun.slice(-3);

    useEffect(() => {
        fetch('https://api2.myauto.ge/ka/cats/get')
            .then(res => res.json())
            .then((data) => {
                data.data.map((item: { category_id: any; title: SetStateAction<null>; }) => {
                if (item.category_id === categoryId) {
                    setCategoryType(item.title)
                }
            })
        })
    }, [])


    return (
        <div className="card-body-mb">
            <div>
                <p>{carRun} კმ</p>
            </div>

            <div>
                <p>{categoryType}</p>
            </div>

            <div>
                <p>{(engine / 1000).toFixed(1)} ძრავი</p>
            </div>

            <div>
                <p>საჭე {wheel ? 'მარჯვენა' : 'მარცხენა'}</p>
            </div>

            <div>
                <p>ავტომატიკა</p>
            </div>

            <div className="car-country">
                <img src={flagImg} alt="" />
                <p>თბილისი</p>
            </div>
        </div>
    )
}