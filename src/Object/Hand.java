package Object;

import java.util.ArrayList;

/**
 * Created by danielliang on 2017/10/18.
 */
public class Hand {
    private ArrayList<String> handCard = new ArrayList<>();//Cards in hand

    public Hand() {}

    public ArrayList<String> getHandCard() { return handCard; }

    public void addCard(String newCard) {
        handCard.add(newCard);
    }

}
