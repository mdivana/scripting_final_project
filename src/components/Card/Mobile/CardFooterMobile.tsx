import shapeUrl from '../../../assets/images/shape.png'
import editUrl from '../../../assets/images/edit.png'
import ovalUrl from '../../../assets/images/oval.png'
import hotUrl from '../../../assets/images/hot.png'

export default function CardFooterMobile(props: { views: any }) {
    const {views} = props

    return (
        <div className="card-footer">
            <div className="views">
                <img src={hotUrl} alt="" />
                <p>{views} ნახვა</p>
                <img src={ovalUrl} alt="" />
                <p>2 დღის წინ</p>
            </div>
            <div className="icons">
                <img src={editUrl} alt="" />
                <img src={shapeUrl} alt="" />
            </div>
        </div>
    )
}