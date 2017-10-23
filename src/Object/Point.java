package Object;

import java.util.ArrayList;
import java.util.Iterator;

/**
 * Created by danielliang on 2017/10/18.
 */
public class Point {//calculate the total point of card
    private int point;

    public Point() {
        point = 0;
    }

    public boolean isBlackjack() {
        return point == 21;
    }

    public int getMyPoint(Hand totalCard) {//Get total point og cards in hand
        point = 0;
        boolean hasA = false;//Judge whether has an A
        ArrayList<String> cards = totalCard.getHandCard();
        Iterator<String> it = cards.iterator();
        while(it.hasNext()) {
            String single = it.next();
            char ch = single.charAt(1);
            switch (ch) {
                default:
                    break;
                case '1':
                    point += 1;
                    hasA = true;
                    break;
                case '2':
                    point += 2;
                    break;
                case '3':
                    point += 3;
                    break;
                case '4':
                    point += 4;
                    break;
                case '5':
                    point += 5;
                    break;
                case '6':
                    point += 6;
                    break;
                case '7':
                    point += 7;
                    break;
                case '8':
                    point += 8;
                    break;
                case '9':
                    point += 9;
                    break;
                case 'a':
                case 'j':
                case 'q':
                case 'k':
                    point += 10;
                    break;
            }
        }
        if(hasA && point <= 11) {
            point += 10;
        }
        return point;
    }
}

