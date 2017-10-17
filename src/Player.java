import java.util.ArrayList;

/**
 * Created by danielliang on 2017/10/17.
 */
public class Player {
    private int balance = 1000;//玩家拥有的金币数
    private boolean isLose = false;//判断是否输了
    private boolean isBlackjack = false;//是否为blackjack
    private ArrayList<Integer> myCard = new ArrayList<>();//存放玩家手中的牌
    private int currentPoint = 0;//现在的点数
    private String name;//玩家的姓名

    public Player() {}

    public Player(String name) {
        this.name = name;
    }

    public int getBalance() {
        return balance;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }

    public boolean isLose() {
        return isLose;
    }

    public void setLose(boolean lose) {
        isLose = lose;
    }

    public boolean isBlackjack() {
        return isBlackjack;
    }

    public void setBlackjack(boolean blackjack) {
        isBlackjack = blackjack;
    }

    public ArrayList<Integer> getMyCard() {
        return myCard;
    }

    public void setMyCard(ArrayList<Integer> myCard) {
        this.myCard = myCard;
    }

    public int getCurrentPoint() {
        return currentPoint;
    }

    public void setCurrentPoint(int currentPoint) {
        this.currentPoint = currentPoint;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void addCard(int card) {
        myCard.add(card);
    }


}
