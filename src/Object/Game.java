package Object;

import java.util.ArrayList;

/**
 * Created by danielliang on 2017/10/21.
 */
public class Game {
    private Banker banker;
    private Player player;
    private Player player2;
    private Poker poker;
    private String state;//Record the one who wins
    private boolean isGameOver;

    public Game() {
        banker = new Banker();
        player = new Player();
        player2 = new Player();
        poker = new Poker();
        state = "";
        isGameOver = false;
    }

    public String getState() { return state; }
    public boolean isGameOver() { return isGameOver; }

    public boolean isPlayerBoom() { return player.isLose(); }
    public boolean isPlayer2Boom() { return player2.isLose(); }

    public int getPlayerScore() { return player.getPoint().getMyPoint(player.getHand()); }

    public int[] bet(int betNum) {//make bet
        int[] i = new int[2];
        player.getCash().addBetInSeqence(betNum);
        player.getCash().update(1);
        i[0] = player.getCash().getBet();
        i[1] = player.getCash().getMyCash();
        return i;
    }

    public ArrayList<String> deal() {//Assign cards in sequence(banker,player1,player2,banker,player1,player2)
        ArrayList totalCards = new ArrayList();
        for(int i=0; i<6; i++) {
            String currentPoker = poker.getNextCard();
            totalCards.add(currentPoker);
            if(i%3 == 0) {
                banker.getHand().addCard(currentPoker);
            }
            else if(i%3 == 1) {
                player.getHand().addCard(currentPoker);
            }
            else {
                player2.getHand().addCard(currentPoker);
            }
        }
        //Initialize point of every character
        int bankerPoint = banker.getPoint().getMyPoint(banker.getHand());
        int playerMinPoint = player.getPoint().getMinPoint(player.getHand());
        int playerPoint = player.getPoint().getMyPoint(player.getHand());
        int player2Point = player2.getPoint().getMyPoint(player2.getHand());
        totalCards.add("*");
        totalCards.add(Integer.toString(playerPoint));
        totalCards.add(Integer.toString(player2Point));
        totalCards.add(Integer.toString(playerMinPoint));
        return totalCards;
    }

    public String addCard() {//Add card to player
        String newPok = poker.getNextCard();
        player.getHand().addCard(newPok);
        if(banker.getPoint().getMyPoint(banker.getHand()) > 21) {
            player.setLose(true);
        }
        return newPok;
    }

    public String buyInsurance() {//Player buys insurance
        if(banker.getPoint().getMyPoint(banker.getHand()) == 21) {
            player.getCash().update(3);
            state = "banker";
        }
        else {
            player.getCash().update(4);
        }
        return state;
    }

    public String[] setDouble() {//a[0] and a[1] record bet_money and money and a[2] record the card added
        String[] a = new String[3];
        player.getCash().update(2);
        String newPok = poker.getNextCard();
        player.getHand().addCard(newPok);
        if(player.getPoint().getMyPoint(player.getHand()) > 21) {
            player.setLose(true);
        }
        a[0] = newPok;
        a[1] = Integer.toString(player.getCash().getBet());
        a[2] = Integer.toString(player.getCash().getMyCash());
        return a;
    }

    public ArrayList<String> pass() {//Automatically adding cards to player2 and banker as well as calculating
        ArrayList<String> addedCard = new ArrayList<>();
        addedCard = addToPlayer2(addedCard);
        addedCard.add("*");
        if(!player2.isLose() || !player.isLose()) {
            addedCard = addToBanker(addedCard);
        }
        return addedCard;
    }

    public int again() {//Return the cards banker has
        poker = new Poker();
        player.setHand(new Hand());
        player2.setHand(new Hand());
        banker.setHand(new Hand());
        player.setLose(false);
        player2.setLose(false);
        state = "";
        isGameOver = false;
        return player.getCash().getMyCash();
    }

    private ArrayList<String> addToBanker(ArrayList<String> newCard) {//Automatically adding cards to banker
        while(banker.getPoint().getMyPoint(banker.getHand()) <= 17) {
            String newPok = poker.getNextCard();
            banker.getHand().addCard(newPok);
            newCard.add(newPok);
        }
        int bankerPoint = banker.getPoint().getMyPoint(banker.getHand());
        int playerPoint = player.getPoint().getMyPoint(player.getHand());
        int player2Point = player2.getPoint().getMyPoint(player2.getHand());
        if(bankerPoint > 21) {
            if(!player.isLose() && !player2.isLose()) {
                state = "player/player2";
                player.getCash().update(7);
                isGameOver = true;
            }
            else if(player.isLose() && !player2.isLose()) {
                state = "player2";
            }
            else if(!player.isLose() && player2.isLose()) {
                state = "player";
            }
            else {
                state = "banker/player/player2";
            }
        }
        else if(bankerPoint > playerPoint) {
            player.getCash().update(5);
            isGameOver = true;
            if(!player2.isLose()) {
                if (bankerPoint < player2Point) {
                    state = "player2";
                } else if (bankerPoint == player2Point) {
                    state = "banker/player2";
                } else {
                    state = "banker";
                }
            }
            else {
                state = "banker";
            }
        }
        else if(bankerPoint == playerPoint) {
            player.getCash().update(6);
            isGameOver = true;
            if (bankerPoint == player2Point) {
                state = "banker/player/player2";
            }
            else if(bankerPoint < player2Point) {
                if(player2.isLose()) {
                    state = "banker/player";
                }
                else {
                    state = "player2";
                }
            }
            else if(bankerPoint > player2Point) {
                state = "banker/player";
            }
        }
        else {
            if(player.isLose()) {//Player2 is not lose
                player.getCash().update(5);
                isGameOver = true;
                if (bankerPoint < player2Point) {
                    state = "player2";
                }
                else if(bankerPoint == player2Point){
                    state = "banker/player2";
                }
                else {
                    state = "banker";
                }
            }
            else {
                player.getCash().update(7);
                isGameOver = true;
                if(!player2.isLose()) {
                    if (bankerPoint < player2Point) {
                        state = "player/player2";
                    }
                    else {
                        state = "player";
                    }
                }
                else {
                    state = "player";
                }
            }
        }
        return newCard;
    }

    private ArrayList<String> addToPlayer2(ArrayList<String> newCard) {//Automatically add cards to player2
        int bankerPoint = banker.getPoint().getMyPoint(banker.getHand());
        int playerPoint = player.getPoint().getMyPoint(player.getHand());
        int player2Point = player2.getPoint().getMyPoint(player2.getHand());
        if(playerPoint == 21) {//The Player get 21 point
            if(playerPoint == bankerPoint) {
                player.getCash().update(6);
                isGameOver = true;
                if(playerPoint == player2Point) {
                    state = "banker/player/player2";
                }
                else {
                    state = "banker/player";
                }
            }
            else {
                if(playerPoint == player2Point) {
                    state = "player/player2";
                    player.getCash().update(7);
                    isGameOver = true;
                }
                else {
                    state = "player";
                    player.getCash().update(7);
                    isGameOver = true;
                }
            }
        }
        else if(player2Point == 21) {
            if (player2Point == bankerPoint) {
                isGameOver = true;
                state = "banker/player2";
            }
            else {
                isGameOver = true;
                state = "player2";
            }
        }
        while(player2.getPoint().getMyPoint(player2.getHand()) <= 17) {
            String newPok = poker.getNextCard();
            banker.getHand().addCard(newPok);
            newCard.add(newPok);
        }
        if(player2.getPoint().getMyPoint(player2.getHand()) > 21) {
            player.setLose(true);
        }
        if(player.isLose() && player2.isLose()) {
            state = "banker";
            isGameOver = true;
        }
        return newCard;
    }
}
