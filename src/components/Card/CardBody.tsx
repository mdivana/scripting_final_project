import wheelUrl from '../../assets/images/wheel.png'
import motorUrl from '../../assets/images/motor.png'
import milageUrl from '../../assets/images/milage.png'
import transmissionUrl from '../../assets/images/transmission.png'

export default function CardBody(props: { carRun: any; priceInGel: any; priceInUsd: any; wheel: any; engine: any; price: any; setPrice: any }) {
    const { carRun, priceInGel, priceInUsd, wheel, engine, price, setPrice } = props

    // format car run
    let formattedCarRun = carRun.toString();
    formattedCarRun = formattedCarRun.slice(0, -3) + ' ' + formattedCarRun.slice(-3);

    // format price in gel
    let formattedPriceInGel = priceInGel.toString();
    formattedPriceInGel = formattedPriceInGel.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // format price in usd
    let formattedPriceInUsd = priceInUsd.toString();
    formattedPriceInUsd = priceInUsd > 2000 ? formattedPriceInUsd.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : Math.round(formattedPriceInUsd)

    var priceValue = null

    if (priceInGel === 0) {
        priceValue = 'ფასი შეთანხმებით'
    } else if (price) {
        priceValue = formattedPriceInGel
    } else {
        priceValue = formattedPriceInUsd
    }

    const styles = {
        fontSize: priceValue.length === 16 ? '15px' : '20px'
    }

    return (
        <div className="card-body">
            <div className="car-details">
                <div>
                    <img src={motorUrl} alt="" />
                    <p>{(engine / 1000).toFixed(1)} ძრავი</p>
                </div>

                <div>
                    <img src={milageUrl} alt="" />
                    <p>{formattedCarRun} კმ</p>
                </div>

                <div>
                    <img src={transmissionUrl} alt="" />
                    <p>ავტომატიკა</p>
                </div>

                <div>
                    <img src={wheelUrl} alt="" />
                    <p>{wheel ? 'მარჯვენა' : 'მარცხენა'}</p>
                </div>
            </div>
            <div className="price">
                <p style={styles}>{priceValue}</p>
                <button
                    className={price ? 'gray-b' : 'gray-b gray-b-usd'}
                    onClick={() => setPrice((prevPrice: any) => !prevPrice)}
                >{price ? '₾' : '$'}</button>
            </div>
        </div>
    )
}