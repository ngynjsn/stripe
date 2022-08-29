import './SubscriptionCard.css'

const SubscriptionCard = ({ title, subscription, price }) => {
    return (
        <div className='main-card'>
            <div className="product">
                <div className="description">
                    <h3>{title}</h3>
                    <h5>{price}</h5>
                </div>
            </div>
            <form action="http://localhost:8000/create-checkout-session" method="POST">
                {/* Add a hidden field with the lookup_key of your Price */}
                <input type="hidden" name="lookup_key" value={subscription} />
                <button id="checkout-and-portal-button" type="submit">
                    Buy {title}
                </button>
            </form>
        </div>
    )
}

export default SubscriptionCard;