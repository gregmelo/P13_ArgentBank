//features img
import ChatIcon from '../assets/img/icon-chat.png';
import MoneyIcon from '../assets/img/icon-money.png';
import SecurityIcon from '../assets/img/icon-security.png';

const features = [
    {
        icon: ChatIcon,
        title: "You are our #1 priority",
        text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
    },
    {
        icon: MoneyIcon,
        title: "More savings means higher rates",
        text: "The more you save with us, the higher your interest rate will be!"
    },
    {
        icon: SecurityIcon,
        title: "Security you can trust",
        text: "We use top of the line encryption to make sure your data and money is always safe."
    },
]

const account = [
    {
        title: "Argent Bank Checking (x8349)",
        amount: "2,082.79",
        description: "Available Balance"
    },
    {
        title: "Argent Bank Savings (x6712)",
        amount: "10,928.42",
        description: "Available Balance"
    },
    {
        title: "Argent Bank Credit Card (x8349)",
        amount: "184.30",
        description: "Current Balance"
    }
]

export default {features, account};