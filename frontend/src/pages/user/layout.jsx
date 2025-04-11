import UserNavBar from "../../containers/userNavBar.jsx";
import style from "./style/home.module.css";
import Typography from "../../components/typography/typography.jsx";

const Layout = ({children}) => {
    return (
        <>
            <UserNavBar></UserNavBar>
            <div className={style.homePageMainContentDiv}>
                {children}
            </div>
            <div className={`d-flex justify-content-between ${style.footer}`}>

                <div className={`d-flex w-50 justify-content-around`}>

                    <div>
                        <Typography component={'h2'} size={'l'}>من نحن</Typography>
                        <br/>
                        <Typography component={'p'} size={'xs'}>اكتشف أحدث إكسسوارات الموضة النسائية في كيوي.<br/> منتجات عالية
                            الجودة للمرأة العصرية.</Typography>
                    </div>
                    <div>
                        <Typography component={'h2'} size={'l'}>روابط سريعة</Typography>
                        <br />
                        <Typography component={'p'} size={'xs'} style={{}}><a>حقائب يد</a></Typography>
                        <Typography component={'p'} size={'xs'}><a>اكسسوارات</a></Typography>
                    </div>

                </div>


                <div className={`d-flex w-50 justify-content-around`}>
                    <div>
                        <Typography component={'h2'} size={'l'}>خدمة العملاء</Typography>
                        <br/>
                        <Typography component={'p'} size={'xs'}>تواصل معنا</Typography>
                        <Typography component={'p'}>أو من خلال الرقم :<br/> 9703948571655 + <br/> 9723849692284 +</Typography>
                    </div>
                    <div>
                        <Typography component={'h2'} size={'l'}>معلومات التواصل</Typography>
                        <br/>
                        <Typography component={'p'} size={'l'}>اشترك للحصول على عروض خاصة وتحديثات</Typography>
                    </div>
                </div>


            </div>

        </>
    )
}

export default Layout;