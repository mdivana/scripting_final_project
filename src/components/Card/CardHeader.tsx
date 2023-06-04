import flagUrl from '../../assets/images/flag-geo.png'

export default function CardHeader(props: { title: any; year: any }) {
    const { title, year } = props


    return (
        <div className="card-header">
            <div className="car-title">
                {title}
                <span className="gray">{year} წ</span>
            </div>
            <div className="car-country">
                <img src={flagUrl} alt="" />
                <p>თბილისი</p>
            </div>
        </div>
    )
}
