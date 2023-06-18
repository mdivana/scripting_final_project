import React from "react";
import { useEffect, useState } from "react";
import CardHeader from "./CardHeader"
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import CardHeaderMobile from './Mobile/CardHeaderMobile'
import CardBodyMobile from './Mobile/CardBodyMobile'
import CardFooterMobile from './Mobile/CardFooterMobile'
// import { AiOutlineHeart } from 'react-icons/ai';
import './Card.css'


export default function Card(props: any) {
    const { item, setData, price, setPrice } = props
    const [brandName, setBrandName] = useState(null);
    const [modelName, setModelName] = useState(null);
    const title = `${brandName} ${modelName}`
    const carImg = `https://static.my.ge/myauto/photos/${item.photo}/thumbs/${item.car_id}_1.jpg?v=${item.photo_ver}`

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 800);
        };

        handleResize(); // Check initial screen size
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        fetch('https://static.my.ge/myauto/js/mans.json')
            .then(res => res.json())
            .then((data) => {
                const foundBrand = data.find((obj: { man_id: string; }) => obj.man_id === String(item.man_id))
                setBrandName(foundBrand.man_name)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [item])

    useEffect(() => {
        fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${item.man_id}`)
            .then(res => res.json())
            .then((response) => {
                const foundModel = response.data.find((obj: { model_id: any; }) => obj.model_id === item.model_id)
                setModelName(foundModel.model_name)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [item])

    useEffect(() => {
        if (brandName !== null && modelName !== null) {
            updateData();
            // setApiCallsComplete(true);
        }
    }, [brandName, modelName]);


    function updateData() {
        // adds brand_name to specific item
        setData((prevData: any[]) => {
            return prevData.map((car) => {
                if (car.man_id === item.man_id) {
                    return { ...car, brand_name: brandName }
                } else {
                    return car
                }
            })
        })
    }

    return (
        <div className='card'>

            {isMobile ? (
                <>
                    <CardHeaderMobile
                        title={title}
                        year={item.prod_year}
                        priceInGel={item.price_value}
                        priceInUsd={item.price_usd}
                        price={price}
                        setPrice={setPrice}
                    />
                    <div>
                        <img src={carImg} alt="..." className='card-img' />
                        {/*<AiOutlineHeart className="fav"/>*/}
                    </div>
                    <CardBodyMobile
                        carRun={item.car_run_km}
                        categoryId={item.category_id}
                        engine={item.engine_volume}
                        wheel={item.right_wheel}
                    />
                    <hr />
                    <CardFooterMobile
                        views={item.views}
                    />
                </>
            ) : (
                <>
                    < img src={carImg} alt="failed to load" className='card-img' />
                    <div className="card-details">
                        <CardHeader
                            title={title}
                            year={item.prod_year}
                        />
                        <CardBody
                            carRun={item.car_run_km}
                            priceInGel={item.price_value}
                            priceInUsd={item.price_usd}
                            wheel={item.right_wheel}
                            engine={item.engine_volume}
                            price={price}
                            setPrice={setPrice}
                        />
                        <CardFooter
                            views={item.views}
                            order_date={item.order_date}
                        />
                    </div>
                </>

            )}
        </div>
    );



}