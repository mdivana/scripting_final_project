import carImgUrl from '../../assets/images/car.svg'
import tractorImgUrl from '../../assets/images/tractor.svg'
import motoImgUrl from '../../assets/images/moto.svg'
// import '../../styles.css'

export default function SearchType() {

    return(
        <div className="search-type">
            <img
                src={carImgUrl}
                alt="car"
                className='car-type'/>
            <img
                src={tractorImgUrl}
                alt="tractor"
                className='tractor-type'/>
            <img
                src={motoImgUrl}
                alt="moto"
                className='moto-type'/>
        </div>
    )
}