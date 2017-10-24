package Object;

/**
 * Created by danielliang on 2017/10/18.
 */
public class Banker {
    protected Point point;//Record points in hand
    protected Hand hand;//Store the cards that player is handing

    public Banker(){
        point = new Point();
        hand = new Hand();
    }

    public Point getPoint() { return point; }

    public void setPoint(Point point) { this.point = point; }

    public Hand getHand() {
        return hand;
    }

    public void setHand(Hand hand) { this.hand = hand; }

}
