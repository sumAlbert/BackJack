package Object;

import java.util.ArrayList;

/**
 * Created by danielliang on 2017/10/17.
 */
public class Player extends Banker{
    private Cash cash;//Record current coins(The default is 1000)
    private boolean isLose = false;//Judge whether lose or not

    public Player() {
        super();
        cash = new Cash();
        point = new Point();
        hand = new Hand();
        isLose = false;
    }

    public Cash getCash() {
        return cash;
    }

    public void setCash(Cash cash) { this.cash = cash; }

    public boolean isLose() {
        return isLose;
    }

    public void setLose(boolean lose) {
        isLose = lose;
    }

}
