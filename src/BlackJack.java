import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.logging.Logger;
import Object.*;

public class BlackJack extends HttpServlet{
    private Logger logger=Logger.getLogger("Game");
    private Game game = new Game();
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String command=(String) req.getParameter("command");
        String value;
        PrintWriter printWriter=resp.getWriter();
        switch (command){
            case "bet":
                value = (String) req.getParameter("value");
                int[] storeBet = new int[2];
                storeBet = game.bet(Integer.parseInt(value));
                printWriter.print("{\"resultCode\":true,\"bet_money\":" + Integer.toString(storeBet[0]) + ",\"money\":"+Integer.toString(storeBet[1])+"}");
                printWriter.close();
                break;
            case "deal":
                ArrayList<String> dealCards;
                dealCards = game.deal();
                Iterator<String> itDeal = dealCards.iterator();
                boolean isSpiltedDeal = false;
                String pointDeal = "[";
                String cardsDeal = "[";
                while (itDeal.hasNext()) {
                    String s = itDeal.next();
                    if(s .equals("*") ) { isSpiltedDeal = true; }
                    else {
                        if(!isSpiltedDeal) {
                            cardsDeal = cardsDeal + "\"" + s + "\",";
                        }
                        else {
                            pointDeal = pointDeal + "\"" + s + "\",";
                        }
                    }
                }
                cardsDeal = cardsDeal.substring(0, cardsDeal.length()-1) + "]";
                pointDeal = pointDeal.substring(0, pointDeal.length()-1) + "]";
                printWriter.print("{\"resultCode\":true,\"state\":\"" + game.getState() + "\",\"cards\":" + cardsDeal + ",\"scores\":" + pointDeal + "}");
                printWriter.close();
                break;
            case "hit":
                String boomHit;
                String addCard = game.addCard();
                if(game.isPlayerBoom()) {
                    boomHit = "true";
                }
                else {
                    boomHit = "false";
                }
                printWriter.print("{\"resultCode\":true,\"cards\":[\"" + addCard + "\"],\"state\":\"" + game.getState() + "\",\"boom\":" + boomHit +",\"scores\":[\"" + game.getPlayerScore() +"\"]}");
                printWriter.close();
                break;
            case "double":
                String[] getDoubled;
                getDoubled = game.setDouble();
                String boomDouble;
                if(game.isPlayerBoom()) {
                    boomDouble = "true";
                }
                else {
                    boomDouble = "false";
                }
                printWriter.print("{\"resultCode\":true,\"cards\":[\"" + getDoubled[0] + "\"],\"bet_money\":" + getDoubled[1] +",\"money\":" + getDoubled[2] + ",\"boom\":"+ boomDouble + ",\"scores\":[\"" + game.getPlayerScore() +"\"]}");
                printWriter.close();
                break;
            case "insurance":
                String stateInsurance = game.buyInsurance();
                printWriter.print("{\"resultCode\":true,\"state\":" + stateInsurance + "}");
                printWriter.close();
                break;
            case "pass":
                ArrayList<String> addedCards = new ArrayList<>();
                addedCards = game.pass();
                Iterator<String> itPass = addedCards.iterator();
                boolean isSplitedPass = false;
                String pointPass = "[";
                String cardsPass = "[";
                while(itPass.hasNext()) {
                    String s = itPass.next();
                    if(s.equals("?")) {
                        isSplitedPass = true;
                    }
                    else {
                        if(isSplitedPass) {
                            pointPass = pointPass + "\"" + s + "\",";
                        }
                        else {
                            cardsPass = cardsPass + "\"" + s + "\",";
                        }
                    }
                }
                cardsPass = cardsPass.substring(0, cardsPass.length()-1) + "]";
                pointPass = pointPass.substring(0, pointPass.length()-1) + "]";
                String boomPass;
                if(game.isPlayer2Boom()) {
                    boomPass = "true";
                }
                else {
                    boomPass = "false";
                }
                printWriter.print("{\"resultCode\":true,\"state\":" + game.getState() +",\"cards\":" + cardsPass + ",\"boom\":"+ boomPass + ",\"scores\":" + pointPass + "}");
                printWriter.close();
                break;
            case  "again":
                int money = game.again();
                printWriter.print("{\"resultCode\":true,\"money\":" + money + "}");
                printWriter.close();
            default:
                break;

        }
    }
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req,resp);
    }
}