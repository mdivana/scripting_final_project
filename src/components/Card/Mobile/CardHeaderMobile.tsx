export default function CardHeaderMobile(props: { title: any; year: any; priceInGel: any; priceInUsd: any; price: any; setPrice: any; }) {

    const { title, year, priceInGel, priceInUsd, price, setPrice } = props

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
        fontSize: priceValue.length === 16 ? '15px' : '18px',
        fontWeight: '600'
    }

    return (
        <div className="card-header-mb">
            <div className="car-title">
                {title}
                <span className="gray">{year} წ</span>
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