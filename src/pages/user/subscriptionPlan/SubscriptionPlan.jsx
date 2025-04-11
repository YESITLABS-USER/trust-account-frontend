import React from 'react'
import Sidebar from '../../../components/header/SideBar'
import { useAuth } from '../../../contexts/AuthContext'

const SubscriptionPlan = () => {
    const { isSidebarOpen } = useAuth()

    const handleBuySubscription = () => {
        // handle buy subscription logic here
        console.log('Buy Subscription Button Clicked')
        alert(
            'You have successfully purchased a subscription plan. Please check your email for further instructions.',
        )
    }



    return (
        <>
            <Sidebar />
            <div className={`dashboard-body-wrp subscription-plan ${isSidebarOpen ? "active" : ""}`}>
                <div className="plans-inr">
                    <div className="sec-head">
                        <h2>Subscription Plan</h2>
                    </div>
                    <div className="plans-inr-wrp">
                        <div className="plans-wrp row">
                            <div className="plan-item using">
                                <div className="plan-item-inr">
                                    <div className="plan-item-head">
                                        <p>Basic</p>
                                        <h3 className="price">$100 <span>/month</span></h3>
                                    </div>
                                    <div className="plan-item-content">
                                        <ul>
                                            <li>
                                                <img src="images/check-icon.svg" alt="check-icon" />
                                                Includes core features such as client trust account management, reconciliations, and basic reporting.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="plan-item-btn">
                                        <a href="#url" className="blue-btn">Already using</a>
                                    </div>
                                </div>
                            </div>
                            <div className="plan-item popular">
                                <div className="popularity">Most popular</div>
                                <div className="plan-item-inr">
                                    <div className="plan-item-head">
                                        <p>Premium</p>
                                        <h3 className="price">$299 <span>/month</span></h3>
                                    </div>
                                    <div className="plan-item-content">
                                        <ul>
                                            <li>
                                                <img src="images/check-icon.svg" alt="check-icon" />
                                                Includes advanced features like automated notifications, integration with other law practice management software, enhanced security features, and more comprehensive reporting and analytics.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="plan-item-btn" onClick={handleBuySubscription}>
                                        <a href="#" className="blue-btn">Buy now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubscriptionPlan
