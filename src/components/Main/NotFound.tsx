import errorImgUrl from '../../assets/images/error-b.png'
// import '../../styles.css'

export default function NotFound() {
    return (
        <div className='error'>
            <div className="center">
                <img src={errorImgUrl} alt="" className='error-img' />
                <p className='bold'>განცხადებები ვერ მოიძებნა</p>
                <p className='error-p'>
                    შენი ძებნის პარამეტრების მიხედვით განცხადებები
                    ვერ მოიძებნა. შეცვალე ან გამოიწერე პარამეტრები
                    და მიიღე შეტყობინება ახალი განცხადებების განთავსების
                    შემთხვევაში
                </p>
            </div>
        </div>
    )
}