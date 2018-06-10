import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faMoneyBillAlt, faTimes } from '@fortawesome/fontawesome-free-solid'
import classes from './exchangeList.css'

const exchangeList = (props) => {
    return(
        <div className={classes.wholeComponent}>
            <div className={classes.listItem}>
                <div className={classes.currencyDetails}>
                    <div className={classes.currencyName}>
                        <FontAwesomeIcon icon={faMoneyBillAlt} />
                        <p>{props.currencyName}</p>
                    </div>
                    <div className={classes.currencyCode}>
                        <p>{props.currencyCode}</p>
                    </div>
                </div>
                <p className={classes.rate}>
                    {props.exchangeRate}
                </p>
                <div 
                    className={classes.delete}
                    onClick={props.deleteItem}>
                    <FontAwesomeIcon 
                            icon={faTimes}
                            className={classes.deleteIcon} />
                    <div className={classes.deleteIconBg}></div>
                </div>
            </div>
            <div className={classes.itemShadowV}></div>
            <div className={classes.itemShadowH}></div>
        </div>
    )
}

export default exchangeList