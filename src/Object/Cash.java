package Object;

/**
 * Created by danielliang on 2017/10/18.
 */
public class Cash {//Record player's cash
    private int bet;
    private int cash;
    private int temBet;//Add it to bet

    public Cash(){
        bet = 0;
        cash = 100000;
        temBet = 0;
    }

    public int getMyCash() { return cash; }

    public void setMyCash(int cash) { this.cash = cash; }

    public int getTemBet() { return temBet; }

    public void setTemBet(int temBet) { this.temBet = temBet; }

    public int getBet() { return bet; }

    public void setBet(int bet) { this.bet = bet; }


    public void addBetInSeqence(int money)
    {
        setBet(bet + money);
        setTemBet(money);
    }

    /*
    Buy Insurance:
    If the dealer is blackjack, then the player takes back the insurance and wins directly; (case 3 below)
    if the dealer does not have blackjack, the player will lose the insurance to continue the game.(case 4 below)
    */
    public void update(int i) {//Analyse different stuations:1 bet but not end;2 double;5 lose;6 equal;7 win
        switch (i) {
            case 1:
                cash = cash - temBet;
                break;
            case 2:
                cash = cash - bet;
                bet = bet*2;
                break;
            case 3:
                cash = cash + bet/2;
                break;
            case 4:
                cash = cash - bet/2;
                break;
            case 5:
                bet = 0;
                break;
            case 6:
                cash = cash + bet;
                break;
            case 7:
                double d = cash + bet*1.5;
                cash = (int)d;
                break;
        }
    }

}
