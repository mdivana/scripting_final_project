import shapeUrl from '../../assets/images/shape.png'
import editUrl from '../../assets/images/edit.png'
import favoriteUrl from '../../assets/images/favorite.png'
import ovalUrl from '../../assets/images/oval.png'

export default function CardFooter(props: { views: any , order_date: string}) {
    const {views, order_date} = props
    const orderDate = new Date(order_date);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - orderDate.getTime();
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    let largestUnit = '';
    let largestValue = 0;
    if (seconds > 0) {
        largestUnit = 'წამის წინ';
        largestValue = seconds % 60;
    }
    if (minutes > 0) {
        largestUnit = 'წუთის წინ';
        largestValue = minutes % 60;
    }
    if (hours > 0) {
        largestUnit = 'საათის წინ';
        largestValue = hours % 24;
    }
    if (days > 0) {
        largestUnit = 'დღის წინ';
        largestValue = days;
    }

// Display the largest non-zero time unit

    return (
        <div className="card-footer">
            <div className="views">
                <p>{views} ნახვა</p>
                <img src={ovalUrl} alt="" />
                <p>{largestValue} {largestUnit}</p>
            </div>
            <div className="icons">
                <img src={editUrl} alt="" />
                <img src={shapeUrl} alt="" />
                <img src={favoriteUrl} alt="" />
            </div>
        </div>
    )
}