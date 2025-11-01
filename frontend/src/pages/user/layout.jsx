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
import {useTranslation} from "react-i18next";

const Layout = ({isSidebarOpen,setSidebarOpen,activeTab,setActiveTab,children}) => {

    const {user} = useContext(UserContext);
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";
    console.log("isArabic : ", isArabic);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <UserNavBar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab}></UserNavBar>
            <div className={style.homePageMainContentDiv} style={{ flex: 1 }}>
                {children}
            </div>
            <div className={`d-flex justify-content-between ${style.footer} ${isArabic ? style.ltr : style.rtl}`}>
                <div className={`d-flex justify-content-around ${style.footerFirstSection}`}>

                    <div className={`${style.whoWeDivFooter} w-50`}>
                        <Typography component={'h2'} size={'l'}>{t("footer.whoWee")}</Typography>
                        <div>
                            <p className={`${style.whoWeTextFooter} text-wrap`}>{t("footer.whoWeeText")}</p>
                        </div>
                    </div>
                    <div className={`${style.quickLinksDivFooter} w-25`}>
                        <Typography component={'h2'} size={'l'}>{t("footer.quickLinks")}</Typography>
                        <div>
                            <p><Link to={'/category/67fd7361d3d9f99f95edff41'} style={{color:'var(--text-color)'}} state= {{catName: `${t("nav.handBags")}`}}>{t("nav.handBags")}</Link></p>
                            <p><Link to={'/category/6803f9c535efe305218f99f2'} style={{color:'var(--text-color)'}} state= {{catName: `${t("nav.perfume")}`}}>{t("nav.perfume")}</Link></p>
                            <p><Link to={'/category/67ff75611520f910df910f88'} style={{color:'var(--text-color)'}} state= {{catName: `${t("nav.accessories")}`}}>{t("nav.accessories")}</Link></p>
                            <p><Link to={'/category/6803fb1535efe305218f9a10'} style={{color:'var(--text-color)'}} state= {{catName: `${t("nav.offers")}`}}>{t("nav.offers")}</Link></p>
                        </div>

                    </div>

                </div>
                <div className={`d-flex justify-content-around ${style.footerSecondSection}`}>
                    <div className={`${style.whoWeDivFooter}`}>
                        <Typography component={'h2'} size={'l'}>{t("footer.customerService")}</Typography>
                        <div>
                            <p>{t("footer.contactUs")}</p>
                            <p>{t("footer.contactUsingNumber")}<br/> 972599128813 + <br/> 972567758087 +</p>
                        </div>
                    </div>
                    <div className={`${style.quickLinksDivFooter}`}>
                        <Typography component={'h2'} size={'l'}>{t("footer.contactInfo")}</Typography>
                        <div>
                            <p>{t("footer.contactText")}</p>
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