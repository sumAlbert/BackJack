package Object;

import java.util.ArrayList;

/**
 * Created by danielliang on 2017/10/17.
 */
public class Player {
    private Cash cash;//Record current coins(The default is 1000)
    private Point point;//Record points in hand
    private Hand hand;//Store the cards that player is handing
    private boolean isLose = false;//Judge whether lose or not
    private String name;//Player's name

    public Player() {
        cash = new Cash();
        point = new Point();
        hand = new Hand();
    }

    public Player(String name) {
        cash = new Cash();
        point = new Point();
        hand = new Hand();
        this.name = name;
    }

    public Cash getCash() {
        return cash;
    }

    public Point getPoint() { return point; }

    public boolean isLose() {
        return isLose;
    }

    public void setLose(boolean lose) {
        isLose = lose;
    }

    public Hand getHand() {
        return hand;
    }

    public void setHand(Hand hand) {
        this.hand = hand;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isBlackJack() { return point.isBlackjack(); }

}
