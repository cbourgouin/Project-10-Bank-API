import "./App.css";

import iconChat from "../../assets/img/icon-chat.png";
import iconMoney from "../../assets/img/icon-money.png";
import iconSecurity from "../../assets/img/icon-security.png";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";

const cardDatas = [
  {
    icon: iconChat,
    title: "You are our #1 priority",
    text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
  },
  {
    icon: iconMoney,
    title: "More savings means higher rates",
    text: "The more you save with us, the higher your interest rate will be!"
  },
  {
    icon: iconSecurity,
    title: "Security you can trust",
    text: "We use top of the line encryption to make sure your data and money is always safe."
  }
];

function App() {
  return (
    <>
      <NavBar />
      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">
              Open a savings account with Argent Bank today!
            </p>
          </section>
        </div>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          {cardDatas.map((cardData, index) => {
            return <Card
            key={"card_" + index.toString()}
            icon={cardData.icon}
            title={cardData.title}
            text={cardData.text}
          />
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
