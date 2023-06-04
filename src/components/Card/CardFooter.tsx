import shapeUrl from '../../assets/images/shape.png'
import editUrl from '../../assets/images/edit.png'
import favoriteUrl from '../../assets/images/favorite.png'
import ovalUrl from '../../assets/images/oval.png'

export default function CardFooter(props: { views: any }) {
    const {views} = props

    return (
        <div className="card-footer">
            <div className="views">
                <p>{views} ნახვა</p>
                <img src={ovalUrl} alt="" />
                <p>2 დღის წინ</p>
            </div>
            <div className="icons">
                <img src={editUrl} alt="" />
                <img src={shapeUrl} alt="" />
                <img src={favoriteUrl} alt="" />
            </div>
        </div>
    )
}