import './SubscriptionCard.css'
import { createCheckoutSession } from './server/stripeServer'

const SubscriptionCard = ({ title, subscription, price }) => {
    const handleButtonClick = () => {
        createCheckoutSession(subscription)
            .then((response) => {
                window.location = response.body;
            })
            .catch(error => {
                console.log(error);
            }
            );
    }

    return (
        <div className='main-card'>
            <div className="product">
                <div className="description">
                    <h3>{title}</h3>
                    <h5>{price}</h5>
                </div>
            </div>
            <button onClick={handleButtonClick} type="submit">
                Buy {title}
            </button>
        </div>
    )
}

export default SubscriptionCard;