import UserNavBar from "../../containers/userNavBar.jsx";
import style from "./style/home.module.css";
import Typography from "../../components/typography/typography.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';

import {Button} from "react-bootstrap";
import {IconBtn} from "../../components/icons/icons.jsx";
import {Link} from "react-router";
import {useContext} from "react";
import {UserContext} from "../../context/userContext.jsx";

const Layout = ({isSidebarOpen,setSidebarOpen,children}) => {

    const {user} = useContext(UserContext);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <UserNavBar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen}></UserNavBar>
            <div className={style.homePageMainContentDiv} style={{ flex: 1 }}>
                {children}
            </div>
            <div className={`d-flex justify-content-between ${style.footer} `}>

                <div className={`d-flex justify-content-around ${style.footerFirstSection}`}>

                    <div className={`${style.whoWeDivFooter} w-50`}>
                        <Typography component={'h2'} size={'l'}>من نحن</Typography>
                        <div>
                            <p className={`${style.whoWeTextFooter} text-wrap`}>نحن متجر متخصص في استيراد وتوزيع الشنط عالية الجودة منذ 2018 . </p>
                        </div>
                    </div>
                    <div className={`${style.quickLinksDivFooter} w-25`}>
                        <Typography component={'h2'} size={'l'}>روابط سريعة</Typography>
                        <div>
                            <p><Link to={'/category/67fd7361d3d9f99f95edff41'} style={{color:'var(--text-color)'}} state= {{catName: 'حقائب اليد'}}>حقائب يد</Link></p>
                            <p><Link to={'/category/6803f9c535efe305218f99f2'} style={{color:'var(--text-color)'}} state= {{catName: 'العطور'}}>العطور</Link></p>
                            <p><Link to={'/category/67ff75611520f910df910f88'} style={{color:'var(--text-color)'}} state= {{catName: 'الاكسسوارات'}}>اكسسوارات</Link></p>
                            <p><Link to={'/category/6803fb1535efe305218f9a10'} style={{color:'var(--text-color)'}} state= {{catName: 'العروض'}}>العروض</Link></p>
                            {
                                !user &&  <Link to={'/login'} className={`${style.isWholesalerLink}`}>هل أنت تاجر جملة ؟</Link>
                            }
                        </div>

                    </div>

                </div>
                <div className={`d-flex justify-content-around ${style.footerSecondSection}`}>
                    <div className={`${style.whoWeDivFooter}`}>
                        <Typography component={'h2'} size={'l'}>خدمة العملاء</Typography>
                        <div>
                            <p>تواصل معنا</p>
                            <p>أو من خلال الرقم :<br/> 972599128813 + <br/> 972567758087 +</p>
                        </div>
                    </div>
                    <div className={`${style.quickLinksDivFooter}`}>
                        <Typography component={'h2'} size={'l'}>معلومات التواصل</Typography>
                        <div>
                            <p>اشترك للحصول على عروض خاصة وتحديثات</p>
                            <div className={`gap-2 d-flex flex-row justify-content-between mt-4 ${style.socialMediaDiv}`} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                <Typography component={'p'} size={'xs'}><a className={`${style.socialMedia}`} href='https://www.instagram.com/kewi.jenin'><FontAwesomeIcon icon={faInstagram} size="3x" /></a> </Typography>
                                <Typography component={'p'} size={'xs'}><a className={`${style.socialMedia}`} style={{marginTop:'0.1rem'}} href='https://www.facebook.com/kewi.jenin'><FontAwesomeIcon icon={faFacebookF} size="3x" /></a></Typography>
                                <Typography component={'p'} size={'xs'}><a className={`${style.socialMedia}`} href='https://www.tiktok.com/@kewi.ps'><FontAwesomeIcon icon={faTiktok} size="3x" /></a></Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout;