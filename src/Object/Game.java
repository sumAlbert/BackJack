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
        totalCards.add(Integer.toString(playerMinPoint));
        totalCards.add(Integer.toString(player2Point));
        totalCards.add(Integer.toString(playerPoint));
        return totalCards;
    }

    public String addCard() {//Add card to player
        String newPok = poker.getNextCard();
        player.getHand().addCard(newPok);
        if(player.getPoint().getMyPoint(player.getHand()) > 21) {
            player.setLose(true);
        }
        return newPok;
    }

    public String[] buyInsurance() {//Player buys insurance
        if(banker.getPoint().getMyPoint(banker.getHand()) == 21) {
            player.getCash().update(3);
            state = "banker";
        }
        else {
            player.getCash().update(4);
        }
        String[] recordInsurance = new String[]{state,Integer.toString(player.getCash().getMyCash())};
        return recordInsurance;
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
        if(!isGameOver) {
            addedCard = addToBanker(addedCard);
        }
        addedCard.add("?");
        addedCard.add(Integer.toString(player2.getPoint().getMyPoint(player2.getHand())));
        addedCard.add(Integer.toString(banker.getPoint().getMyPoint(banker.getHand())));
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
        player.getCash().setBet(0);
        player.getCash().setTemBet(0);
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
                newCard.add("!");//"!" is an separator, followed by the state of player and player2 in sequence.
                newCard.add("2");
                newCard.add("2");
                player.getCash().update(7);
                isGameOver = true;
            }
            else if(player.isLose() && !player2.isLose()) {
                newCard.add("!");
                newCard.add("1");
                newCard.add("2");
            }
            else if(!player.isLose() && player2.isLose()) {
                newCard.add("!");
                newCard.add("2");
                newCard.add("1");
            }
            else {
                newCard.add("!");
                newCard.add("1");
                newCard.add("1");
            }
        }
        else if(bankerPoint > playerPoint) {
            player.getCash().update(5);
            isGameOver = true;
            if(!player2.isLose()) {
                if (bankerPoint < player2Point) {
                    newCard.add("!");
                    newCard.add("0");
                    newCard.add("2");
                } else if (bankerPoint == player2Point) {
                    newCard.add("!");
                    newCard.add("0");
                    newCard.add("1");
                } else {
                    newCard.add("!");
                    newCard.add("0");
                    newCard.add("0");
                }
            }
            else {
                newCard.add("!");
                newCard.add("0");
                newCard.add("0");
            }
        }
        else if(bankerPoint == playerPoint) {
            player.getCash().update(6);
            isGameOver = true;
            if (bankerPoint == player2Point) {
                newCard.add("!");
                newCard.add("1");
                newCard.add("1");
            }
            else if(bankerPoint < player2Point) {
                if(player2.isLose()) {
                    newCard.add("!");
                    newCard.add("1");
                    newCard.add("0");
                }
                else {
                    newCard.add("!");
                    newCard.add("1");
                    newCard.add("2");
                }
            }
            else if(bankerPoint > player2Point) {
                newCard.add("!");
                newCard.add("1");
                newCard.add("0");

            }
        }
        else {
            if(player.isLose()) {//Player2 is not lose, as is tested in addToPlayer2()
                player.getCash().update(5);
                isGameOver = true;
                if (bankerPoint < player2Point) {
                    newCard.add("!");
                    newCard.add("0");
                    newCard.add("2");
                }
                else if(bankerPoint == player2Point){
                    newCard.add("!");
                    newCard.add("0");
                    newCard.add("1");
                }
                else {
                    newCard.add("!");
                    newCard.add("0");
                    newCard.add("0");
                }
            }
            else {
                player.getCash().update(7);
                isGameOver = true;
                if(!player2.isLose()) {
                    if (bankerPoint < player2Point) {
                        newCard.add("!");
                        newCard.add("2");
                        newCard.add("2");
                    }
                    else if(bankerPoint == player2Point){
                        newCard.add("!");
                        newCard.add("2");
                        newCard.add("1");
                    }
                    else {
                        newCard.add("!");
                        newCard.add("2");
                        newCard.add("0");
                    }
                }
                else {
                    newCard.add("!");
                    newCard.add("2");
                    newCard.add("0");
                }
            }
        }
        return newCard;
    }

    private ArrayList<String> addToPlayer2(ArrayList<String> newCard) {//Automatically add cards to player2
        /*if(playerPoint == 21) {//The Player get 21 point
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
        }*/
        while(player2.getPoint().getMyPoint(player2.getHand()) <= 17) {
            String newPok = poker.getNextCard();
            player2.getHand().addCard(newPok);
            newCard.add(newPok);
        }
        int player2Point = player2.getPoint().getMyPoint(player2.getHand());
        if(player2Point > 21) {
            player2.setLose(true);
        }
        if(player.isLose() && player2.isLose()) {
            newCard.add("!");
            newCard.add("0");
            newCard.add("0");
            isGameOver = true;
        }
        return newCard;
    }
}
