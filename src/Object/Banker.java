package Object;

/**
 * Created by danielliang on 2017/10/18.
 */
public class Banker {
    private Point point;//Record points in hand
    private Hand hand;//Store the cards that player is handing
    private boolean isLose = false;//Judge whether lose or not

    public Banker(){
        point = new Point();
        hand = new Hand();
    }

    public Point getPoint() { return point; }

    public Hand getHand() {
        return hand;
    }

    public boolean isBlackJack() { return point.isBlackjack(); }

    public void setLose(boolean a) {}
}
