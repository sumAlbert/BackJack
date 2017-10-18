package Object;

import java.util.Random;

/**
 * Created by danielliang on 2017/10/18.
 */
public class Poker {//Class of whole cards
    private String[] poker = new String[52];
    private int count = 0;//Record cards which are assigned
    public Poker() {
        initPoker();//Initialize poker
        shufflecard(poker);
    }

    private void initPoker() {
        String[] str1 = new String[]{"A" , "B" , "C" , "D"};
        String[] str2 = new String[]{"1" , "2" , "3" , "4" , "5" , "6" , "7" , "8" , "9", "a" , "j" , "q" , "k"};
        for(int i = 0; i < 4; i++) {
            for(int j = 0; j < 13; j++) {
                poker[i*13+j] = str1[i] + str2[j];
            }
        }
    }

    private static void shufflecard(String[] poker) {
        Random rd = new Random();
        for(int i=0;i<52;i++) {
            int j = rd.nextInt(52);//Generate random numbers
            String temp = poker[i];//Exchange cards
            poker[i] = poker[j];
            poker[j] = temp;
        }
    }

    public String getNextCard() {//Pick next card
        return poker[count++];
    }

    public boolean needInsurance() {
        return poker[0].contains("1");
    }

}
